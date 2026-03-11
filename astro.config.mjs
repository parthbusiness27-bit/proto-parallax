// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: 'https://hustleteacher.vercel.app',

	integrations: [
		mdx(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		}),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],
	output: 'static',
	image: {
		service: {
			entrypoint: 'astro/assets/services/sharp',
		},
	},
	vite: {
		plugins: [tailwindcss()],
		build: {
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
				},
			},
		},
	},
});
