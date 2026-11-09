# Case study: Personal website

A running history of how Pavlos's personal site came together, written so it can later become a case study or article.

## Goal

A personal site for sharing learnings, thoughts, and updates. It should feel like the person behind it: a designer who is minimalist, tech savvy, chill, positive, introverted, European, and modern.

## Timeline

### 2026-11-06 · Nine design directions

**What happened.** Before choosing a stack or writing any real posts, we explored the visual and structural direction first. Nine full homepage mocks were built as static HTML in `concepts/`, plus a gallery page (`concepts/index.html`) that previews them side by side.

**Method.** Every concept uses the same content (the same posts, the same "now" items, the same bio idea), so the comparison is about feeling and structure, not copy. Each direction leans on a different part of the personality brief:

| # | Concept | Personality trait it leans on |
|---|---------|-------------------------------|
| 01 | Paper | Minimalist, calm, timeless |
| 02 | Terminal | Tech savvy, keyboard first |
| 03 | Swiss | European designer, confident |
| 04 | Index | Systematic, archive minded |
| 05 | Garden | Positive, learning in public without pressure |
| 06 | Ambient | Chill, introvert, modern |
| 07 | Bento | Personal, playful, modern |
| 08 | Letter | Warm, human, introvert who writes |
| 09 | Desk | Designer's canvas, experimental |

**Craft decisions worth noting.**
- Warm off-white and paper grounds instead of cold grey-white on every light concept, since cold grounds read as cheap and generic.
- One accent colour per concept at most, so the personality comes from type and layout rather than decoration.
- Small working interactions where they prove the idea: j/k keyboard navigation in Terminal, working filters in Index, draggable cards in Desk, a live local clock in Ambient and Bento.
- A self-review pass in the browser caught real issues before review: Swiss grid rows had lost their side margins, Bento left an empty cell in its last row, Garden's headline was tracked too tight, and the Desk toolbar used emoji instead of proper icons. All were fixed.

**Open questions.**
- Which direction (or combination) to take forward.
- Domain and stack (Astro or similar static setup fits all nine).
- Whether a newsletter is part of v1.

**Next step.** Pick one or two favourites, then refine into a real design with article, about, and now pages.

### 2026-11-06 · Round 2: physical objects

**What happened.** Pavlos picked 09 Desk as the favourite, specifically because it resembles a real desk. That turned into a clearer brief: the site should feel like physical, real life objects. Six new concepts followed (10 to 15), each one a different object.

| # | Concept | Object and interaction |
|---|---------|------------------------|
| 10 | Workbench | Wooden table from above. Notebook, index cards, coffee, pencil, phone. Drag anything. |
| 11 | Corkboard | Pinned notes, red string linking related ideas, a ticket stub for updates. Hover straightens a note. |
| 12 | Bookshelf | Posts as book spines, one shelf per type. Click a spine to open a two page spread. |
| 13 | Card catalog | Library drawers filter by type. Typed cards flip with arrow keys and pull up to read. |
| 14 | Notebook | Open dot grid notebook with tabs, elastic band, ribbon. Tabs turn the page. |
| 15 | Postcards | Each post is a postcard with stamp and postmark. Click to flip, drag to move. |

**Why it matters for the story.** The first round was nine abstract styles. The reaction to Desk showed that the personality is less about a visual style and more about a feeling of a personal, tangible space. For an introverted designer, a homepage that looks like his own table invites people in without him having to talk loudly about himself.

**Craft notes.**
- All materials are drawn in CSS and SVG (wood grain, cork, linen, paper, brass), no stock photos. That keeps the site light and lets the textures stay warm and matte rather than glossy.
- Interactions copy the real object: cards lift with a bigger shadow when picked up, books slide up on hover, catalog cards hide behind a drawer lip, postcards flip in 3D.
- The self-review pass fixed: overlapping items on the corkboard, a sticky note whose text overflowed, half-empty bookshelves (added books so it reads as a real collection), catalog cards that all showed full text at once (added a drawer lip so only tabs show), a margin note on top of body text, and stamps that rendered as a grid instead of a perforated edge.

**Open question (round 2).** Physical metaphors need a fast plain fallback (a list view) for people who just want to read, and for mobile, where dragging objects is awkward.

### 2026-11-06 · Round 3: timelines that branch

**What happened.** Pavlos described a new idea in his own words: visitors land on the latest activity and follow a path back to earlier activity. The timeline branches by activity type (product design, hobbies, new interests, writing). When a branch dies it stops growing. Active branches keep growing.

