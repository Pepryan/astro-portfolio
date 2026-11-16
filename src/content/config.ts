import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';
import { parseStravaEmbed } from '../lib/strava';

/**
 * Hikes for /trekking, one entry per key in src/data/treks.yaml.
 * `strava` is the embed code exactly as Strava gives it (Share → Embed).
 */
const treks = defineCollection({
  loader: file('src/data/treks.yaml'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    distance: z.number().nonnegative().optional(), // km
    elevation: z.number().nonnegative().optional(), // elevation gain, m
    time: z.string().optional(), // as Strava shows it, e.g. "2h 16m"
    summit: z.number().positive().optional(), // highest point, m above sea level
    note: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    strava: z
      .string()
      .optional()
      .transform((code, ctx) => {
        if (!code) return undefined;
        const embed = parseStravaEmbed(code);
        if (!embed) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Paste the whole Strava embed code (it needs data-embed-id and data-token).',
          });
          return z.NEVER;
        }
        return embed;
      }),
  }),
});

const series = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(), // Display name of the series
    slug: z.string(), // URL-friendly identifier
    description: z.string(), // Series description
    thumbnail: z.string().optional(), // Series cover image
    status: z.enum(['ongoing', 'completed', 'planned']).default('ongoing'),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional(),
    difficulty: z.string().optional(),
    estimatedParts: z.number().optional(), // Expected number of parts
    startDate: z.coerce.date().optional(), // When series started
    endDate: z.coerce.date().optional(), // When series completed
    featured: z.boolean().optional().default(false), // Featured series
    order: z.number().optional(), // Display order on series page
  }),
});

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
    // Series configuration
    series: z.object({
      name: z.string(), // Series name (e.g., "Kubernetes Deep Dive")
      slug: z.string(), // URL-friendly series identifier (e.g., "kubernetes-deep-dive")
      part: z.number(), // Part number in the series (1, 2, 3, etc.)
      total: z.number().optional(), // Total parts in series (optional, can be calculated)
      description: z.string().optional(), // Series description
      thumbnail: z.string().optional(), // Series-specific thumbnail
      order: z.number().optional(), // Custom ordering within series (defaults to part number)
    }).optional(),
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
  series,
  treks,
};
