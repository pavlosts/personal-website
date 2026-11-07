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
  from?: string;
  entries: Entry[];
}

export interface Entry {
  slug: string;
  title: string;
  date: Date;
  branchId: string;
  also: string[];
  kind: Kind;
  hasBody: boolean;
  raw: CollectionEntry<'entries'>;
}

export async function loadTimeline() {
  const [branchFiles, entryFiles] = await Promise.all([getCollection('branches'), getCollection('entries')]);
  const known = new Set(branchFiles.map((b) => b.id));
  const missing = (where: string, id: string) =>
    new Error(`${where} points to branch "${id}", but src/content/branches/${id}.md does not exist.`);

  for (const e of entryFiles) {
    if (!known.has(e.data.branch)) throw missing(`Entry "${e.id}"`, e.data.branch);
    for (const id of e.data.also) if (!known.has(id)) throw missing(`Entry "${e.id}" (also)`, id);
  }
  for (const b of branchFiles) {
    if (b.data.from && (!known.has(b.data.from) || b.data.from === b.id)) throw missing(`Branch "${b.id}" (from)`, b.data.from);
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
        also: e.data.also.filter((id) => id !== b.id),
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
        from: b.data.from,
        entries,
      };
    })
    .filter((b) => b.entries.length > 0)
    .sort((a, c) => a.start.getTime() - c.start.getTime());

  const ids = new Set(branches.map((b) => b.id));
  for (const b of branches) {
    if (b.from && !ids.has(b.from)) b.from = undefined;
    const parent = branches.find((p) => p.id === b.from);
    if (parent && parent.start > b.start) {
      throw new Error(`Branch "${b.id}" grows from "${parent.id}", but starts before it. Its first entry must be after ${parent.start.toISOString().slice(0, 10)}.`);
    }
  }

  const entries = branches
    .flatMap((b) => b.entries)
    .sort((a, c) => c.date.getTime() - a.date.getTime());

  return { branches, entries };
}
