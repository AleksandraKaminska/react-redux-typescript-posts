/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import path from "path"

export default () => {
  return defineConfig({
    plugins: [react()],
    server: {
      open: true,
      host: true,
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/hooks": path.resolve(__dirname, "./src/hooks"),
        "@/lib": path.resolve(__dirname, "./src/lib"),
        "@/providers": path.resolve(__dirname, "./src/providers"),
        "@/routes": path.resolve(__dirname, "./src/routes"),
        "@/types": path.resolve(__dirname, "./src/types"),
        "@/features": path.resolve(__dirname, "./src/features"),
        "@/utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
            "react-router-dom": ["react-router-dom"],
          },
        },
      },
      chunkSizeWarningLimit: 800,
    },
    test: {
      setupFiles: "./setup-test.ts",
      coverage: {
        all: true,
        reporter: ["lcov", "text"],
        include: ["src/**"],
        exclude: ["**/*.stories.tsx", "**/index.ts"], // exclude stories and index files
      },
      globals: true,
      environment: "jsdom",
      css: false,
    },
  })
}