This is the strongest brief so far, because it turns the homepage into an honest record of a person changing over time. Ended hobbies are not hidden. They are shown as part of the shape of a life, which fits a calm, positive, introverted personality: no pretending everything is ongoing, no hustle.

**Shared data.** All three concepts read from one file (`concepts/timeline-data.js`): 7 branches in 4 types, 28 events from 2019 to today. Three branches have ended (ambient music, film photography, 3D printing) and four are still growing (product design, writing, bouldering, SwiftUI). Because the data is shared, the concepts compare pure form, and the real site could keep the same data model whatever the visual choice.

| # | Concept | How "growing" and "dying" are shown |
|---|---------|-------------------------------------|
| 16 | Branches | Git style lanes. Growing lanes run to the top with a pulsing tip. Ended lanes cap off and turn grey. Filters by type, hover to trace one branch. |
| 17 | Tree | Canopy is today, roots are 2019. Live branches are bark brown with leaves and a swaying bud. Ended branches are dry, pale, leafless, with a broken twig at the end. |
| 18 | Trail map | Paper hiking map. "You are here" is today, the past is to the right. Trails fork from the main route. Ended trails stop at a "trail ends" sign, live ones end in an animated walking line. |

**Design problems solved along the way.**
- Label collisions were the main challenge, because recent months are dense (three writing posts in five weeks). The tree uses per branch label stacking with leader lines, and every label sits on the inner side of its branch so each side of the trunk has its own lane. The map uses tiered labels and a fixed label side per trail.
- Lane reuse in the Branches view: once a branch dies, its lane is free and a later branch takes it (film photography, then bouldering). That makes the "ended, then something new started" story visible without extra explanation.
- The map scales to the window height so nothing is clipped on smaller laptops, and the title card shrinks once you scroll away from today.

**Open questions.** How to handle a branch that comes back after a pause (dormant rather than dead). How far back the timeline should go. Whether each event links to a full post or some are just markers.

### 2026-11-06 · Tree, second version

**What happened.** Pavlos picked the Tree (17) to push further, with one clear note: the graphics looked amateurish and old, and should feel fresh, modern and high quality. The idea was right, the rendering was wrong. Brown bark, cartoon leaves and serif labels made it read like clip art, which is the opposite of how he wants to come across.

**What changed in `17-tree-v2.html`.**
- From illustration to fine line. The trunk is a thin tapered ink stroke and branches are 2px curves with a soft ink to colour gradient. Leaves are small line drawings that only appear on live branches.
- "Growing" became light, not decoration. Live tips have a soft glowing halo, a flowing dash and a small "growing" pill. Ended branches turn light grey, lose their leaves and carry an "ended Sep 2024" pill.
- Real type. Geist and Geist Mono replace the serif labels. Events are HTML cards (date, status, title), so text is crisp and selectable instead of SVG text.
- Motion with purpose. The tree draws itself in as you scroll, so the past literally unfolds. A small "Viewing 2023" widget tracks where you are in time.
- An index up top lists every branch with its years. Hover one to highlight it in the tree, click to jump to where it started.
- The first version is kept as `17-tree.html` for comparison. The gallery card now points to v2.

**Craft fixes found in review.** Leaves drifted off their branches because they rotated around their own bounding box instead of the stem point. Start cards on outer branches sat on top of the curve that joins the trunk, so they now sit on the outer side. On inner branches flipping them would collide with the neighbouring branch, so those are raised above the fork instead. The heavy halo on the trunk tip was replaced with a small dark "Pavlos" tag.

**Decision (2026-11-07).** Pavlos chose Tree v2 as the direction for the real site, out of 18 concepts across three rounds.

**Lesson.** A metaphor can be organic while the rendering stays precise. The tree works best as a data visualisation that hints at a tree, not as a drawing of one.

### 2026-11-07 · From mock to real site

**Decisions.** Pavlos will host on Vercel and write entries as Markdown files. The first version has three pages: the tree homepage, one page per entry, and About. All sample entries were removed, so the tree starts empty and grows from his first real entry.

**Stack.** Astro 7, fully static, zero config on Vercel. Two content collections: `branches` (name, category, optional end date) and `entries` (title, date, branch, optional body). A branch's start date comes from its first entry, so there is nothing to keep in sync by hand.

