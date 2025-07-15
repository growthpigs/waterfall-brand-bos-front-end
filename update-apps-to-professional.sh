#!/bin/bash

# Script to update all Brand BOS apps to use professional components

APPS=("Campaign Control" "Content Calendar" "Content Engine" "Performance" "Settings")

# Determine project root directory. Priority order: 1) first script argument 2) BASE_DIR env var 3) directory where the script resides
DEFAULT_BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_DIR="${1:-${BASE_DIR:-$DEFAULT_BASE_DIR}}"

# Helper to run commands with basic error handling
safe_run() {
  "$@"
  local status=$?
  if [ $status -ne 0 ]; then
    echo "Error: command failed ($*) with exit code $status" >&2
    exit $status
  fi
}

# Define theme colors for each app based on THEME_CONSTANTS.md
declare -A APP_THEMES
APP_THEMES["Campaign Control"]="green"
APP_THEMES["Content Calendar"]="orange"
APP_THEMES["Content Engine"]="purple"
APP_THEMES["Performance"]="blue"
APP_THEMES["Settings"]="purple"

for app in "${APPS[@]}"; do
    echo "Processing $app..."
    
    APP_DIR="$BASE_DIR/$app"
    
    # 1. Create symlink to shared components
    echo "  - Creating symlink to shared components..."
    safe_run ln -sfn "$BASE_DIR/shared/components" "$APP_DIR/src/components/shared"
    
    # 2. Copy professional sidebar from dashboard
    echo "  - Copying professional sidebar..."
    safe_run mkdir -p "$APP_DIR/src/components/professional"
    safe_run cp -r "$BASE_DIR/dashboard/src/components/professional/ProfessionalSidebarNavigation.tsx" "$APP_DIR/src/components/professional/"
    safe_run cp -r "$BASE_DIR/dashboard/src/components/professional/ProfessionalGap.tsx" "$APP_DIR/src/components/professional/"
    
    # 3. Copy layout constants
    echo "  - Copying layout constants..."
    safe_run mkdir -p "$APP_DIR/src/constants"
    safe_run cp "$BASE_DIR/dashboard/src/constants/layout.ts" "$APP_DIR/src/constants/"
    
    # 4. Add gradient background to index.css based on theme
    echo "  - Adding theme gradient to index.css..."
    THEME="${APP_THEMES[$app]}"
    
    case $THEME in
        "orange")
            GRADIENT="linear-gradient(to bottom right, rgb(234, 88, 12), rgb(194, 65, 12), rgb(124, 45, 18))"
            ;;
        "green")
            GRADIENT="linear-gradient(to bottom right, rgb(34, 197, 94), rgb(21, 128, 61), rgb(20, 83, 45))"
            ;;
        "blue")
            GRADIENT="linear-gradient(to bottom right, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))"
            ;;
        "purple")
            GRADIENT="linear-gradient(to bottom right, rgb(147, 51, 234), rgb(126, 34, 206), rgb(88, 28, 135))"
            ;;
    esac
    
    # Check if gradient already exists in index.css
    if ! grep -q "background: linear-gradient" "$APP_DIR/src/index.css"; then
        tmp_css="$APP_DIR/src/index.css.tmp"
        awk '/^[[:space:]]*#root \{/{p=1} p && /padding: 0;/{print $0 "\n    background: '"$GRADIENT"';"; next} {print}' "$APP_DIR/src/index.css" > "$tmp_css"

        # Validate awk execution and temporary file integrity
        if [ $? -ne 0 ] || [ ! -s "$tmp_css" ]; then
          echo "Error: failed to update index.css for $app (awk)" >&2
          rm -f "$tmp_css"
          exit 1
        fi

        safe_run mv "$tmp_css" "$APP_DIR/src/index.css"
    fi
    
    echo "  - Completed $app"
    echo ""
done

echo "All apps have been prepared for professional component migration!"
echo "Next steps:"
echo "1. Update imports in each component file"
echo "2. Replace SidebarNavigation with ProfessionalSidebarNavigation"
echo "3. Wrap content in ProfessionalLayout"
echo "4. Test each app"