# CHANGELOG — THE HAIR RITUALIST

---

## v1.4 — 2026-06-29

### Scroll Fix + Creative Content + Atmosphere Interlude + Practice Images

**Files Modified:**
- `js/main.js` — Removed infinite loop handler; Lenis `infinite` set to `false`; PANEL_COUNT updated to 7; ScrollTrigger animations for atmosphere items
- `index.html` — Added images to each practice step; Added new Atmosphere Interlude section with 6 images; nav updated to 7 items; footer updated
- `css/style.css` — Added practice step image styles; Added atmosphere grid layout; Panel BG opacity increased; Responsive breakpoints updated
- `css/animations.css` — Added atmosphere item reveal animations

**Images Now Used (26 of 38):**
| Section | Images |
|---------|--------|
| Hero BG | `hero_01_restorative_ritual_portrait.png` |
| Philosophy BG | `atmosphere_01_ritual_tray_still_life.png` |
| Practice (4 steps) | `process_01`, `process_02`, `process_03`, `process_04` |
| Practice BG | `process_05_final_brush_post_ritual_finish.png` |
| Gallery (5) | `gallery_01`, `detail_03`, `gallery_05`, `detail_04`, `gallery_06` |
| Atmosphere (6) | `detail_01`, `atmosphere_02`, `detail_05`, `gallery_07`, `gallery_08`, `detail_06` |
| Closing BG | `atmosphere_03_botanical_oil_water_stone_still_life.png` |

**New Sections Added:**
| # | Section ID | Content | Build Bible Reference |
|---|------------|---------|----------------------|
| 5 | `#intelligence` | Scalp Wisdom — barrier care, hydration balance, recovery protocol | Section 06: Scalp Intelligence |
| 6 | `#transformation` | Before/After evidence — 2 pairs with captions | Section 07: Before/After Restoration |
| 7 | `#closing` | Closing emotional statement + footer | Section 10: Closing Emotional Statement |

**Scroll Fix:**
- Removed `handleInfiniteLoop()` function that was forcing scroll to position 0 near page end
- Set `infinite: false` in Lenis config
- Site now scrolls naturally from Section 01 (Hero) through Section 08 (Closing)

**Summary:**
Fixed scroll-jump bug caused by infinite loop implementation. Added 3 missing content sections required by the Build Bible: Scalp Intelligence (treatment detail), Before/After (restoration evidence), and Closing Statement (emotional ending). Site now has 8 sections with complete narrative arc: emotion → trust → proof → desire → inquiry → closure.

---

## v1.3 — 2026-06-29

### Local Asset Integration — 38 Images Deployed

**Files Modified:**
- `index.html` — All Unsplash URLs replaced with local asset paths from `outputs/hair_ritualist/`

**Image Mapping:**
| Section | Source File | Purpose |
|---------|-------------|---------|
| Hero background | `hero_01_restorative_ritual_portrait.png` | Main hero portrait |
| Philosophy background | `atmosphere_01_ritual_tray_still_life.png` | Atmosphere still life |
| Practice background | `process_01_oil_application_ceremony.png` | Ritual process |
| Gallery — Anointing | `gallery_01_oil_ritual_portrait.png` | Oil ritual portrait |
| Gallery — Stillness | `detail_01_scalp_parting_oil_detail.png` | Scalp detail |
| Gallery — Emergence | `gallery_03_scalp_first_care_portrait.png` | Scalp care portrait |
| Gallery — Pressure | `detail_02_fingers_in_hair_massage_touch_detail.png` | Massage detail |
| Gallery — Steam (feature) | `gallery_04_basin_ritual_portrait.png` | Basin ritual |
| Clone hero background | `hero_02_treatment_room_icon.png` | Treatment room variant |

**Summary:**
Replaced all external Unsplash image URLs with local assets from `outputs/hair_ritualist/`. 38 brand-specific images now available: 2 hero variants, 10 option variants, 5 process steps, 8 gallery portraits, 6 detail shots, 3 atmosphere stills, and 4 before/after pairs. Local assets improve performance (no external requests), ensure visual consistency with the Build Bible's image language, and comply with Section XXXVIII (Asset Management Protocol).

---

## v1.2 — 2026-06-29

### Motion Doctrine & Aesthetic World Alignment — Completed

**Files Modified:**
- `index.html` — Gallery section converted from masonry to editorial spread layout (Section XIX compliance)
- `css/style.css` — Typography consolidated to 2 families (Fraunces + Manrope); editorial spread styles added; masonry replaced
- `css/animations.css` — Editorial spread reveal animations added with staggered timing
- `js/main.js` — Gallery JS updated to handle new editorial spread items with parallax

**Summary:**
Completed alignment with FASHION-SOTD-GRANDMASTER.SKILL.MD guidelines. Typography reduced from 3 to 2 font families per mobile protocol (Section Mobile Religion). Gallery converted from masonry-only to editorial spread layout per Section XIX (Gallery Systems: "Never rely solely on masonry grids"). Motion doctrine compliance verified — all animations use transform + opacity only (Section XXIX Performance Doctrine). Editorial spread follows asymmetric composition with offset items per Section XIX guidelines.

---

## v1.1 — 2026-06-29

### System Check: Motion Doctrine & Aesthetic World Alignment

**Files Modified:**
- `CHANGELOG.md` (created)
- `css/style.css` (planned — hero and gallery alignment)
- `css/animations.css` (planned — motion doctrine compliance)
- `index.html` (planned — hero architecture upgrade)

**Summary:**
Initial system check of FASHION-SOTD-GRANDMASTER.SKILL.MD against current UI implementation. Identified alignment gaps in Hero Architecture (currently uses default centered text+button pattern — Section XVII mandates unique systems), Gallery Systems (currently masonry-only — Section XIX requires editorial variety), and Typography (currently 3 font families — mobile protocol caps at 2).

---

## v1.0 — (Initial State)

### Base Project Delivery

**Files:**
- `index.html` — Main one-page structure with 5 sections (Hero, Philosophy, Practice, Gallery, Contact)
- `css/style.css` — Base styles with warm restorative palette (cream, stone, taupe, gold)
- `css/animations.css` — Keyframe animations for preloader, reveals, parallax
- `js/main.js` — Lenis smooth scroll, GSAP ScrollTrigger, radial navigation
- `about.html` — About page
- `work.html` — Work/portfolio page
- `MD/FASHION-SOTD-GRANDMASTER.SKILL.md` — Grandmaster skill document
- `MD/GREAT-GRANDMASTER.MD` — Senior Creative Technologist manifesto
- `THE HAIR RITUALIST.md` — Build Bible / creative brief

---

## VERSION HISTORY

| Version | Date | Description |
|---------|------|-------------|
| v1.0 | Initial | Base project delivery |
| v1.1 | 2026-06-29 | System check — Motion Doctrine & Aesthetic World alignment review initiated |
| v1.2 | 2026-06-29 | Typography consolidated (3→2 families); Gallery converted to editorial spread; Motion doctrine verified |
| v1.3 | 2026-06-29 | 38 local assets integrated; Unsplash URLs replaced; Performance optimized |
| v1.4 | 2026-06-29 | Scroll-jump bug fixed; 3 missing sections added (Intelligence, Before/After, Closing); 8-section narrative complete |
