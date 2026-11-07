// Loads sample content as demo-*.md files (ignored by git) so the tree can be previewed.
// npm run demo        add demo content
// npm run demo:clear  remove it
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const dirs = ['branches', 'entries'].map((d) => path.join(root, 'src/content', d));

for (const d of dirs) for (const f of fs.readdirSync(d)) if (f.startsWith('demo-')) fs.unlinkSync(path.join(d, f));
if (process.argv[2] === 'clear') { console.log('Demo content removed.'); process.exit(0); }

const ctx = {};
new Function('ctx', fs.readFileSync(path.join(root, 'concepts/timeline-data.js'), 'utf8') + '\nctx.B=BRANCHES;ctx.E=EVENTS;')(ctx);
const FROM = { swift: 'design' };
const ALSO = { 'Naming things is half the interface': ['design'], 'Rebuilt this site with less': ['design'], 'Ten posts in': ['photo'], 'Sent my first V4': ['writing'] };
const id = (b) => `demo-${b}`;

for (const b of ctx.B) {
  fs.writeFileSync(path.join(dirs[0], `${id(b.id)}.md`),
    `---\nname: ${b.name}\ncategory: ${b.cat}\n${b.end ? `ended: ${b.end}-15\n` : ''}${FROM[b.id] ? `from: ${id(FROM[b.id])}\n` : ''}---\n`);
}
ctx.E.forEach((e, i) => {
  const also = ALSO[e.t] ? `also: [${ALSO[e.t].map(id).join(', ')}]\n` : '';
  const body = i % 3 === 0
    ? `\nThis is sample text so you can see how an entry page reads. Real entries can be a few lines or a long essay.\n\n## A section heading\n\nParagraphs, **bold text**, [links](https://example.com), lists and images all work in Markdown.\n\n- One small point\n- Another small point\n\n> A quote looks like this.\n`
    : '';
  fs.writeFileSync(path.join(dirs[1], `demo-${String(i).padStart(2, '0')}.md`),
    `---\ntitle: "${e.t.replace(/"/g, '\\"')}"\ndate: ${e.d}\nbranch: ${id(e.b)}\n${also}---\n${body}`);
});
console.log(`Demo content added: ${ctx.B.length} branches, ${ctx.E.length} entries.`);
