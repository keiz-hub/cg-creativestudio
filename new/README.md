# CG Creative Studio — Business Website

A multi-page static website for CG Creative Studio (IT services + custom
printing). Built with plain HTML/CSS/JS — no build step, no framework,
deploys straight to GitHub Pages.

## Pages

| File             | Purpose                                              |
|-------------------|-------------------------------------------------------|
| `index.html`      | Home — overview of both business lines                |
| `services.html`   | IT services in detail (web dev, repair, design, installs) |
| `printing.html`   | Print product categories + order form                 |
| `feedback.html`   | Custom feedback form → Google Sheet                    |
| `contact.html`    | Contact details                                        |
| `style.css`       | Shared design system for all pages                     |
| `script.js`       | Shared nav toggle + footer year (all pages)             |
| `feedback.js`     | Feedback form submit handler (feedback.html only)       |
| `apps-script/Code.gs` | Google Apps Script backend for the feedback form   |

---

## ⚠️ Placeholder content to replace

Everything below is a placeholder — search each file for these and swap
in your real info before launch:

- **Email:** `hello@cgcreativestudio.example` (footer + contact.html)
- **Phone:** `+63 900 000 0000` (footer + contact.html)
- **Pricing:** shirt/tarp/sticker starting prices on `index.html` and
  `printing.html` — these are estimates, confirm your real rates
- **Order form link:** `printing.html` has a placeholder Google Form URL
  (see setup below)
- **Feedback script URL:** `feedback.js` has a placeholder Apps Script
  deployment URL (see setup below)
- **Service descriptions:** all copy on `services.html` and `index.html`
  is a reasonable draft — edit to match your actual offerings
- **About blurb:** the "About the studio" paragraph on `index.html` is a
  draft — edit to reflect your actual story

## Adding real images

The placeholders are now borderless — just a small muted label — so a
transparent-background icon or logo will sit cleanly with nothing
framing it. Drop a real file into an `assets/` folder (next to
`index.html`) with the exact filename below, and it replaces the label
automatically — no code changes needed:

| Placeholder              | Expected file                 | Suggested shape |
|---------------------------|---------------------------------|-------------------|
| Homepage hero             | `assets/hero-banner.jpg`       | landscape (4:3)   |
| About section             | `assets/about-photo.jpg`       | portrait (4:5)    |
| Feedback page             | `assets/feedback-photo.jpg`    | landscape (4:3)   |
| IT Services background    | `assets/it-services-bg.jpg`    | landscape, wide   |
| Printing — Shirts         | `assets/print-shirts-1.jpg` (+`-2`, `-3`) | landscape (4:3) |
| Printing — Tarpaulins     | `assets/print-tarpaulins-1.jpg` (+`-2`, `-3`) | landscape (4:3) |
| Printing — Stickers       | `assets/print-stickers-1.jpg` (+`-2`, `-3`) | landscape (4:3) |
| Printing — Other prints   | `assets/print-other-1.jpg` (+`-2`, `-3`) | landscape (4:3) |

The hero placeholder also works with a GIF instead of a photo — just
rename the `<img src="assets/hero-banner.jpg">` in `index.html` to
`assets/hero-banner.gif` and save your file with that name. Browsers
play animated GIFs normally inside a regular `<img>` tag, no extra code
needed.

Tips for the photos themselves:
- Keep a consistent lighting/background style across the print photos
  so the catalog feels cohesive.
- Square-ish product shots work best — the placeholder boxes crop to
  a 4:3 frame automatically (`object-fit: cover`), so an off-ratio
  photo will get cropped, not squished.

### Printing page: sample photo carousel

Each printing card now opens a full-size carousel (click the photo or
the corner button) so you can show multiple sample photos per product
instead of just one. By default each category expects 3 samples
(`-1.jpg`, `-2.jpg`, `-3.jpg`) — any that don't exist yet just show a
"not added" label inside the carousel instead of breaking.

To add more than 3 samples for a category, open `printing.js` and add
more filenames to that category's array, e.g.:

```js
shirts: [
  'assets/print-shirts-1.jpg',
  'assets/print-shirts-2.jpg',
  'assets/print-shirts-3.jpg',
  'assets/print-shirts-4.jpg',   // just add more lines like this
],
```

### IT Services background image

The "IT services" section (on both the homepage and the Services page)
now supports a background photo shown at low opacity behind the
content, instead of a flat color. It's controlled by one line in the
HTML:

```html
<section class="band band-ink band-photo" style="--band-bg-image: url('assets/it-services-bg.jpg');">
```

Drop a file at `assets/it-services-bg.jpg` and it'll show through
faintly behind the text (about 16% opacity, so text stays readable). No
file there yet? It just falls back to the plain navy background — no
broken-image icon. Want it more or less visible? Open `style.css`,
find `.band-photo::before`, and adjust the `opacity` value (currently
`0.16`).

