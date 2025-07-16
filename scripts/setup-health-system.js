#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

console.log('🏥 Setting up Brand BOS Health Check System...\n');

// Configuration for all apps
const APPS = [
  {
    name: 'dashboard',
    packageName: 'brand-bos-dashboard',
    path: 'dashboard'
  }
];

// Required devDependencies for health system
const HEALTH_DEPENDENCIES = [
  'vitest',
  '@vitest/ui',
  '@vitest/coverage-v8',
  'rollup-plugin-visualizer',
  'jsdom',
  '@testing-library/react',
  '@testing-library/jest-dom',
  '@testing-library/user-event',
  'prettier'
];

function runCommand(command, cwd = ROOT_DIR) {
  try {
    console.log(`📦 Running: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`❌ Failed: ${command}`, error.message);
    return false;
  }
}

function createFile(filePath, content) {
  try {
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(filePath, content);
    console.log(`✅ Created: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to create ${filePath}:`, error.message);
    return false;
  }
}

function updatePackageJson(appPath, appConfig) {
  const packagePath = join(ROOT_DIR, appPath, 'package.json');
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  
  // Update package name
  packageJson.name = appConfig.packageName;
  
  // Add health check scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    'health:check': 'npm run format:check --silent && npm run lint --silent && npm run type-check --silent && npm run test --silent',
    'health:full': 'npm run health:check && npm run build && npm run test:coverage',
    'health:ci': 'npm run format:check && npm run lint && npm run type-check && npm run test && npm run build',
    'format:check': 'prettier --check "src/**/*.{ts,tsx,js,jsx,css,md}"',
    'format:write': 'prettier --write "src/**/*.{ts,tsx,js,jsx,css,md}"',
    'type-check': 'tsc --noEmit',
    'test': 'vitest run',
    'test:watch': 'vitest',
    'test:ui': 'vitest --ui',
    'test:coverage': 'vitest run --coverage',
    'build:analyze': 'vite build --mode analyze'
  };
  
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log(`✅ Updated package.json for ${appConfig.name}`);
}

// 1. Install Husky
console.log('📦 Installing Husky...');
if (!runCommand('npm install --save-dev husky')) {
  process.exit(1);
}

// 2. Initialize Husky
console.log('📦 Initializing Husky...');
if (!runCommand('npx husky install')) {
  process.exit(1);
}

// 3. Create Husky pre-commit hook
const preCommitHook = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

node scripts/pre-commit-health-check.js
`;

createFile(join(ROOT_DIR, '.husky/pre-commit'), preCommitHook);

// 4. Setup each app
for (const app of APPS) {
  console.log(`\n📦 Setting up ${app.name}...`);
  
  const appDir = join(ROOT_DIR, app.path);
  
  // Install dependencies
  const depsToInstall = HEALTH_DEPENDENCIES.join(' ');
  if (!runCommand(`npm install --save-dev ${depsToInstall} --legacy-peer-deps`, appDir)) {
    console.error(`❌ Failed to install dependencies for ${app.name}`);
    continue;
  }
  
  // Update package.json
  updatePackageJson(app.path, app);
  
  // Create Vitest config
  const vitestConfig = `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        '**/*.config.*',
        'src/test/',
        '**/*.d.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});`;
  
  createFile(join(appDir, 'vitest.config.ts'), vitestConfig);
  
  // Update Vite config for bundle analysis
  const viteConfigPath = join(appDir, 'vite.config.ts');
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode === 'analyze' ? [visualizer({ filename: 'dist/bundle-analysis.html', open: true })] : [])
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react']
        }
      }
    }
  }
}));`;
  
  createFile(viteConfigPath, viteConfig);
  
  // Create test setup file
  const testSetup = `import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};`;
  
  const testDir = join(appDir, 'src/test');
  mkdirSync(testDir, { recursive: true });
  createFile(join(testDir, 'setup.ts'), testSetup);
  
  // Create .prettierignore
  const prettierIgnore = `node_modules/
dist/
coverage/
.vite/
*.min.js
*.min.css
package-lock.json
yarn.lock
pnpm-lock.yaml`;
  
  createFile(join(appDir, '.prettierignore'), prettierIgnore);
  
  // Create Prettier config
  const prettierConfig = `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}`;
  
  createFile(join(appDir, '.prettierrc'), prettierConfig);
  
  // Create sample test file
  const sampleTest = `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Brand BOS/i)).toBeInTheDocument();
  });
});`;
  
  createFile(join(appDir, 'src/App.test.tsx'), sampleTest);
}

// 5. Create health check scripts
const healthCheckAll = `#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const APPS = ['dashboard'];

console.log('🏥 Running health checks for all apps...\\n');

let allPassed = true;

for (const app of APPS) {
  const appPath = join(process.cwd(), app);
  
  if (!existsSync(appPath)) {
    console.log(\`❌ App \${app} not found\`);
    allPassed = false;
    continue;
  }
  
  console.log(\`📦 Checking \${app}...\`);
  
  try {
    execSync('npm run health:check', { 
      cwd: appPath, 
      stdio: 'inherit' 
    });
    console.log(\`✅ \${app} passed all health checks\\n\`);
  } catch (error) {
    console.log(\`❌ \${app} failed health checks\\n\`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('🎉 All apps passed health checks!');
  process.exit(0);
} else {
  console.log('💥 Some apps failed health checks');
  process.exit(1);
}`;

createFile(join(ROOT_DIR, 'scripts/health-check-all.js'), healthCheckAll);

// 6. Create pre-commit hook script
const preCommitScript = `#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🏥 Running pre-commit health checks...\\n');

// Get list of changed files
let changedFiles = [];
try {
  const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
  changedFiles = output.trim().split('\\n').filter(Boolean);
} catch (error) {
  console.log('❌ Failed to get changed files');
  process.exit(1);
}

// Determine which apps have changes
const appsToCheck = new Set();
for (const file of changedFiles) {
  if (file.startsWith('dashboard/')) {
    appsToCheck.add('dashboard');
  }
}

if (appsToCheck.size === 0) {
  console.log('✅ No app changes detected, skipping health checks');
  process.exit(0);
}

console.log(\`📦 Apps with changes: \${Array.from(appsToCheck).join(', ')}\\n\`);

let allPassed = true;

for (const app of appsToCheck) {
  const appPath = join(process.cwd(), app);
  
  if (!existsSync(appPath)) {
    console.log(\`❌ App \${app} not found\`);
    allPassed = false;
    continue;
  }
  
  console.log(\`🔍 Checking \${app}...\`);
  
  try {
    execSync('npm run health:check', { 
      cwd: appPath, 
      stdio: 'inherit' 
    });
    console.log(\`✅ \${app} passed health checks\\n\`);
  } catch (error) {
    console.log(\`❌ \${app} failed health checks\\n\`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('🎉 All changed apps passed health checks!');
  process.exit(0);
} else {
  console.log('💥 Some apps failed health checks - commit blocked');
  process.exit(1);
}`;

createFile(join(ROOT_DIR, 'scripts/pre-commit-health-check.js'), preCommitScript);

console.log('\n🎉 Health check system setup complete!');
console.log('\n📋 Available commands:');
console.log('  npm run health:all          - Check all apps');
console.log('  cd dashboard && npm run health:check    - Quick health check');
console.log('  cd dashboard && npm run health:full     - Full health check');
console.log('  cd dashboard && npm run test:ui         - Interactive test UI');
console.log('  cd dashboard && npm run build:analyze   - Bundle analysis');
console.log('\n🔒 Git hooks are now active - commits will be validated automatically'); 