#!/usr/bin/env node

/**
 * Migration script to update all Brand BOS applications to use professional components
 * This script will update all apps to use the new professional component system
 */

const fs = require('fs');
const path = require('path');

// -----------------------------
// Runtime configuration
// -----------------------------
const args = process.argv.slice(2);

// Support a --dry-run switch or DRY_RUN env var so callers can preview changes
const DRY_RUN = args.includes('--dry-run') || process.env.DRY_RUN === 'true';

// Determine the project root.
// Priority: 1) --root <path> CLI arg  2) PROJECT_ROOT env var  3) current working directory
let projectRoot = process.env.PROJECT_ROOT || '';
const rootIdx = args.findIndex(a => a === '--root');
if (rootIdx !== -1 && args[rootIdx + 1]) {
  projectRoot = path.resolve(args[rootIdx + 1]);
}
if (!projectRoot) {
  projectRoot = path.resolve(process.cwd());
}

// Helper to log when running in dry-run mode
if (DRY_RUN) {
  console.log('ℹ️  Running in DRY-RUN mode. No files will be modified.');
}

// Define the apps to migrate
const apps = [
  'CIA',
  'Campaign Control', 
  'Content Calendar',
  'Content Engine',
  'Performance',
  'Settings'
];

// Professional component imports to add
const professionalImports = `import ProfessionalLayout from '../../shared/components/ProfessionalLayout';
import ProfessionalSidebarNavigation from '../../dashboard/src/components/professional/ProfessionalSidebarNavigation';
`;

// Function to update App.tsx files
function updateAppFile(appPath) {
  const appFilePath = path.join(appPath, 'src', 'App.tsx');
  
  if (!fs.existsSync(appFilePath)) {
    console.log(`⚠️  App.tsx not found in ${appPath}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(appFilePath, 'utf8');
    
    // Add professional imports if not already present
    if (!content.includes('ProfessionalLayout')) {
      // Find the last import statement
      const lastImportIndex = content.lastIndexOf('import');
      const endOfLastImport = content.indexOf('\n', lastImportIndex);
      
      // Insert professional imports after the last import
      content = content.slice(0, endOfLastImport + 1) + 
                '\n' + professionalImports + 
                content.slice(endOfLastImport + 1);
    }
    
    // Update component structure to use ProfessionalLayout
    // This is a placeholder - actual implementation would need to parse and transform JSX
    console.log(`✅ Updated imports in ${appPath}/src/App.tsx`);

    // Write back the updated content (respect DRY-RUN)
    if (DRY_RUN) {
      console.log(`🔍 DRY-RUN: Skipping write to ${appFilePath}`);
    } else {
      fs.writeFileSync(appFilePath, content, 'utf8');
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${appPath}: ${error.message}`);
  }
}

// Function to update page components
function updatePageComponents(appPath) {
  const componentsPath = path.join(appPath, 'src', 'components', 'generated');
  
  if (!fs.existsSync(componentsPath)) {
    console.log(`⚠️  Components directory not found in ${appPath}`);
    return;
  }
  
  // Get all .tsx files in the components directory
  const componentFiles = fs.readdirSync(componentsPath)
    .filter(file => file.endsWith('.tsx') && file !== 'index.tsx');
  
  componentFiles.forEach(file => {
    const filePath = path.join(componentsPath, file);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Check if it's a page component (contains SidebarNavigation)
      if (content.includes('SidebarNavigation')) {
        console.log(`📝 Found page component: ${file}`);
        
        // Basic string-based transformation (quick win). For production use consider AST transforms.

        // 1. Replace any SidebarNavigation import with the professional equivalent
        content = content.replace(/import\s+[^;]*SidebarNavigation[^;]*;/, "import ProfessionalSidebarNavigation from '../../dashboard/src/components/professional/ProfessionalSidebarNavigation';");

        // 2. Ensure ProfessionalLayout import exists
        if (!content.includes('ProfessionalLayout')) {
          const lastImport = content.lastIndexOf('import');
          const endOfImport = content.indexOf('\n', lastImport);
          content = content.slice(0, endOfImport + 1) +
                    "\nimport ProfessionalLayout from '../../shared/components/ProfessionalLayout';\n" +
                    content.slice(endOfImport + 1);
        }

        // NOTE: Wrapping JSX in <ProfessionalLayout> would ideally be done via a code-mod/AST; skipped here for brevity.

        if (DRY_RUN) {
          console.log(`🔍 DRY-RUN: Skipping write to ${filePath}`);
        } else {
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`💾 Updated ${file}`);
        }
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${file}: ${error.message}`);
    }
  });
}

// Function to create symlinks for shared components
function createSymlinks(appPath) {
  const targetPath = path.join(appPath, 'src', 'components', 'professional');
  
  // Create professional directory if it doesn't exist
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
  
  // Link to dashboard's professional components
  const sourcePath = path.join(projectRoot, 'dashboard', 'src', 'components', 'professional');
  
  if (fs.existsSync(sourcePath)) {
    console.log(`🔗 Creating symlinks for professional components in ${appPath}`);
    // Add symlink creation logic here
  }
}

// Main migration function
function migrate() {
  console.log('🚀 Starting migration to professional components...\n');
  
  apps.forEach(app => {
    const appPath = path.join(projectRoot, app);
    
    if (!fs.existsSync(appPath)) {
      console.log(`⚠️  App directory not found: ${app}`);
      return;
    }
    
    console.log(`\n📦 Processing ${app}...`);
    
    // Update App.tsx
    updateAppFile(appPath);
    
    // Update page components
    updatePageComponents(appPath);
    
    // Create symlinks for shared components
    createSymlinks(appPath);
  });
  
  console.log('\n✨ Migration planning complete!');
  console.log('\nNext steps:');
  console.log('1. Review the proposed changes');
  console.log('2. Run the actual migration with proper AST transformation');
  console.log('3. Test each application');
  console.log('4. Update imports and dependencies');
}

// Run the migration
migrate();