---

## Setting up the embedded map (Contact page)

`contact.html` currently embeds a placeholder map (just centered on
"Philippines" generally). To point it at your real location:

1. Open [Google Maps](https://maps.google.com) and search your actual
   business address.
2. Click **Share** → **Embed a map** → copy the `<iframe>` code it
   gives you.
3. In `contact.html`, find the `<iframe src="https://www.google.com/maps?q=Philippines&output=embed" ...>` block and replace the whole
   `<iframe>` with the one you copied (or just swap the `src` value —
   either works).

No API key needed for a basic embedded map like this.

---

## Setting up the Order form (Google Form)

1. Go to [forms.google.com](https://forms.google.com) and create a new
   form — add fields like Name, Contact number, Item (Shirt/Tarpaulin/
   Sticker/Other), Quantity, Size, Design file upload (optional), Notes.
2. In the Google Form editor, click **Responses** → the green Sheets
   icon → **Create a new spreadsheet**. Responses will now land there
   automatically.
3. Click **Send** → the link icon → copy the short link (`forms.gle/...`).
4. In `printing.html`, find:
   ```html
   href="https://forms.gle/REPLACE-WITH-YOUR-FORM-ID"
   ```
   and replace it with your real link.
5. *(Optional)* To embed the form directly on the page instead of just
   linking to it: in the Form editor, click **Send** → the `<>` embed
   icon → copy the `<iframe>` code. There's a commented-out `<iframe>`
   block in `printing.html` under the order button — uncomment it and
   paste your embed `src` in.

---

## Setting up the Feedback form (Google Sheet + Apps Script)

This one's a bit more involved since it's a custom-styled form instead
of an embedded Google Form, but it's free and takes about 10 minutes.

1. **Create a Google Sheet** (sheets.google.com) — name it something like
   "CG Creative Studio — Feedback".
2. Open **Extensions → Apps Script**. Delete any starter code in the
   editor, then paste in the contents of `apps-script/Code.gs` from this
   repo.
3. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" → choose **Web app**.
   - Description: anything (e.g. "Feedback form endpoint").
   - Execute as: **Me**.
   - Who has access: **Anyone**.
   - Click **Deploy**. Google will ask you to authorize the script the
     first time — approve it (it's your own script, this is expected).
4. Copy the **Web app URL** it gives you (ends in `/exec`).
5. In `feedback.js`, find:
   ```js
   const SCRIPT_URL = 'https://script.google.com/macros/s/REPLACE-WITH-YOUR-DEPLOYMENT-ID/exec';
   ```
   and replace it with your real URL.
6. Test it: open `feedback.html` in a browser, submit the form, then
   check your Google Sheet — a new row should appear.

**Note on how this works:** Apps Script Web Apps don't send back proper
CORS headers, so the form submits in `no-cors` mode — the browser can't
read whether the request succeeded, only whether it was sent. In
practice this is reliable (if it doesn't throw a network error, it went
through), but if you ever see feedback missing from the Sheet, double
check the deployment is still set to "Anyone" access and the URL in
`feedback.js` matches your current deployment (redeploying can generate
a new URL unless you deploy as "New version" instead of a fresh
deployment).

**Note on the timestamp:** the "Submitted At" column is generated on
Google's servers (not the visitor's browser) and formatted specifically
in Philippine time (`Asia/Manila`), so it stays consistent no matter
where someone is browsing from. If you ever change the timezone, edit
the `'Asia/Manila'` argument in `Code.gs` and redeploy.

---

## Keeping the "coming soon" page live while you build this

Since your Under Construction page (`cg-site/`) is already live, you
don't want to overwrite it until this business site is ready. Two
straightforward ways to handle that in the same GitHub repo:

**Option A — Build in a branch, merge when ready (recommended)**

```bash
# from inside your existing repo (the one with the coming-soon site)
git checkout -b business-site
# copy these files into the repo root (replacing the coming-soon files)
git add .
git commit -m "Build business site"
git push -u origin business-site
```

Your `main` branch (and GitHub Pages, which serves from `main`) stays
untouched — still showing the coming-soon page. When the business site
is ready to go live:

```bash
git checkout main
git merge business-site
git push
```

That replaces what's live in one step.

**Option B — Separate staging folder**

Keep the coming-soon site at the repo root (so it stays live), and put
this business site in a subfolder, e.g. `/preview`. You can view it at
`https://<username>.github.io/<repo>/preview/` while it's in progress.
When ready, move the files from `/preview` into the root (replacing the
coming-soon files) and commit.

Either way works — Option A keeps the repo cleaner long-term; Option B
lets you share a live preview link before launch.

---

## Preview locally

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages** → Source: `main` branch, `/ (root)` folder.
3. Save. Live at `https://<your-username>.github.io/<your-repo>/`.
