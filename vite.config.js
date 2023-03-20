import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "afterviewportjs",
      fileName: "afterviewportjs",
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
});
