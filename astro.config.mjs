// // astro.config.mjs
// import { defineConfig } from 'astro/config';
// import tailwind from '@astrojs/tailwind';

// export default defineConfig({
//   output: 'static', // Generates a static site
//   integrations: [tailwind()],
// });



// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server', // Required for SSR & API routes
  integrations: [
    tailwind(), // ✅ keep integrations clean
  ],
  adapter: node({
    mode: 'standalone', // ✅ adapter must be declared here, not in integrations
  }),
});
