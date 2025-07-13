#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔧 Fixing macOS Node.js network permissions...\n');

// Step 1: Clear DNS cache
try {
  execSync('dscacheutil -flushcache');
  console.log('✅ DNS cache cleared');
} catch (e) {
  console.log('⚠️  Could not clear DNS cache');
}

// Step 2: Create a new hosts entry
const hostsEntry = '\n# Vite development server fix\n127.0.0.1       local.dev\n';
const hostsPath = '/etc/hosts';

console.log('\n📝 To fix this issue permanently, add this to your /etc/hosts file:');
console.log(hostsEntry);
console.log('Run: sudo nano /etc/hosts');

// Step 3: Create a proxy server on a different port
const http = require('http');
const httpProxy = require('http-proxy-middleware');

// Create a simple static server instead
const staticServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Vite Server Fix</title>
    </head>
    <body>
      <h1>Node.js Server Working!</h1>
      <p>If you can see this, the fix is working.</p>
      <p>Now let's redirect you to the Vite app...</p>
      <script>
        setTimeout(() => {
          window.location.href = 'http://127.0.0.1:5173';
        }, 2000);
      </script>
    </body>
    </html>
  `);
});

staticServer.listen(8888, '0.0.0.0', () => {
  console.log('\n✅ Test server running at http://127.0.0.1:8888');
  console.log('🔍 Testing if this works in your browser...');
});

// Step 4: Force IPv4 for all Node processes
process.env.NODE_OPTIONS = '--no-network-family-autoselection --dns-result-order=ipv4first';

console.log('\n🔧 Environment fixes applied:');
console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS);

// Step 5: Reset Vite with new configuration
console.log('\n🚀 Starting Vite with fixed configuration...');

setTimeout(() => {
  require('child_process').spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      HOST: '0.0.0.0',
      NODE_OPTIONS: '--no-network-family-autoselection --dns-result-order=ipv4first'
    }
  });
}, 1000);