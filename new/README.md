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