**Design problems solved while generalising the mock.**
- The mock had hand-placed lanes. The real tree has to lay itself out from any data, so lanes are now picked by a small search that minimises fork curves crossing other branches. Crossing a live branch costs more than crossing an ended one, because it is more visible. A lane can only be reused some months after its branch ended, so a new fork never lands on an old "ended" tag.
- Cards were narrowed from 190px to 176px, so text never touches the neighbouring branch.
- Every branch's first card sits just above its fork, on the inner side, so it never overlaps the curve or the year column.
- A 1200px tree is unreadable on a phone. Below 760px the page switches to a vertical feed grouped by year, using the same colours, and the branch pills become one swipeable row.
- An empty state for launch day: a single sprout with a glowing tip and "The first branch is about to sprout", so the site looks intentional before any content exists.
- The entry page repeats the tree in miniature: an "On this branch" timeline in the branch colour, with the current entry filled in.
- Entries without a body show on the tree as plain markers and are not links, so nothing leads to an empty page.

### 2026-11-07 · When one thing belongs to two subjects

**The question.** Pavlos asked what happens when an entry sits in two subjects, for example a post that is both writing and product design.

**Options weighed.** Putting the entry on both branches would double count it and add labels to already busy months. A two-colour dot would say "two subjects" without showing where the second one lives. A node floating between branches does not work when the branches sit on opposite sides of the trunk. The rule we chose has two parts:
- **A one-off overlap becomes a bridge.** The entry lives on its main branch. A small hollow "echo" dot marks the same moment on the second branch, and the card reads "+ Product design". The dashed bridge between the two only appears on hover, along with both branches. Our first attempt showed every bridge all the time, and long bridges from recent entries arced across the whole tree and through their own cards. Hiding them until hover kept the tree calm and made the connection feel like a discovery.
- **A recurring overlap becomes a sub-branch.** If the overlap keeps happening, it is a new interest. That branch can grow out of another branch instead of the trunk, which is how real trees grow and makes "where did this come from" visible. The layout search was extended so a sub-branch prefers the lane next to its parent and pays a cost for crossing the trunk. Without that, the first test placed the sub-branch on the opposite side of the tree.

**Content model.** Entries take `also: [branch-id]`. Branches take `from: parent-id`. Both are optional and are checked at build time, so a typo in a branch name fails the build with a clear message instead of silently drawing nothing.

**Preview.** `npm run demo` loads the old sample data as `demo-*.md` files that git ignores, so the tree can be shown without real content ever leaking into a deploy.

### 2026-11-07 · Redesigning the roots

**Feedback.** Pavlos flagged the bottom of the tree (six grey root lines and a caption) as basic and amateurish. The roots were pure decoration: they said nothing and gave the reader nothing to do at the end of a long scroll.

**Four directions, mocked in `concepts/roots-options.html`.** Each gives the ending a job.
- A. Root system and origin card: fine, procedurally grown hair roots fading into a soft soil band, with a glass card summarising the tree (years, branches, still growing, entries).
- B. Growth rings: the trunk meets the ground as a cross-section, with one ring per year and today as a dashed green outer ring.
- C. Roots that mirror the branches: one root per branch, in its colour, with depth showing how long it lasted. The longest-lived branch is the taproot, and shorter ones fan outward so no roots cross. The bottom becomes an index.
- D. The beginning, with a way back: the trunk ends on a ground line, big closing type, and "Back to today" and "Read the first entry" buttons.

**Decision.** Pavlos chose C, with one important change: the roots should not repeat the branches. They show his background and interests, the things that feed everything above ground: design, photography, business and books. That separates two kinds of information. Branches are what he did, over time. Roots are where it comes from, and have no dates. The roots are monochrome ink, so they never compete with the category colours of the branches. The first root in the list becomes the deepest one. They are edited as a short list in `src/lib/site.ts`, each with an optional one-line note, and on phones they appear as a "Roots" row of pills at the end of the feed. Small rootlets were tried for texture but read as loose dashes, so they were removed.

**Craft fixes during the mock.** The first procedural roots were too dense and read as a fuzzy blob, so branching depth and opacity came down. Ring year labels sat on the rings, so only 2019 and today are labelled. The mirrored roots crossed each other until they were arranged as a taproot.

### 2026-11-09 · Blog writing process and voice setup

**What happened.** Blog content will start with conversation-first pieces, beginning with notes on *Steal Like an Artist*. Process: talk the topic through, then write the article only from what Pavlos said, in his tone, and refine the voice from corrections over many conversations.

**Durable artifact.** Personal blog voice lives at `~/.cursor/skills/content-helper/references/personal-blog-voice.md`, separate from Bob LinkedIn voice and from sales/offer copy. Learned tone sections stay empty until real conversation samples and corrections exist. Hard constraints from WRONG_LOG already apply (no em dashes, no AI thesis pattern, no three-line noun-phrase example stacks).

