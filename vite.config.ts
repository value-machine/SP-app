import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const rawBase = process.env.VITE_BASE_PATH;
const base =
  rawBase === undefined || rawBase === ""
    ? "/"
    : rawBase.endsWith("/")
      ? rawBase
      : `${rawBase}/`;

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
