import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			category: z.string().default('Uncategorized'),
		}),
});

const tools = defineCollection({
	loader: glob({ base: './src/content/tools', pattern: '**/*.{md,json}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		icon: z.string().optional(),
		url: z.string(),
		isPremium: z.boolean().default(false),
		price: z.string().optional(),
	}),
});

const resources = defineCollection({
	loader: glob({ base: './src/content/resources', pattern: '**/*.{md,json}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		icon: z.string().optional(),
		url: z.string(),
		isPremium: z.boolean().default(false),
		price: z.string().optional(),
	}),
});

export const collections = { blog, tools, resources };
