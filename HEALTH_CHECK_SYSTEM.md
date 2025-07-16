# 🏥 Brand BOS Health Check System

Enterprise-grade quality control and testing infrastructure for the Brand BOS monorepo.

## 🎯 Overview

The Health Check System provides automated quality assurance across all applications in the Brand BOS ecosystem. It implements a multi-layered approach to code quality, testing, and deployment readiness.

## 🚀 Quick Start

1. **Setup the entire system:**
   ```bash
   npm run setup:health
   ```

2. **Check all apps:**
   ```bash
   npm run health:all
   ```

3. **Check individual app:**
   ```bash
   cd dashboard
   npm run health:check
   ```

## 📋 Available Commands

### Root Level Commands
- `npm run health:all` - Run health checks on all apps
- `npm run setup:health` - Setup complete health check system

### App Level Commands
- `npm run health:check` - Quick health check (silent output)
- `npm run health:full` - Complete health check with coverage
- `npm run health:ci` - CI/CD optimized health check (verbose)
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Interactive test UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run format:check` - Check code formatting
- `npm run format:write` - Fix code formatting
- `npm run type-check` - TypeScript type checking
- `npm run build:analyze` - Build with bundle analysis

## 🔧 System Components

### 1. Health Check Scripts

#### `health:check` (Quick Check)
- ✅ Format validation
- ✅ Linting
- ✅ Type checking
- ✅ Tests
- **Output:** Silent (for CI/pre-commit)

#### `health:full` (Complete Check)
- ✅ All quick checks
- ✅ Build validation
- ✅ Test coverage report
- **Output:** Detailed

#### `health:ci` (CI/CD Optimized)
- ✅ All checks with verbose output
- ✅ Optimized for CI environments
- **Output:** Verbose with detailed logs

### 2. Testing Infrastructure

**Framework:** Vitest with React Testing Library
- **Test Runner:** Vitest (fast, modern alternative to Jest)
- **Component Testing:** @testing-library/react
- **Coverage:** v8 provider with comprehensive reporting
- **Environment:** jsdom with proper mocking

**Mocking Setup:**
- matchMedia API
- IntersectionObserver
- ResizeObserver
- Jest DOM matchers

### 3. Code Quality Tools

**Prettier Integration:**
- Consistent code formatting
- Pre-configured rules for React/TypeScript
- Ignores build artifacts and dependencies

**ESLint Integration:**
- TypeScript-aware linting
- React hooks validation
- Unused variable detection

**TypeScript:**
- Strict type checking
- No-emit validation for health checks

### 4. Bundle Analysis

**Rollup Visualizer:**
- Bundle size analysis
- Dependency visualization
- Performance insights
- Manual chunk optimization

Run with: `npm run build:analyze`

### 5. Pre-commit Hooks

**Smart Detection:**
- Only runs health checks on modified apps
- Prevents commits if health checks fail
- Performance optimized (skips unchanged apps)

**Automatic Setup:**
- Husky integration
- Git hook automation
- Zero configuration required

## 📊 Coverage Reporting

Coverage reports are generated in multiple formats:
- **Text:** Console output during test runs
- **JSON:** Machine-readable format for CI
- **HTML:** Detailed browser-viewable report

**Coverage Exclusions:**
- Node modules
- Build artifacts
- Configuration files
- Test setup files
- Type definition files

## 🔒 Git Hooks

### Pre-commit Hook
Automatically runs when you commit:
1. Detects which apps have changes
2. Runs `health:check` only on modified apps
3. Blocks commit if any health check fails
4. Provides clear feedback on failures

### Hook Management
- **Install:** Automatic during setup
- **Skip:** Use `git commit --no-verify` (not recommended)
- **Modify:** Edit `.husky/pre-commit`

## 🏗️ Architecture

```
Brand BOS Monorepo
├── package.json (root - monorepo management)
├── scripts/
│   ├── setup-health-system.js (automated setup)
│   ├── health-check-all.js (check all apps)
│   └── pre-commit-health-check.js (git hook)
├── .husky/
│   └── pre-commit (git hook configuration)
└── dashboard/ (app)
    ├── package.json (app-specific scripts)
    ├── vitest.config.ts (test configuration)
    ├── .prettierrc (formatting rules)
    ├── .prettierignore (formatting exclusions)
    └── src/
        ├── test/setup.ts (test environment)
        └── **/*.test.tsx (test files)
```

## 🛠️ Configuration Files

### Vitest Configuration (`vitest.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
});
```

### Prettier Configuration (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 🎛️ Customization

### Adding New Apps
1. Add app configuration to `scripts/setup-health-system.js`
2. Update `APPS` array in health check scripts
3. Run setup script to apply configuration

### Modifying Health Checks
Edit the script configurations in each app's `package.json`:
```json
{
  "scripts": {
    "health:check": "custom-check-command",
    "health:full": "custom-full-check"
  }
}
```

### Test Configuration
Modify `vitest.config.ts` in each app for specific needs:
- Different test environments
- Custom setup files
- Modified coverage settings

## 🚨 Troubleshooting

### Common Issues

**Tests fail with "matchMedia is not a function":**
- ✅ Fixed: Proper mocking in test setup

**Coverage reports missing:**
- ✅ Check: `@vitest/coverage-v8` is installed
- ✅ Verify: Coverage configuration in vitest.config.ts

**Pre-commit hook not running:**
- ✅ Run: `npx husky install`
- ✅ Check: `.husky/pre-commit` has execute permissions

**Formatting issues:**
- ✅ Run: `npm run format:write` to fix
- ✅ Check: `.prettierignore` excludes problematic files

### Performance Optimization

**Slow health checks:**
- Use `health:check` for quick validation
- Reserve `health:full` for comprehensive checks
- Pre-commit only checks modified apps

**Large bundle sizes:**
- Run `npm run build:analyze` to investigate
- Check manual chunk configuration in vite.config.ts

## 📈 Metrics and Monitoring

### Health Check Outputs
- 🏥 System start indicator
- ✅ Success confirmations  
- ❌ Failure notifications
- 📦 App processing status

### Coverage Thresholds
Configure minimum coverage requirements in `vitest.config.ts`:
```typescript
coverage: {
  statements: 80,
  branches: 80,
  functions: 80,
  lines: 80
}
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Health Check
  run: npm run health:ci
  working-directory: ./dashboard
```

### Build Pipeline
1. Install dependencies
2. Run `health:ci` on all apps
3. Generate coverage reports
4. Build applications
5. Deploy if all checks pass

## 🎯 Best Practices

1. **Write tests first** - TDD approach
2. **Maintain high coverage** - Aim for 80%+ coverage
3. **Format before commit** - Use `format:write`
4. **Check health locally** - Before pushing changes
5. **Monitor bundle size** - Regular analysis
6. **Update dependencies** - Keep testing tools current

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Husky Git Hooks](https://typicode.github.io/husky/)

---

**🎉 The health check system ensures code quality, prevents regressions, and maintains enterprise-grade standards across the entire Brand BOS ecosystem.** 