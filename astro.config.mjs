import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [// Agrega otras integraciones si las necesitas, como sitemap(), etc.
  react(), tailwind()],
});