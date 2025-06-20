import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import dns from 'node:dns';
dns.setDefaultResultOrder('verbatim');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],

    alias: [
        {
            find: '@',
            replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
        {
            find: '@assets',
            replacement: fileURLToPath(
                new URL('./src/assets', import.meta.url)
            ),
        },
        {
            find: '@css',
            replacement: fileURLToPath(
                new URL('./src/assets/css', import.meta.url)
            ),
        },
        {
            find: '@images',
            replacement: fileURLToPath(
                new URL('./src/assets/images', import.meta.url)
            ),
        },
        {
            find: '@icons',
            replacement: fileURLToPath(
                new URL('./src/assets/icons', import.meta.url)
            ),
        },
        {
            find: '@models',
            replacement: fileURLToPath(
                new URL('./src/assets/3DModels', import.meta.url)
            ),
        },
        {
            find: '@data',
            replacement: fileURLToPath(new URL('./src/data', import.meta.url)),
        },
        {
            find: '@utils',
            replacement: fileURLToPath(new URL('./src/utils', import.meta.url)),
        },
        {
            find: '@hooks',
            replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
        },
    ],
});
