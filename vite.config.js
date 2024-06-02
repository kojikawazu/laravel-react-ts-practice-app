import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

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
    build: {
        outDir: 'public/build', // 出力ディレクトリを指定
    },
});
