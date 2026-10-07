import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    context: z.string(),
    status: z.enum(['production', 'pre-launch', 'released', 'building']),
    role: z.string(),
    team: z.string(),
    period: z.string(),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
    homepageOrder: z.number().int().positive(),
    technologies: z.array(z.string()).default([]),
    published: z.boolean().default(true),
  }),
});

export const collections = { work };