**Next step.** Run the first conversation on *Steal Like an Artist*, then draft the article from that conversation only and update the voice file from any corrections.

### 2026-11-09 · First article draft under review

**What happened.** After a conversation-first pass on *Steal Like an Artist*, a draft was written only from Pavlos's notes into `drafts/steal-like-an-artist.md`. Framing: first read at ~20 (second book he ever read), reread at 30. Body follows the highlights he reacted to. Digital product examples kept light on purpose.

**Status.** He reviewed the draft, kept it as the tone sample (small grammar fixes: exist→exists, Johnny→Jony), and authorized learning voice from it. Learned voice in `content-helper/references/personal-blog-voice.md` was filled from this piece on 2026-11-09.

### 2026-11-09 · GitHub repo created

**What happened.** The project was pushed to a new public GitHub repo at [github.com/pavlosts/personal-website](https://github.com/pavlosts/personal-website). Local branch renamed from `master` to `main` and set to track `origin/main`. The article draft in `drafts/` stayed local and untracked.

### 2026-11-09 · First real entry published on the tree

**What happened.** *Rereading Steal Like an Artist* went live as the first real content entry: `src/content/entries/rereading-steal-like-an-artist.md` dated 2026-11-09. It sits on the **Books** branch (`src/content/branches/books.md`, category writing). An initial Writing branch was swapped to Books so book notes live on their own lane.

### 2026-11-09 · Hosted on Vercel

**What happened.** The site is live on Vercel, linked to the GitHub repo so future pushes can redeploy. Project: `pavlosts-projects/personal-website`. Framework set to Astro with `npm run build` and output `dist`. Production URL: [personal-website-tau-three-77.vercel.app](https://personal-website-tau-three-77.vercel.app). Local demo content and drafts are excluded from CLI deploys via `.vercelignore`.

### 2026-11-09 · Root article interview started

**What happened.** Began gathering material for the origin / root article that will sit at the bottom of the tree and explain what the site is and why it exists. Conversation-first, same process as the Steal Like an Artist piece.

**Core story so far (from Pavlos).** Social profiles are useful but niche-locked: LinkedIn for product design work, Instagram for Latin dance photography. ADHD means he constantly tries many things, and he never had a place to share the rest. This site is targeted at him as a whole person, not at one craft. Path in short: started in photography, explored graphic design, now freelance digital product design, and in free time experiments with physical product design (lamps, home decoration). Reads a lot, mostly design and business. The tree is a living timeline of growth: what he is working on now, plus what came before as interests and views change. Roots named so far: Design (passion ~10 years, graphic → product), Photography (first real job, hobby turned work, still a side job), Business (entrepreneurial streak since childhood, including selling in-game items in WoW at ~15), Books (started ~10 years ago with Shoe Dog; thought books were boring until then; ~100 books since, design / business / self-improvement). Audience: people who know him or want to know him as a whole — photographers who do not know the design work, designers who do not know the photography or the book habit, etc.

**Draft decisions.** Childhood / WoW business stories stay short. Length: pretty short but not tiny. Nothing private beyond what he already said. No forced one-liner he did not write. Inspiration credit: *Show Your Work!* (second book in Austin Kleon's trilogy), not *Steal Like an Artist*.

**Published.** Live as a Writing-branch entry: `src/content/entries/why-this-site.md`, with portrait at `public/images/pavlos.jpg`. Draft kept at `drafts/why-this-site.md`.

### 2026-11-09 · PostHog analytics added

**What happened.** Product analytics was wired into the Astro site with a dedicated PostHog project named **Personal Website** (EU cloud). The JS web snippet loads from `src/components/posthog.astro` into the shared `Base` layout, gated on `PUBLIC_POSTHOG_PROJECT_TOKEN` / `PUBLIC_POSTHOG_HOST`.

**Events tracked beyond automatic pageviews.**
- `branch_filter_clicked` — homepage branch pills
- `note_opened` — opening a note from the tree or mobile feed
- `tree_scroll_depth` — 25 / 50 / 75 / 100% homepage scroll milestones
- `note_viewed` — note page open with slug / branch context
- `back_to_tree_clicked`, `note_external_link_clicked`, `branch_note_clicked` — note-page navigation

**Ops note.** Local values live in `.env.local`. Production needs the same `PUBLIC_*` vars in Vercel so the live site can send events.