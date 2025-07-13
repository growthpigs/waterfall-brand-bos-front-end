const http = require('http');
const net = require('net');
const { exec } = require('child_process');

console.log('=== Network Diagnostics ===');

// Check localhost resolution
const dns = require('dns');
dns.lookup('localhost', (err, address, family) => {
  if (err) {
    console.log('❌ localhost DNS resolution failed:', err);
  } else {
    console.log('localhost resolves to:', address, 'IPv' + family);
  }
});

// Check /etc/hosts
exec('cat /etc/hosts | grep localhost', (err, stdout) => {
  console.log('\n=== /etc/hosts localhost entries ===');
  console.log(stdout || 'No localhost entries found!');
});

// Check which ports are available
function checkPort(port, host) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      console.log(`❌ Port ${port} on ${host} is in use or blocked:`, err.code);
      resolve(false);
    });
    server.once('listening', () => {
      server.close();
      console.log(`✅ Port ${port} on ${host} is available`);
      resolve(true);
    });
    server.listen(port, host);
  });
}

// Check firewall status
exec('sudo -n /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate 2>/dev/null || echo "Firewall check requires sudo"', (err, stdout) => {
  console.log('\n=== Firewall Status ===');
  console.log(stdout.trim());
});

// Test both IPv4 and IPv6
Promise.all([
  checkPort(5173, '127.0.0.1'),
  checkPort(5173, '::1'),
  checkPort(5173, '0.0.0.0')
]).then(() => {
  // Check npm/node configuration
  console.log('\n=== Node Configuration ===');
  console.log('Node version:', process.version);
  console.log('Platform:', process.platform);
  console.log('Architecture:', process.arch);
  
  // Check npm cache
  exec('npm config get cache', (err, stdout) => {
    console.log('npm cache:', stdout.trim());
  });

  // Check environment
  console.log('\n=== Environment ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('HOST:', process.env.HOST);
  console.log('PORT:', process.env.PORT);
  console.log('HOME:', process.env.HOME);
  
  // Check network interfaces
  const os = require('os');
  console.log('\n=== Network Interfaces ===');
  const interfaces = os.networkInterfaces();
  Object.keys(interfaces).forEach(name => {
    interfaces[name].forEach(addr => {
      if (addr.internal) {
        console.log(`${name}: ${addr.address} (${addr.family})`);
      }
    });
  });
  
  // Test actual HTTP server
  console.log('\n=== Testing HTTP Server ===');
  const testServer = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Test server working');
  });
  
  testServer.listen(5174, '127.0.0.1', () => {
    console.log('✅ Test server started on http://127.0.0.1:5174');
    
    // Test connection
    http.get('http://127.0.0.1:5174', (res) => {
      console.log('✅ Successfully connected to test server');
      testServer.close();
    }).on('error', (err) => {
      console.log('❌ Failed to connect to test server:', err.message);
      testServer.close();
    });
  });
});