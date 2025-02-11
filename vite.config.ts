import path from "path";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, "../.env") });

// https://vite.dev/config/
export default defineConfig({
  plugins: [wasm(), topLevelAwait(), react()],
  optimizeDeps: {
    exclude: ["onnxruntime-node", "@anush008/tokenizers"],
  },
  build: {
    commonjsOptions: {
      exclude: ["onnxruntime-node", "@anush008/tokenizers"],
    },
    rollupOptions: {
      external: ["onnxruntime-node", "@anush008/tokenizers"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    allowedHosts: ["orius-finance.vercel.app"],
    // proxy: {
    //   "/api": {
    //     target: `http://138.197.187.21:3000/`,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
});
