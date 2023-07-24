import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/users-list-test/",
  plugins: [react(), tsconfigPaths()],
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify("https://jsonplaceholder.typicode.com"),
    __PROJECT__: JSON.stringify("frontend"),
  },
});
