import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";

export default defineConfig({
  clearScreen: true,
  resolve: {
    alias: {
      "@contexts": "/src/contexts",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@styles": "/src/styles",
      "@hooks": "/src/hooks",
      "@interfaces": "/src/interfaces",
      "@utils": "/src/utils",
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      sass: {
        implementation: sass,
      },
    },
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
