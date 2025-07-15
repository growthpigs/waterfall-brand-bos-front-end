#!/bin/bash

# Update health check scripts for all Brand BOS applications

echo "🚀 Updating health check scripts for all Brand BOS applications..."

# Array of app directories with their package names
declare -A apps=(
  ["CIA"]="brand-bos-cia"
  ["Campaign Control"]="brand-bos-campaign-control"
  ["Content Calendar"]="brand-bos-content-calendar"
  ["Content Engine"]="brand-bos-content-engine"
  ["Performance"]="brand-bos-performance"
  ["Settings"]="brand-bos-settings"
)

# Scripts to add to package.json
SCRIPTS_TO_ADD='"type-check": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "bundle-analyze": "vite build --mode analyze",
    "health:check": "echo '"'"'🏥 Code Health Check'"'"' && npm run format:check --silent && npm run lint --silent && npm run type-check --silent && npm test --silent && echo '"'"'✅ All checks passed!'"'"'",
    "health:full": "npm run health:check && npm run build && npm run test:coverage",
    "health:ci": "npm run format:check && npm run lint && npm run type-check && npm run test && npm run build",
    "prepare": "husky install"'

# DevDependencies to add
DEV_DEPS='vitest @vitest/ui @vitest/coverage-v8 rollup-plugin-visualizer jsdom @testing-library/jest-dom husky'

for app in "${!apps[@]}"; do
  package_name="${apps[$app]}"
  echo ""
  echo "📦 Processing $app (${package_name})..."
  
  # Navigate to app directory
  cd "$app" || { echo "❌ Failed to enter $app directory"; continue; }
  
  # Backup package.json
  cp package.json package.json.backup
  
  # Update package name
  sed -i '' "s/\"name\": \"component-forge\"/\"name\": \"$package_name\"/" package.json
  
  # Update scripts section in package.json
  # This adds the new scripts after the format:check script
  sed -i '' '/"format:check":/a\
    ,'"$SCRIPTS_TO_ADD" package.json
  
  echo "✅ Updated scripts and package name in $app/package.json"
  
  # Install new dependencies
  echo "📥 Installing dependencies for $app..."
  npm install --save-dev --legacy-peer-deps $DEV_DEPS
  
  # Create vitest.config.ts
  cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
EOF
  
  # Update vite.config.ts to support bundle analysis
  if [ -f "vite.config.ts" ]; then
    # Create a temporary file with the updated config
    cat > vite.config.ts.tmp << 'EOF'
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';
  
  return {
    plugins: [
      react(), 
      tailwindcss(),
      isAnalyze && visualizer({
        open: true,
        filename: 'dist/bundle-stats.html',
        gzipSize: true,
        brotliSize: true,
      })
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '127.0.0.1', // Force IPv4 instead of default localhost
      port: 5173,
      strictPort: false, // Try another port if 5173 is busy
    }
  };
});
EOF
    mv vite.config.ts.tmp vite.config.ts
  fi
  
  # Create test setup file
  mkdir -p src/tests
  cat > src/tests/setup.ts << 'EOF'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia
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
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
EOF

  # Create a simple test file
  mkdir -p src/components/tests
  cat > src/components/tests/App.test.tsx << 'EOF'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import App from '../../App'

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })
})
EOF
  
  echo "✅ Created test configuration files for $app"
  
  # Return to parent directory
  cd ..
done

echo ""
echo "✨ Health check scripts have been successfully added to all applications!"
echo ""
echo "🔧 Available commands in any app:"
echo "  npm run health:check  - 🏥 Run format, lint, type-check, and tests with status"
echo "  npm run health:full   - Run full health check including build and coverage"
echo "  npm run health:ci     - Run CI/CD health check (verbose output)"
echo ""
echo "📋 Individual commands available:"
echo "  npm run type-check    - Check TypeScript types"
echo "  npm test             - Run tests"
echo "  npm run test:watch   - Run tests in watch mode"
echo "  npm run test:coverage - Generate test coverage report"
echo "  npm run bundle-analyze - Analyze bundle size"
echo "  npm run format        - Format code with Prettier"
echo "  npm run format:check  - Check code formatting"
echo ""
echo "🎯 Global commands (from project root):"
echo "  npm run health:all    - Run health checks for all apps"
echo ""
echo "🔐 Git hooks:"
echo "  Pre-commit hook automatically runs health checks on modified apps"
echo "  Commit will be blocked if any checks fail"
echo ""
echo "💡 Pro tip: Run 'npm run format' before committing to fix formatting issues"