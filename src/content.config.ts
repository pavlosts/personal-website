import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_IDS } from './lib/site';

const branches = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/branches' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(CATEGORY_IDS),
    ended: z.coerce.date().optional(),
    from: z.string().optional(),
  }),
});

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entries' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    branch: z.string(),
    also: z.array(z.string()).default([]),
  }),
});

export const collections = { branches, entries };
