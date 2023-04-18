import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "afterviewportjs",
      fileName: "afterviewportjs",
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  server: {
    port: 8080,
    hot: true,
  },
});
