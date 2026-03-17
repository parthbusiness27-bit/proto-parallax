// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: 'https://hustle-teacher.vercel.app',

	integrations: [
		mdx(),
		sitemap({
			changefreq: 'weekly',
			priority: 0.7,
			lastmod: new Date(),
		}),
		partytown({
			config: {
				forward: ["dataLayer.push", "gtag"],
				loadScriptsOnMainThread: [
					"https://www.google-analytics.com",
					"https://www.clarity.ms"
				]
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
		plugins: [
			// @ts-ignore - mismatch between Astro's internal Vite types and Tailwind's Vite types
			tailwindcss()
		],
		build: {
			minify: 'terser',
			cssCodeSplit: true,
			terserOptions: {
				compress: {
					drop_console: true,
				},
			},
		},
	},
});
