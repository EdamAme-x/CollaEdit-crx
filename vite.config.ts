import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import UnoCSS from 'unocss/vite';

const manifest = defineManifest({
  manifest_version: 3,
  name: "CollaEdit",
  version: "1.0.0",
  permissions: ["scripting", "tabs"],
  action: {
    default_popup: "index.html",
  },
  background: {
    service_worker: "background.js",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["content-scripts.js"]
    }
  ]
});

export default defineConfig({
  plugins: [react(), crx({ manifest }), UnoCSS()],
});