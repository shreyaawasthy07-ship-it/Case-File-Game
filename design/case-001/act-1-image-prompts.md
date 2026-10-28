# THE GREY DISTRICT — Image Prompts (Graphic Novel Noir)

**Art direction:** the whole game is drawn as a **dark crime graphic novel**: bold ink lines, flat colour, heavy black shadows, one strong light per image. Serious, not cute.

This file covers:
- **Part 1**: redrawing the art the game **already uses** (so old and new match)
- **Part 2**: new art for **Case File 001, Act 1**

---

## 0. How to use

### The style block (paste before every prompt)
```
graphic novel illustration, bold black ink linework, flat cel shading, heavy noir shadows with solid black areas, limited muted palette of charcoal, steel grey, cold blue and amber, one strong light source, gritty crime-thriller comic style, mature serious tone, no text, no letters, no watermark
```

### Negative prompt (Leonardo / Stable Diffusion; for Midjourney put it after `--no`)
```
photo, photorealistic, 3d render, anime, chibi, cute, kawaii, pixar, disney, bright saturated colours, pastel, text, letters, words, watermark, logo, extra fingers, distorted hands
```

### Accent colours: use only where the story needs them
- **Amber** `#B89A57`: warm light, allies, key evidence
- **Cold blue** `#536B78`: screens, CCTV, night
- **Muted red** `#8E3030`: danger only, rarely

### Workflow
1. **Make the style key first (S-01 below).** This is Shivvya, redrawn from your existing `shivvya.png`. Once she looks right, **this image is the style reference for everything else.**
2. **Every later prompt** = style block + asset prompt, plus:
   - **Midjourney:** `--sref <S-01 URL>` on everything. For a known character, add `--cref <their image URL> --cw 100`.
   - **ChatGPT:** upload S-01 and write *"In exactly the same art style as the attached image, …"*. To redraw an existing picture, upload that picture too and write *"Redraw this person/scene…"*
   - **Leonardo:** Style Reference = S-01. Character Reference = the person's image.
3. **Generate 4 options and pick the best.** Check hands, and check that **no text** appeared anywhere.
4. **Save as WebP, under 300 KB.**

### Aspect ratios
| Kind | Ratio | Midjourney |
|---|---|---|
| Scenes, team cards, backgrounds | 3:2 | `--ar 3:2` |
| Player character (full body) | 2:3 | `--ar 2:3` |
| Home screen background | 16:9 | `--ar 16:9` |
| Profile / ID / file photos | 4:5 | `--ar 4:5` |
| Evidence objects | 1:1 | `--ar 1:1` |

**Phone rule:** keep faces and key objects in the **centre third**. Phones crop the sides.

---

# PART 1 — Redraw the existing art

**Save each new image with the SAME filename in the SAME place.** The game will pick it up with no code changes. Before you overwrite anything, **move the old realistic images into a folder called `_old-realistic/`** so nothing is lost.

For each one, upload the existing image as the reference and use:
```
Redraw this exact person and composition as a graphic novel illustration. Keep the same pose, clothes, hairstyle, face shape, framing and lighting direction. [style block]
```
Then add the extra line from the table.

