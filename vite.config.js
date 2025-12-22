import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        ViteImageOptimizer({
            /* pass your config */
            png: {
                quality: 80,
            },
            jpeg: {
                quality: 80,
            },
            webp: {
                quality: 80,
            },
            avif: {
                quality: 70,
            },
        }),
    ],
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunks for better caching
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
                    'vendor-ui': ['swiper', 'formik', 'yup'],
                },
            },
        },
        // Reduce chunk size warnings threshold
        chunkSizeWarningLimit: 500,
    },
    // Optimize dependencies
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit', 'react-redux'],
    },
})
