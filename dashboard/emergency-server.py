#!/usr/bin/env python3
import http.server
import socketserver
import subprocess
import sys
import time
import webbrowser

PORT = 8080

print("🚨 Emergency Vite Proxy Server")
print("This will proxy your Vite dev server through Python's HTTP server\n")

# Start Vite in the background
print("Starting Vite in background...")
vite_process = subprocess.Popen(['npm', 'run', 'dev'], 
                                stdout=subprocess.PIPE, 
                                stderr=subprocess.PIPE)

# Wait for Vite to start
time.sleep(3)

class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # For the root path, proxy to Vite
        if self.path == '/' or self.path.startswith('/@') or self.path.endswith('.js') or self.path.endswith('.css'):
            import urllib.request
            try:
                # Fetch from Vite server
                response = urllib.request.urlopen(f'http://127.0.0.1:5173{self.path}')
                content = response.read()
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', response.headers.get('Content-Type', 'text/html'))
                self.end_headers()
                self.wfile.write(content)
            except Exception as e:
                self.send_error(500, f"Proxy error: {str(e)}")
        else:
            # Serve static files
            super().do_GET()

try:
    with socketserver.TCPServer(("0.0.0.0", PORT), ProxyHTTPRequestHandler) as httpd:
        print(f"\n✅ Emergency proxy server running at:")
        print(f"   http://127.0.0.1:{PORT}/")
        print(f"   http://localhost:{PORT}/")
        print(f"\n🌐 Opening browser...")
        webbrowser.open(f'http://127.0.0.1:{PORT}/')
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nShutting down...")
    vite_process.terminate()
    sys.exit(0)