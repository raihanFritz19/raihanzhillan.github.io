# Raihan Zhillan — React Portfolio

A modern, animated portfolio built with **React + Vite**.  
Design direction: **dark editorial / cyberpunk-minimal** — Syne display font, DM Sans body, electric-cyan `#00f5d4` accent on near-black.

---

## 📂 Project Structure

```
portfolio/
├── index.html            ← HTML entry point
├── vite.config.js        ← Vite config
├── package.json
└── src/
    ├── main.jsx          ← React root
    ├── App.jsx           ← All components & data
    └── App.css           ← All styles (CSS variables, animations)
```

---

## 🚀 Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node)

### Steps

```bash
# 1. Navigate into the project folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser. Hot-reload is enabled — changes to any file reflect instantly.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to `dist/`. You can preview it locally:

```bash
npm run preview
```

---

## 🌍 Deploy

### Option A — Vercel (recommended, free)
1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), import the repo.
3. Vercel auto-detects Vite — just click **Deploy**. Done.

### Option B — Netlify
1. Push to GitHub.
2. Go to [netlify.com](https://netlify.com), click **Add new site → Import from Git**.
3. Build command: `npm run build` | Publish directory: `dist`.

### Option C — GitHub Pages
```bash
npm install --save-dev gh-pages
```
Add to `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```
Then: `npm run deploy`

---

## 🖼️ Add Your Profile Photo

Replace the `RZ` monogram inside `.avatar-placeholder` in `App.jsx`:

```jsx
// In the Hero component, replace:
<div className="avatar-placeholder">RZ</div>

// With:
<img src="/raihan1.jpg" alt="Raihan Zhillan" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }} />
```

Then place `raihan1.jpg` inside the `public/` folder (create it at the project root if it doesn't exist).

---

## ✏️ Customize Content

All data is in the **DATA** section at the top of `src/App.jsx`:

| Constant      | What it controls              |
|---------------|-------------------------------|
| `SKILLS`      | Skill categories & items      |
| `PROJECTS`    | Project cards & links         |
| `TIMELINE`    | Experience & education items  |
| `CERTS`       | Certificate links             |

Edit those arrays and the page updates automatically.

---

## 🎨 Change Colors / Fonts

Open `src/App.css` and edit the `:root` block:

```css
:root {
  --bg:    #060b14;    /* page background */
  --cyan:  #00f5d4;   /* primary accent */
  --purple:#7c3aed;   /* secondary accent */
  /* ... */
}
```

To swap fonts, change the Google Fonts `@import` URL at the top of `App.css` and update `--font-display` / `--font-body`.

---

## ♿ Accessibility

- All interactive elements are keyboard-navigable (`button`, `a` elements).
- Decorative elements have `aria-hidden="true"`.
- Form inputs have associated `<label>` elements.
- Color contrast passes WCAG AA for the dark theme.

---

## 🤖 AI-Enhanced Development

This portfolio itself was built with AI prompt engineering — demonstrating the exact skills Raihan brings to every project: using AI tools to scaffold, debug, and refine code faster while maintaining full human understanding and control.
