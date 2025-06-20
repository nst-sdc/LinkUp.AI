import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
// import dns from 'node:dns';

// dns.setDefaultResultOrder('verbatim');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@css': fileURLToPath(new URL('./src/assets/css', import.meta.url)),
            '@images': fileURLToPath(
                new URL('./src/assets/images', import.meta.url)
            ),
            '@icons': fileURLToPath(
                new URL('./src/assets/icons', import.meta.url)
            ),
            '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
        },
    },
});
