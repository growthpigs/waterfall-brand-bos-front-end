#!/usr/bin/env node

/**
 * Migration Script: Universal 24px Standard
 * Automatically updates all components to use professional 24px spacing
 */

import * as fs from 'fs';
import * as path from 'path';

// Patterns to find and replace
const MIGRATION_PATTERNS = [
  {
    name: 'Hidden gap pattern',
    find: /<div className="hidden md:block flex-shrink-0" style=\{\{ width: "24px" \}\} \/>/g,
    replace: '<Professional24pxGap />'
  },
  {
    name: 'Visible gap pattern',
    find: /<div className="flex-shrink-0" style=\{\{ width: "24px" \}\} \/>/g,
    replace: '<Professional24pxGap />'
  },
  {
    name: '30px gap pattern',
    find: /<div className="w-\[30px\] flex-shrink-0" \/>/g,
    replace: '<Professional24pxGap />'
  },
  {
    name: 'Import addition',
    find: /import (.+) from ['"]\.\/SidebarNavigation['"];?/g,
    replace: `import $1 from './SidebarNavigation';
import { Professional24pxGap } from '@/systems/ProfessionalLayoutSystem';`
  }
];

// Files to migrate
const TARGET_PATTERNS = [
  '**/components/generated/*Page.tsx',
  '**/components/generated/*Dashboard.tsx',
  '**/components/generated/*Workspace.tsx'
];

interface MigrationResult {
  file: string;
  changes: number;
  patterns: string[];
}

/**
 * Migrate a single file to 24px standard
 */
function migrateFile(filePath: string): MigrationResult | null {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changes = 0;
    const patternsApplied: string[] = [];
    
    // Apply each migration pattern
    MIGRATION_PATTERNS.forEach(pattern => {
      const matches = content.match(pattern.find);
      if (matches && matches.length > 0) {
        content = content.replace(pattern.find, pattern.replace);
        changes += matches.length;
        patternsApplied.push(pattern.name);
      }
    });
    
    // Only write if changes were made
    if (changes > 0) {
      // Ensure import is at the top if we added gap components
      if (content.includes('Professional24pxGap') && !content.includes("from '@/systems/ProfessionalLayoutSystem'")) {
        const importStatement = "import { Professional24pxGap } from '@/systems/ProfessionalLayoutSystem';\\n";
        content = content.replace(
          /^(import .+ from .+;\\n)+/m,
          `$&${importStatement}`
        );
      }
      
      fs.writeFileSync(filePath, content, 'utf8');
      
      return {
        file: filePath,
        changes,
        patterns: patternsApplied
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

/**
 * Find all files matching patterns
 */
function findFiles(baseDir: string, patterns: string[]): string[] {
  const files: string[] = [];
  
  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        walkDir(fullPath);
      } else if (entry.isFile()) {
        // Check if file matches any pattern
        const relativePath = path.relative(baseDir, fullPath);
        if (patterns.some(pattern => {
          const regex = new RegExp(pattern.replace(/\*/g, '.*'));
          return regex.test(relativePath);
        })) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walkDir(baseDir);
  return files;
}

/**
 * Generate migration report
 */
function generateReport(results: MigrationResult[]): string {
  const totalChanges = results.reduce((sum, r) => sum + r.changes, 0);
  const report = `
# 24px Standard Migration Report

## Summary
- Files migrated: ${results.length}
- Total changes: ${totalChanges}
- Migration completed: ${new Date().toISOString()}

## Details
${results.map(r => `
### ${path.basename(r.file)}
- Path: ${r.file}
- Changes: ${r.changes}
- Patterns applied: ${r.patterns.join(', ')}
`).join('')}

## Next Steps
1. Run TypeScript compiler to check for errors
2. Test all pages in browser
3. Verify 24px spacing is consistent
4. Commit changes with message: "Migrate to universal 24px standard"
`;
  
  return report;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 Starting migration to 24px standard...');
  
  const baseDir = path.resolve(__dirname, '../../..');
  const files = findFiles(baseDir, TARGET_PATTERNS);
  
  console.log(`Found ${files.length} files to process`);
  
  const results: MigrationResult[] = [];
  
  for (const file of files) {
    const result = migrateFile(file);
    if (result) {
      results.push(result);
      console.log(`✅ Migrated: ${path.basename(file)} (${result.changes} changes)`);
    }
  }
  
  // Generate and save report
  const report = generateReport(results);
  const reportPath = path.join(baseDir, 'MIGRATION_REPORT_24PX.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  
  console.log(`
✨ Migration complete!
- Files updated: ${results.length}
- Report saved to: ${reportPath}
  `);
}

// Run migration if called directly
if (require.main === module) {
  migrate().catch(console.error);
}

export { migrate, migrateFile, MIGRATION_PATTERNS };