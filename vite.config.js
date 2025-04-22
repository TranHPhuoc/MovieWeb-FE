import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        port: 3000,
        proxy: {
            '/api/v1': {
                target: 'http://movieweb-production.up.railway.app/',
                changeOrigin: true,
                secure: false,
                ws: true,
                configure: function (proxy, _options) {
                    proxy.on('error', function (err, _req, _res) {
                        console.log('proxy error', err);
                    });
                    proxy.on('proxyReq', function (proxyReq, req, _res) {
                        console.log('Sending Request to the Target:', req.method, req.url);
                    });
                    proxy.on('proxyRes', function (proxyRes, req, _res) {
                        console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                    });
                },
            }
        },
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
});
