import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    summary: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().optional().default(false),
    hidden: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional(),
    thumbnail: z.string().optional(),
    keywords: z.array(z.string()).optional().default([]),
    author: z.string().optional().default('Febryan Ramadhan'),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    difficulty: z.string().optional(),
    openGraph: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      url: z.string().optional(),
    }).optional(),
    twitter: z.object({
      card: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    schema: z.object({
      type: z.string().optional(),
      headline: z.string().optional(),
      description: z.string().optional(),
      author: z.object({
        name: z.string().optional(),
        url: z.string().optional(),
      }).optional(),
      datePublished: z.string().optional(),
      dateModified: z.string().optional(),
      publisher: z.object({
        name: z.string().optional(),
        url: z.string().optional(),
      }).optional(),
    }).optional(),
  }),
});

export const collections = {
  posts,
};