### S-01 · Shivvya: the STYLE KEY ⭐ do this first
`shivvya.png` → reference · 3:2 *(also save a copy as `assets/characters/shivvya/portrait.webp`)*
```
Redraw this exact woman as a graphic novel illustration: 26-year-old Indian investigative journalist at a cluttered newsroom desk at night, olive utility jacket, press lanyard, desk lamp casting warm amber light on one side of her face, the rest in deep ink shadow, wall of pinned papers behind her blurred into simple shapes with no readable words
```
✅ **Check before moving on:** Is she clearly drawn, not a photo? Serious, not cute? Is her face still expressive? Is there no text anywhere (the original image has a headline on the wall, so make sure it's gone)? If yes, this is your style key.

### Existing art to redraw

| # | File | Extra line to add |
|---|---|---|
| R-01 | `story/government official.png` | *Director Arvind Rao: senior Indian government official, grey hair, stern and composed, dark suit, government office at night, amber lamp light* |
| R-02 | `field investigator.png` | *Maya Sharma: field investigator at a desk, brown jacket, case board with red string behind her* |
| R-03 | `forensic.png` | *Dr. Neel Mehra: forensic specialist, lab coat, cold blue lab light* |
| R-04 | `intelligence.png` | *Arjun Khanna: intelligence / tech specialist, lit by cold blue monitor glow* |
| R-05 | `character/male-neutral.png` | *male lead investigator, dark trench coat, standing, red and blue rim light from behind* · 2:3 |
| R-06 | `character/female-neutral.png` | *female lead investigator, same framing and lighting as the male version* · 2:3 |
| R-07 | `character/character-bg.png` | *same background, as a graphic novel panel, no people* |
| R-08 | `homepagee/background.png` | *abandoned police building at night, crime-scene tape in the foreground, police lights* · 16:9 · keep the centre clear for the title |

> `homepagee/grey-district-title-overlay.png` is the title image. **Keep it as it is.** Text stays crisp that way.

### Player-character emotions (12 images)

Once R-05 and R-06 are done, use **R-05 as `--cref`** for the male set and **R-06** for the female set. Then for each emotion:
```
Same character, same outfit, same framing, chest-up, [EMOTION], [style block]
```

| File (male / female) | EMOTION |
|---|---|
| `male-focused.png` / `female-focused.png` | *focused, eyes narrowed, studying something* |
| `male-concerned.png` / `female-concerned.png` | *concerned, brows drawn together* |
| `male-suspicious.png` / `female-suspicious.png` | *suspicious, side glance, head slightly tilted* |
| `male-angry.png` / `female-angry.png` | *angry, jaw clenched, hard stare* |
| `male-shocked.png` / `female-shocked.png` | *shocked, eyes wide, mouth slightly open* |
| `male-tension.png` / `female-tension.png` | *tense, holding breath, shadow falling across the eyes* |

---

# PART 2 — Case File 001, Act 1: new art

New files go into `assets/…` (the folders already exist).

## Characters

### C-02 · Shivvya: phone selfie (a photo from her life)
`assets/characters/shivvya/selfie.webp` · 4:5 · `--cref` S-01
```
Same woman, casual selfie at arm's length on a rooftop at dusk, slight smile, city lights behind her as simple glowing shapes, warmer amber palette than usual, softer shadows
```
*This is the one warm, happy image of her. It should hurt a little to look at.*

### C-03 · Shivvya: press ID photo
`assets/characters/shivvya/id-photo.webp` · 4:5 · `--cref` S-01
```
Same woman, straight-on ID portrait, neutral expression, plain flat grey background, even light, hair tied back
```

### C-04 · ACP Garvit Sehgal: warm and trustworthy
`assets/characters/garvit/portrait.webp` · 3:2
```
48-year-old Indian senior police officer (ACP), neat salt-and-pepper hair, trimmed moustache, calm reassuring polite smile, khaki uniform with shoulder insignia, tidy wood-panelled office, warm amber lamp light, open welcoming posture
```
*No villain shadows yet. He must look like someone you'd trust.*

### C-05 · SI Kabir Rathore: personnel file photo
`assets/characters/kabir/file-photo.webp` · 4:5
```
34-year-old Indian police sub-inspector, short cropped black hair, stubble, strong jaw, guarded unreadable expression, khaki uniform, plain off-white background, harsh flat flash light, straight-on file photo
```
*Keep this. His full Act 2 art will use it as `--cref`.*

### C-06 · Ishaan Verma: editor
`assets/characters/ishaan/portrait.webp` · 3:2
```
40-year-old Indian newspaper editor, rimless glasses, greying stubble, creased light-blue shirt with rolled sleeves, dim newsroom at night, tired earnest expression
```
`worried.webp`: *same man, worried, rubbing his forehead, looking down*

### C-07 · Pooja: café worker
`assets/characters/pooja/portrait.webp` · 3:2
```
22-year-old Indian woman café worker, low ponytail, dark apron over a maroon t-shirt, behind a small café counter at night, warm hanging bulbs, honest slightly nervous expression
```
`uneasy.webp`: *same woman, uneasy, glancing sideways, arms folded*

### C-08 · Ramesh Yadav: security guard
`assets/characters/ramesh/portrait.webp` · 3:2
```
55-year-old Indian apartment security guard, grey moustache, weathered face, faded navy guard uniform and cap, inside a cramped gate cabin lit by one bare yellow bulb from above, open register book on the table, stiff defensive expression
```
`afraid.webp`: *same man, afraid and guilty, eyes lowered, hands clasped tightly*

## Backgrounds (3:2, no people, keep the centre-bottom empty for UI panels)

| # | File | Prompt |
|---|---|---|
| B-01 | `assets/backgrounds/hub.webp` | *dark government investigation room at night, metal desk with green banker's lamp, monitors glowing cold blue, big cork case board with pinned photos and red string, filing cabinets, venetian-blind light stripes* |
| B-02 | `assets/backgrounds/apartment.webp` | *small Indian one-bedroom apartment at night from the doorway, lights off, one desk lamp on, desk with a laptop charger but no laptop, notebook with torn-out pages, shelves of files, curtains half-open* |
| B-03 | `assets/backgrounds/overbridge.webp` | *deserted concrete pedestrian overbridge over an empty city road at night, sodium streetlights in orange pools, deep black shadows between them, wet ground reflections* |
| B-04 | `assets/backgrounds/gate-cabin.webp` | *small security cabin at an Indian apartment gate at night, one bare yellow bulb, plastic chair, open register, iron gate half-closed, scooters in shadow* |
| B-05 | `assets/backgrounds/cafe.webp` | *small cosy roadside café at night, warm hanging bulbs, one blue paper lantern by the door, empty wooden tables, steaming chai kettle, no signboard text* |

## CCTV stills (EV-004): 16:9

Generate all three in one sitting with the same angle. **Use this block instead of the normal style block.** Code adds the noise, scanlines and timestamps on top.
```
graphic novel panel drawn as a security camera view, high corner angle looking down, fisheye distortion, monochrome cold blue-green tones, bold ink lines, flat shading, inside a small café at night, window on the left, counter on the right, no text, no timestamp
```
| File | Add |
|---|---|
| `assets/evidence/EV-004-a.webp` | *a young woman in a utility jacket sitting alone at the window table, phone in hand* |
| `assets/evidence/EV-004-b.webp` | *same table, a man in a dark jacket and dark cap sits opposite her with his back to camera, small radio handset clipped to his belt* |
| `assets/evidence/EV-004-c.webp` | *the woman and the man in the cap walking out of the door together, his face turned away* |

## Evidence objects (1:1)

Add this before each object:
```
single object on a dark charcoal surface, top-down three-quarter view, one warm amber rim light, solid black shadow, graphic novel ink style, no text, no labels
```
| ID | File | Object |
|---|---|---|
| EV-002 | `assets/evidence/EV-002-phone.webp` | *black smartphone with a badly cracked screen, screen off, scuffed corners* |
| EV-003 | `assets/evidence/EV-003-notebook.webp` | *open spiral reporter's notebook, top pages torn out, ragged paper left in the spiral* |
| EV-003 | `assets/evidence/EV-003-charger.webp` | *laptop charger coiled on a desk, a clean dust-free rectangle where the laptop used to be* |
| EV-005 | `assets/evidence/EV-005-logbook.webp` | *old open hardbound register book, ruled lines, scribbles with no readable words, one entry squeezed between two lines in different ink* |

---

## Checklist: in this order

| # | Asset | Done |
|---|---|---|
| **S-01** | **Shivvya style key** ⭐ | ☐ |
| R-01–04 | Director + 3 team members | ☐ |
| R-05–06 | Player character male / female | ☐ |
| R-07–08 | Character screen + home backgrounds | ☐ |
| — | 12 player emotions | ☐ |
| C-02–03 | Shivvya selfie + ID | ☐ |
| C-04–05 | Garvit + Kabir | ☐ |
| C-06–08 | Ishaan, Pooja, Ramesh (×2 each) | ☐ |
| B-01–05 | 5 backgrounds | ☐ |
| EV | 3 CCTV + 4 evidence objects | ☐ |

**Total: 9 redraws + 12 emotions + 22 new = 43 images.**
To start building, you only need **S-01, R-01–04, C-04 and B-01**. Placeholders cover the rest.
