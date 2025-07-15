#!/usr/bin/env python3

import os
import re
import sys
import argparse
import shutil

# Define the apps and their themes
APPS = {
    "Campaign Control": "green",
    "Content Calendar": "orange", 
    "Content Engine": "purple",
    "Performance": "blue",
    "Settings": "purple",
    "dashboard": "blue",
    "CIA": "purple"
}

# Pages and their active IDs
PAGE_IDS = {
    "BrandBOSDashboard": "dashboard",
    "CIAAnalysisPage": "cia",
    "CampaignCenterPage": "campaigns",
    "ContentCalendarPage": "calendar",
    "ContentEnginePage": "content",
    "PerformancePage": "performance",
    "SettingsPage": "settings",
    "BrandIntelligencePage": "intelligence",
    "ContentEngineWorkspace": "content-engine"
}

def update_component_file(filepath, theme, component_name, dry_run=False):
    """Update a component file to use professional components"""
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Skip if already updated
    if 'ProfessionalLayout' in content:
        print(f"    ✓ {component_name} already updated")
        return
    
    # Get the page ID
    page_id = PAGE_IDS.get(component_name, "dashboard")
    
    # Update imports
    old_import = "import SidebarNavigation from './SidebarNavigation';"
    new_imports = """import ProfessionalLayout from '../shared/ProfessionalLayout';
import ProfessionalSidebarNavigation from '../professional/ProfessionalSidebarNavigation';"""
    
    content = content.replace(old_import, new_imports)
    
    # Add interface if needed
    if "interface " + component_name + "Props" not in content:
        # Find the component declaration
        component_pattern = rf"const {component_name}: React\.FC = \(\) => {{"
        if re.search(component_pattern, content):
            new_interface = f"""interface {component_name}Props {{
  onNavigate?: (pageId: string) => void;
}}

const {component_name}: React.FC<{component_name}Props> = ({{ onNavigate }}) => {{"""
            content = re.sub(component_pattern, new_interface, content)
    
    # Find and replace the main return statement
    # Look for patterns like: return <div className="min-h-screen
    return_pattern = r'return <div className="(?:min-h-screen|flex h-screen)[^"]*">\s*(?:{/\*[^}]*\*/})?\s*(?:<div[^>]*>[^<]*</div>\s*)?(?:{/\*[^}]*\*/})?\s*<SidebarNavigation[^/]*/?>\s*(?:{/\*[^}]*\*/})?\s*<div[^>]*style={{ width: "24px" }}[^/]*/?>\s*(?:{/\*[^}]*\*/})?\s*<main[^>]*>'
    
    if re.search(return_pattern, content, re.DOTALL):
        new_return = f"""return (
    <ProfessionalLayout
      theme="{theme}"
      sidebar={{<ProfessionalSidebarNavigation onNavigate={{onNavigate}} activePageId="{page_id}" />}}
    >
      {{/* Main Content Area */}}"""
        
        content = re.sub(return_pattern, new_return, content, flags=re.DOTALL)
        
        # Replace closing tags
        content = re.sub(r'</main>\s*</div>;', '</ProfessionalLayout>\n  );', content)
    else:
        print(f"    ⚠️  Pattern not found in {component_name}, no changes applied.")
        return

    if dry_run:
        print(f"    📝 (dry-run) Would update {component_name}")
        return

    # Backup original file before modifying
    backup_path = filepath + '.bak'
    try:
        shutil.copy2(filepath, backup_path)
    except Exception as e:
        print(f"    ❌ Failed to create backup for {component_name}: {e}")
        return

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"    ✓ Updated {component_name}")

def process_app(app_name, theme, base_dir, dry_run=False):
    """Process all components in an app"""
    print(f"\nProcessing {app_name} (theme: {theme})...")
    
    app_dir = os.path.join(base_dir, app_name)
    components_dir = os.path.join(app_dir, "src", "components", "generated")
    
    if not os.path.exists(components_dir):
        print(f"  ⚠️  Components directory not found: {components_dir}")
        return
    
    # Process each component file
    for filename in os.listdir(components_dir):
        if filename.endswith("Page.tsx") or filename == "BrandBOSDashboard.tsx":
            filepath = os.path.join(components_dir, filename)
            component_name = filename.replace(".tsx", "")
            
            try:
                update_component_file(filepath, theme, component_name, dry_run)
            except Exception as e:
                print(f"    ❌ Error updating {component_name}: {str(e)}")

def main():
    parser = argparse.ArgumentParser(description="Update generated components to use professional layout components.")
    parser.add_argument("--base-dir", default=os.getenv("PROJECT_BASE_DIR", os.getcwd()), help="Base directory containing the app folders")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without modifying files")
    args = parser.parse_args()

    base_dir = args.base_dir
    dry_run = args.dry_run

    print("🚀 Updating all apps to use professional components...")

    for app_name, theme in APPS.items():
        process_app(app_name, theme, base_dir, dry_run)

    print("\n✨ Component updates complete!")
    if dry_run:
        print("\n(Dry run mode – no files were modified.)")
    print("\nNext steps:")
    print("1. Install dependencies in each app (npm install --legacy-peer-deps)")
    print("2. Build each app to verify (npm run build)")
    print("3. Test the applications")

if __name__ == "__main__":
    main()