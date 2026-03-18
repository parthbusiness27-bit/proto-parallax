import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			seoTitle: z.string().optional(),
			description: z.string(),
			metaDescription: z.string().optional(),
			// SEO Keywords
			primaryKeyword: z.string().optional(),
			secondaryKeywords: z.array(z.string()).optional(),
			longTailKeywords: z.array(z.string()).optional(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			category: z.string().default('Uncategorized'),
			hidden: z.boolean().default(false),
			// FAQ Schema
			faqs: z.array(z.object({
				question: z.string(),
				answer: z.string(),
			})).optional(),
		}),
});

const tools = defineCollection({
	loader: glob({ base: './src/content/tools', pattern: '**/*.{md,json}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		longDescription: z.string().optional(),
		category: z.string().default('General'),
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
