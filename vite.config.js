import htmlPurge from "vite-plugin-html-purgecss";

export default {
  server: {
    port: 8080,
    hot: true,
  },
  plugins: [htmlPurge({ safelist: [/show/, /hide/] })],
};
