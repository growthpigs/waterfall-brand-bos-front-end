#!/bin/bash

echo "🔧 Applying macOS network fixes for Vite..."

# Kill any existing servers
pkill -f vite 2>/dev/null
pkill -f "node.*dev" 2>/dev/null

# Clear Node.js module cache
rm -rf node_modules/.vite 2>/dev/null
rm -rf node_modules/.cache 2>/dev/null

# Export environment fixes
export NODE_OPTIONS="--no-network-family-autoselection --dns-result-order=ipv4first"
export HOST="0.0.0.0"
export FORCE_COLOR=1

# Clear extended attributes that might be blocking
xattr -cr node_modules 2>/dev/null
xattr -cr . 2>/dev/null

# Start Vite with explicit IPv4 binding
echo "Starting Vite on IPv4 only..."
exec node --dns-result-order=ipv4first node_modules/.bin/vite --host 0.0.0.0 --port 5173