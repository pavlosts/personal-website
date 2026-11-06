import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, ENDED_COLOR, type CategoryId } from './site';

export type Kind = 'start' | 'end' | '';

export interface Branch {
  id: string;
  name: string;
  category: CategoryId;
  color: string;
  start: Date;
  ended?: Date;
  entries: Entry[];
}

export interface Entry {
  slug: string;
  title: string;
  date: Date;
  branchId: string;
  kind: Kind;
  hasBody: boolean;
  raw: CollectionEntry<'entries'>;
}

export async function loadTimeline() {
  const [branchFiles, entryFiles] = await Promise.all([getCollection('branches'), getCollection('entries')]);
  const known = new Set(branchFiles.map((b) => b.id));

  for (const e of entryFiles) {
    if (!known.has(e.data.branch)) {
      throw new Error(`Entry "${e.id}" points to branch "${e.data.branch}", but src/content/branches/${e.data.branch}.md does not exist.`);
    }
  }

  const branches: Branch[] = branchFiles
    .map((b) => {
      const list = entryFiles
        .filter((e) => e.data.branch === b.id)
        .sort((a, c) => a.data.date.getTime() - c.data.date.getTime());
      const entries: Entry[] = list.map((e, i) => ({
        slug: e.id,
        title: e.data.title,
        date: e.data.date,
        branchId: b.id,
        kind: i === 0 ? 'start' : b.data.ended && i === list.length - 1 ? 'end' : '',
        hasBody: !!e.body?.trim(),
        raw: e,
      }));
      return {
        id: b.id,
        name: b.data.name,
        category: b.data.category,
        color: b.data.ended ? ENDED_COLOR : CATEGORIES[b.data.category].color,
        start: entries[0]?.date,
        ended: b.data.ended,
        entries,
      };
    })
    .filter((b) => b.entries.length > 0)
    .sort((a, c) => a.start.getTime() - c.start.getTime());

  const entries = branches
    .flatMap((b) => b.entries)
    .sort((a, c) => c.date.getTime() - a.date.getTime());

  return { branches, entries };
}
