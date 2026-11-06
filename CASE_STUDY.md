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
