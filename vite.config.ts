import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  // base: '/'
  // The site is served from a custom domain at the root (blnkdisplay.com).
  // '/' is correct — do NOT change this to a subpath unless the domain
  // changes to a github.io/<repo> URL without a custom domain.
  // If that ever happens, also update pathSegmentsToKeep in public/404.html.
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
