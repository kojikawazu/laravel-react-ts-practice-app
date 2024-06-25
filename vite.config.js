import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: 'public/build',
        manifest: true,
        rollupOptions: {
            input: {
                app: resolve(__dirname, 'resources/js/app.tsx'),
            },
        },
    },
    server: {
        strictPort: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./resources/js/__tests__/setup.ts'],
        include: ['resources/js/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
        env: {
            VITE_APP_BASE_URL: 'http://localhost:3000'
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './resources/js'),
        }
    },
    define: {
        'process.env': process.env
    },
    optimizeDeps: {
        include: ['@inertiajs/react']
    }
});
