# Galewings Pvt Ltd. Marketing site

Single-page static site. No build step, no dependencies, no backend. Open
`index.html` or upload the folder to any static host.

## Files

```
index.html                      the whole page
styles.css                      design tokens + all styling
script.js                       mobile menu + scroll reveal (progressive enhancement)
robots.txt                      allows crawling, points at the sitemap
sitemap.xml                     single URL, update <lastmod> when you edit the page
assets/
  Galewings-Logo.png            your full logo lockup (icon + wordmark + tagline)
  galewings-icon.png            the logo's icon mark, cropped and background removed
  galewings-propulsion.png      your product photograph (hero image)
  og-image.png                  1200x630 social preview, composited from the photo
  favicon-32.png                browser tab icon, built from galewings-icon.png
  apple-touch-icon.png          iOS home-screen icon, built from galewings-icon.png
_source/
  galewings-propulsion.jpg.png  your original file, byte-identical, untouched
.claude/
  dev-server.js                 local preview only. Do NOT deploy
  launch.json                   local preview config. Do NOT deploy
```

Deploy everything except `_source/` and `.claude/`.

## Local preview

```bash
node .claude/dev-server.js
```

Then open <http://localhost:8080>. Use a server rather than opening the file
directly, so `robots.txt` and `sitemap.xml` resolve the way they will in production.

## Things you will want to change

**The tagline.** Three options are listed in an HTML comment directly above the
`<h1>` in `index.html`. Swap the text inside `<span class="wordmark-tagline">`.
The live one is "India's Own Drone Propulsion."

**The domain.** Everything points at `https://galewings.co/` (apex, no `www`).
If that changes, update these five places:

| File | What to change |
|---|---|
| `index.html` | `<link rel="canonical">` |
| `index.html` | `og:url` and `og:image` |
| `index.html` | `twitter:image` |
| `index.html` | `url`, `logo` and `image` in the JSON-LD block |
| `robots.txt` | the `Sitemap:` line |
| `sitemap.xml` | the `<loc>` line |

**The colours.** Every colour is a CSS custom property at the top of
`styles.css`. The contrast ratio of each against its background is noted in a
comment. If you change one, keep body text at 4.5:1 or better.

Note the split palette: the page is dark graphite, but the Technology section is
a light "steel" band. `--c-amber` is only legible on dark, so on that band amber
text uses `--c-amber-dark`. Keep that distinction if you edit it.

**The product photo.** `assets/galewings-propulsion.png` is 575x312, which is
small. The hero caps it at 600px so it never upscales into softness. If you
have a higher-resolution original, drop it in at the same path and raise
`max-width` on `.hero-figure img` in `styles.css`. That is the single biggest
visual improvement available to this page.

If you replace the photo, regenerate `og-image.png` too, or the social preview
will still show the old hardware.

**The logo.** Your official mark is navy and blue, drawn for a light background.
It is not legible directly on this page's dark graphite, so the header and
footer both place it on a small off-white chip (`.brand-icon-chip`,
`.footer-icon-chip` in `styles.css`) rather than on the bare dark surface.

**The phone number.** `+91 96252 60725` appears as a `tel:` link in the Contact
section, the footer, and the JSON-LD `contactPoint`. Update all three if it
changes.

## What was verified

- Renders deliberately at 375px, 768px and 1280px+; no horizontal scroll at any
  width; the hero image keeps its exact native aspect ratio (1.843) at every size.
- Navigation collapses to a menu below 896px; opens and closes by mouse and
  keyboard, `Esc` closes it and returns focus to the button.
- Every text/background pair meets WCAG 2.1 AA. The lowest ratio on the page is
  5.2:1 against a 4.5:1 requirement.
- Visible focus ring on every focusable element; no `outline: none` anywhere;
  skip link first in tab order. The ring darkens to `--c-amber-dark` inside the
  light Technology band so it stays visible there.
- No console errors; no duplicate IDs; all ARIA references resolve; one `<h1>`;
  JSON-LD parses as a valid `Organization`.
- Works with JavaScript disabled. The nav renders as a plain visible list and
  nothing is hidden.

## Deliberate omissions

- **No contact form.** The email address is a `mailto:` link, as specified.
- **No founding team section.**
- **No test data, performance tables or efficiency figures.** The Technology
  section states the bench-validation claim and carries the system-level
  footnote directly beneath it, and nothing more.
