#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const APPS = ['dashboard'];

console.log('🏥 Running health checks for all apps...\n');

let allPassed = true;

for (const app of APPS) {
  const appPath = join(process.cwd(), app);
  
  if (!existsSync(appPath)) {
    console.log(`❌ App ${app} not found`);
    allPassed = false;
    continue;
  }
  
  console.log(`📦 Checking ${app}...`);
  
  try {
    execSync('npm run health:check', { 
      cwd: appPath, 
      stdio: 'inherit' 
    });
    console.log(`✅ ${app} passed all health checks\n`);
  } catch (error) {
    console.log(`❌ ${app} failed health checks\n`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('🎉 All apps passed health checks!');
  process.exit(0);
} else {
  console.log('💥 Some apps failed health checks');
  process.exit(1);
} 