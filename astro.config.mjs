import { defineConfig } from 'astro/config';

export default defineConfig({
  srcDir: './src',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  redirects: {
    '/notes/why-this-site': '/about',
  },
});
