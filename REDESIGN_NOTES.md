# Bhasya Legal — Royal Blue & Gold Redesign

This pass implements the "Modern Royal · Quiet Luxury · Legal Authority" direction:
new palette, real font loading, tighter radii, restrained shadows, and a
Royal-Blue-and-Gold hero that's now consistent across light/dark mode.

## Setup

```bash
npm install
npm run dev      # local dev server
npm run build    # production build (verified working)
```

`node_modules/` and `dist/` are not included — regenerate with `npm install`
/ `npm run build`. If `vite build` fails immediately with a Rollup "cannot
find module @rollup/rollup-linux-x64-gnu" (or equivalent) error, that's a
known npm optional-dependencies bug — delete `package-lock.json` and
`node_modules`, then `npm install` again.

## What changed

**Design tokens** (`tailwind.config.ts`, `src/index.css`)
- New palette throughout: Royal Blue `#0B1F3A`, Deep Royal `#07152A`,
  Secondary Blue `#163A63`, Rich Gold `#C9A227`, Light Gold `#DDBF63`,
  Ivory `#F8F5EE`, Warm White `#FCFBF8`. All ~230 old hardcoded hex values
  (`#1b0738`, `#D4AF37`, `#C59B27`, etc.) were mapped and swept across every
  live file.
- `--radius` reduced from `1rem` to `0.45rem`; most `rounded-xl/2xl/3xl`
  usages tightened to match (circular elements like toggles/avatars were
  left alone on purpose).
- Shadows softened to the spec's `0 8px 30px rgba(7,21,42,0.08)` family.
- **Fonts were previously broken** — Playfair Display was declared in
  Tailwind but never actually loaded, so headings silently fell back to
  system serif. Cormorant Garamond + Inter now load for real via
  `index.html`, with Noto Serif/Sans Devanagari as companions so Nepali
  text renders in a matching typeface instead of a generic fallback
  (this works automatically via font-stack fallback — no per-language
  class needed).
- `card-premium` rewritten: solid surface + border + restrained shadow,
  no more `backdrop-filter: blur(20px)` / translucency.
- New `.gold-divider` utility (thin line + diamond mark) as the recurring
  visual signature — used on Home, Attorneys, Contact, Services.

**Hero** — unified the old two-mode hero (light beige in light theme,
near-black in dark theme) into one consistent Royal Blue → Ivory → Gold
hero in both themes, per the spec. This required a few follow-on fixes:
- Navigation text/logo color was keyed to site theme (assuming theme ==
  hero brightness); now correctly keyed to scroll state, since the hero is
  always dark now regardless of theme.
- `LadyJusticeStatue3D`'s lighting rig/bloom/vignette was theme-conditional
  for the same reason — now always uses the moodier "dark backdrop"
  profile, with a stronger gold rim light and slightly deeper vignette so
  the statue recedes a bit more into the scene.

**Navigation** — ivory navbar on scroll (was stark white), active-page
pill replaced with a thin gold underline, both CTAs restructured to
Royal-Blue-default/Gold-hover and relabeled "Book a Consultation."

**Practice Areas** — converted to numbered "dossier" cards (01, 02, 03…)
per the spec's example, ivory surface, thin gold border, subtle hover
lift, no icon-heavy card styling.

**Attorneys** — editorial layout: fixed-aspect-ratio photos with a
consistent crop/tone (was inconsistent `object-contain` sizing), gold
rule under name/role, restrained hover.

**Contact** — heading updated to "Let's Discuss Your Legal Matter," small
"Request a Consultation" label added above the form, submit button
restructured to Royal-Blue/Gold-hover (was a permanently gold, glowing
button).

**Services / ServiceDetail** — CTA buttons and dividers aligned to the
system; service detail pages get a "Need Legal Assistance? → Book a
Consultation" close.

**Buttons** (`ui/button.tsx`) — `secondary`/`outline` variants rebuilt to
match the spec's actual Secondary definition (ivory + gold border, hovers
to navy); primary buttons hover to gold with navy text instead of a
darker navy.

## Intentionally left alone

- **Service page content** (`ServiceDetail.tsx`) — the spec's "Our
  Approach / What We Handle / Why Choose Bhasya Legal" template would mean
  writing new legal-service copy for ~19 services from scratch. That's
  substantive legal content, not a visual change, so I restyled the
  existing paragraphs (typography, spacing, closing CTA) without inventing
  new sub-sections or claims.
- **Attorney "View Profile →" links** — there's no attorney detail route
  in the app today; adding one is a real feature, not a style change. The
  cards are fully editorial-styled but link nowhere yet.
- **Attorney "practice areas" tags** — not in the current data model, so
  none were fabricated.
- **Footer social icons** — the spec's footer structure mentions them, but
  there's no real social URLs in the codebase to link to, so none were
  added.
- **Logo artwork** — kept the existing lockups as-is (light/dark versions
  already existed and are now used correctly based on hero/scroll
  context); no new logo file was generated.
- **Stat labels** ("100+ Cases Won" etc.) — the spec flagged this as worth
  reconsidering only if there's a documented basis for the claim, which
  isn't something I can verify, so the copy is unchanged.
- `src/src/`, `src/components/src/`, `src/pages/src/`, and `src/pages/Tools.tsx`
  — pre-existing dead code (nothing imports them). Left untouched rather
  than deleted since that wasn't asked for.
