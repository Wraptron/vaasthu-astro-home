// // @ts-check

// import { defineConfig } from 'astro/config';

// import tailwindcss from '@tailwindcss/vite';


// // https://astro.build/config
// export default defineConfig({
//   output: "server", // <-- add this
//   vite: {
//     plugins: [tailwindcss()]
//   }
// });
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node"; // 👈 add this

// https://astro.build/config
export default defineConfig({
  output: "server", // server mode
  adapter: node({ mode: "standalone" }), // 👈 configure Node adapter
  vite: {
    plugins: [tailwindcss()],
  },
});

