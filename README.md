# wild-wild-horses

A static website starter built with [Eleventy (11ty)](https://www.11ty.dev/), managed via [Pages CMS](https://pagescms.org/), and deployed for free on [GitHub Pages](https://pages.github.com/).

**Stack at a glance:**
- **Builder:** Eleventy v3 — converts Markdown and Nunjucks templates to HTML
- **CMS:** Pages CMS — a web-based editor for writing posts and updating content, no coding needed
- **Hosting:** GitHub Pages — free static hosting with automatic deploys on every save
- **Contact:** A static contact info page with email, phone, address, and social links

---

## What's included

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, upcoming events feed, recent blog posts |
| Blog listing | `/blog/` | All posts, newest first |
| Blog post | `/blog/<slug>/` | Individual post |
| Events listing | `/events/` | All events, chronological |
| Event detail | `/events/<slug>/` | Individual event |
| Contact | `/contact/` | Contact form + org details |
| 404 | `/404.html` | Custom not-found page |

---

## First-time setup

### Prerequisites

You need:
- [Node.js](https://nodejs.org/) v18 or later
- A GitHub account
- Git

Any additional users (e.g. a content editor) need:
- A GitHub account (free) — required to use Pages CMS
- Nothing else — they'll manage all content through a browser at [app.pagescms.org](https://app.pagescms.org)

---

### Step 1 — Set up the GitHub repository



---

### Step 2 — Enable GitHub Pages

1. Go to the repository on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Click **Save**

The workflow in `.github/workflows/deploy.yml` handles everything else. On the next push to `main`, GitHub will build the site with Eleventy and publish it automatically.

Your site will be live at:
```
https://<github-username>.github.io/<repo-name>/
```

> **Note:** The first deploy may take a couple of minutes. Subsequent deploys usually finish in under 60 seconds. You can monitor progress under the **Actions** tab in the repository.

---

### Step 3 — Connect Pages CMS

Pages CMS is a hosted web application that reads and writes files directly in your GitHub repository via the GitHub API. Nothing to install or host — just a `.pages.yml` config file in the repo root (already included).

**To connect:**

1. Go to **[app.pagescms.org](https://app.pagescms.org)**
2. Click **Sign in with GitHub** and authorize the Pages CMS app
3. Your repositories will appear — select **wild-wild-horses** (or whatever you named it)
4. Pages CMS reads `.pages.yml` and automatically displays your content sections: **Blog Posts**, **Events**, **Site Settings**, **Navigation**, and **Contact Page**

Pages CMS authenticates using your GitHub account. Every save creates a commit to the `main` branch, which triggers a GitHub Actions build and redeploys the site — typically within a minute.

**Granting additional users access:**

Any additional users who will edit content need to be GitHub repository collaborators with **Write** access:

1. Go to repository → **Settings** → **Collaborators** → **Add people**
2. Enter their GitHub username and send the invitation
3. Once accepted, she can sign in at [app.pagescms.org](https://app.pagescms.org) with her own GitHub account and select the repository

> Pages CMS respects GitHub's permissions model — only collaborators with write access can edit content.

---

### Step 4 — Customize site content

Update these files with real information before presenting the demo:

**`src/_data/site.yml`**
```yaml
title: Your Organization Name
description: A short tagline or description shown in the hero and browser tab.
author: Your Organization Name
email: hello@yourorg.org
favicon: ""  # optional: path to a favicon image once uploaded via CMS
```

**`src/_data/contact.yml`**
```yaml
heading: Get in Touch
intro: We'd love to connect!
email: hello@yourorg.org
phone: ""       # optional, e.g. (555) 867-5309
address: ""     # optional, e.g. 123 Main St, Springfield, IL 62701
links:
  - platform: Instagram
    url: https://instagram.com/yourhandle
    handle: "@yourhandle"
```

**`src/_data/navigation.yml`** — Edit if you want to rename or reorder menu items:
```yaml
main:
  - label: Home
    url: /
  - label: Events
    url: /events/
  - label: Blog
    url: /blog/
  - label: Contact
    url: /contact/
```

All of these files can also be edited through Pages CMS (under **Site Settings**, **Contact Page**, and **Navigation**) without touching any code.

---

## Day-to-day content management

Once setup is complete, content can be managed entirely through [app.pagescms.org](https://app.pagescms.org) — no code, no terminal.

### Writing a blog post

1. Sign in at [app.pagescms.org](https://app.pagescms.org) and select the repository
2. Click **Blog Posts** in the left sidebar
3. Click **+ Add entry** (top right)
4. Fill in:
   - **Title** — the post headline
   - **Publish Date** — defaults to today
   - **Description** — 1–2 sentence summary shown on listing cards
   - **Featured Image** — optional, shown at top of post and on listing card
   - **Tags** — leave as `blog` (required for posts to appear in the listing)
   - **Content** — write in the rich-text editor; supports headings, bold, links, images, etc.
5. Click **Save** — the post is live within about a minute

### Creating an event

1. Click **Events** in the sidebar → **+ Add entry**
2. Fill in:
   - **Title** — event name
   - **Event Date & Start Time** — determines whether the event shows as "upcoming" on the home page
   - **Event End Time** — optional
   - **Location** — venue name and address
   - **Short Description** — shown on the home page feed and event cards
   - **Featured Image** — optional event poster or photo
   - **Ticket / RSVP URL** — optional; adds a "Get Tickets" button on the event page
   - **Full Event Details** — rich-text description with directions, schedule, what to bring, etc.
3. Click **Save**

After the event happens, you can add a YouTube recording URL and it will be embedded on the event page.

### Uploading images

Images can be uploaded directly in the Featured Image field while editing a post or event, or through the **Media** section in Pages CMS. Uploaded images are stored in `src/assets/images/uploads/` in the repository. At build time, Eleventy's image transform plugin automatically converts them to WebP + JPEG at multiple sizes for fast loading.

---

## Local development

```bash
# Install dependencies
npm install

# Start local dev server with live reload
npm start
# → http://localhost:8080

# Build for production
npm run build
# → output in ./_site/
```

---

## Project structure

```
wild-wild-horses/
├── .pages.yml                    # Pages CMS configuration (content schema)
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions: build + deploy to GH Pages
├── package.json
├── eleventy.config.js            # 11ty config: plugins, passthrough, collections
├── src/
│   ├── _config/
│   │   ├── collections.js        # blog, events, upcomingEvents collections
│   │   ├── filters.js            # readableDate, readableTime, isoDate, limit
│   │   └── shortcodes.js         # {% year %}, {% youtubevideo %} shortcodes
│   ├── _data/
│   │   ├── site.yml              # Site-wide settings (title, description, etc.)
│   │   ├── navigation.yml        # Nav menu items
│   │   └── contact.yml           # Contact page content (email, phone, social links)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk          # Root HTML shell (head, fonts, header, footer)
│   │   │   ├── page.njk          # Simple content page layout
│   │   │   ├── post.njk          # Blog post layout
│   │   │   └── event.njk         # Event detail layout
│   │   └── partials/
│   │       ├── header.njk        # Site header with nav
│   │       ├── footer.njk        # Site footer
│   │       ├── post-card.njk     # Blog post preview card
│   │       └── event-card.njk    # Event preview card
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css          # Imports all stylesheets
│   │   │   ├── tokens.css        # Design tokens (colors, fonts, spacing)
│   │   │   ├── base.css          # CSS reset + base element styles + .prose
│   │   │   ├── layout.css        # Hero, sections, card grids, page headers
│   │   │   └── components.css    # Header, footer, nav, buttons, cards, forms
│   │   └── images/
│   │       └── uploads/          # CMS-uploaded images go here (auto-managed)
│   ├── content/
│   │   ├── blog/
│   │   │   ├── blog.11tydata.js  # Sets permalink pattern for blog posts
│   │   │   └── 2026-03-09-welcome.md   # Sample post (delete or replace)
│   │   └── events/
│   │       ├── events.11tydata.js # Sets permalink pattern for events
│   │       └── 2026-04-20-spring-gathering.md  # Sample event (delete or replace)
│   └── pages/
│       ├── index.njk             # Home page
│       ├── blog.njk              # Blog listing page
│       ├── events.njk            # Events listing page
│       ├── contact.njk           # Contact page
│       └── 404.njk               # 404 error page
└── README.md
```

---

## Pages CMS: configuration reference

The `.pages.yml` file in the repo root defines what content sections appear in the CMS editor. Pages CMS reads it automatically — no server configuration needed.

### Top-level structure

```yaml
media:         # Where uploaded images are stored
  input: ...   # Path in the repo (where files are saved)
  output: ...  # Public URL path (how they're referenced in HTML)

content:       # List of content types (collections and single files)
  - name: ...
    type: collection | file
    ...
```

### Content types used in this project

| Name | Type | Path | Description |
|------|------|------|-------------|
| `blog` | `collection` | `src/content/blog/` | Blog posts — one file per post |
| `events` | `collection` | `src/content/events/` | Events — one file per event |
| `site` | `file` | `src/_data/site.yml` | Site-wide settings |
| `navigation` | `file` | `src/_data/navigation.yml` | Nav menu items |
| `contact` | `file` | `src/_data/contact.yml` | Contact page content |

### Collection filenames

Collections use `filename: "{year}-{month}-{day}-{primary}"` which generates date-prefixed filenames like `2026-04-20-spring-gathering.md` where `{primary}` is derived from the title field. This matches the convention Eleventy uses to set the content date.

### Field types used

| Pages CMS type | What it renders in the editor |
|----------------|-------------------------------|
| `string` | Single-line text input |
| `text` | Multi-line text area |
| `rich-text` | WYSIWYG markdown editor |
| `date` | Date (and optionally time) picker |
| `image` | Image upload widget |
| `boolean` | Toggle switch |
| `hidden` | Not shown; value set by `default` |

Full field type reference: [pagescms.org/docs/configuration/](https://pagescms.org/docs/configuration/)

---

## Deployment details

### GitHub Actions workflow

`.github/workflows/deploy.yml` runs automatically on every push to `main`:

1. **build job**
   - Checks out the repository
   - Installs Node.js 20
   - Runs `npm ci` (clean install from `package-lock.json`)
   - Runs `npm run build` (produces `_site/`)
   - Uploads `_site/` as a Pages artifact

2. **deploy job**
   - Deploys the artifact to GitHub Pages via `actions/deploy-pages@v4`

The workflow uses `GITHUB_TOKEN` (automatically provided by GitHub Actions) — no secrets need to be configured manually.

Required repository permissions (set automatically when GH Pages source is set to GitHub Actions):
- `contents: read`
- `pages: write`
- `id-token: write`

### Custom domain (optional)

To use a custom domain like `yourorg.org`:

1. Go to repository → **Settings** → **Pages** → **Custom domain**
2. Enter the domain name and click **Save**
3. Configure DNS at your domain registrar:
   - **Apex domain** (e.g. `yourorg.org`): Add four `A` records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **www subdomain**: Add a `CNAME` record pointing to `<username>.github.io`
4. Check **Enforce HTTPS** once DNS propagates (may take up to 48 hours)

GitHub automatically creates a `CNAME` file in the repo root when you save the custom domain. Do not delete it.

Full instructions: [docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## Styling

Design tokens are in `src/assets/css/tokens.css`. 

Key tokens you might want to customize:

| Token | Value | Role |
|-------|-------|------|
| `--color-accent` | `#c9991a` (golden yellow) | Links, buttons, active nav |
| `--color-accent-hover` | `#a87d10` (deeper gold) | Button/link hover state |
| `--color-surface` | `#f7f2e8` (chalky off-white) | Page background |
| `--color-surface-alt` | `#ede5d0` (warm tan) | Section alternating background |
| `--color-text` | `#1e1c18` (near-black charcoal) | Body text |
| `--font-heading` | Playfair Display (serif) | All headings |
| `--font-sans` | Lato (sans-serif) | Body, nav, buttons |

Note: primary buttons use dark text on the yellow background for contrast. This is set in `components.css` and should be kept in sync if the accent color is changed to something dark enough to support white text.

Google Fonts (Playfair Display + Lato) are loaded in `src/_includes/layouts/base.njk`. To change fonts, update both the `<link>` tag there and the `--font-heading` / `--font-sans` tokens.

---

## Troubleshooting

**Build fails in GitHub Actions**
Check the **Actions** tab in the repository for the error log. Run `npm run build` locally to reproduce and debug. The most common causes are YAML syntax errors in data files or Nunjucks template errors.

**Pages CMS shows an error or doesn't show my repository**
- Confirm `.pages.yml` exists in the repository root and is valid YAML (you can validate at [yamllint.com](https://www.yamllint.com/))
- Confirm the GitHub account has write access to the repository
- Try signing out of Pages CMS and signing back in

**Site shows stale content after a Pages CMS save**
GitHub Actions builds take 30–90 seconds. Check the **Actions** tab to confirm the build completed successfully. Hard-refresh the browser (Ctrl+Shift+R / Cmd+Shift+R) to bypass browser cache.

**Images uploaded through the CMS aren't showing**
Images are committed to `src/assets/images/uploads/` and only appear after the next build. Confirm the file appears in the GitHub repository file browser, then wait for the build to finish.

---

## Cost summary


| Service | Free tier |
|---------|-----------|
| GitHub (repo + Actions + Pages) | Unlimited for public repos |
| Pages CMS (app.pagescms.org) | Free, open source |
| Google Fonts | Free |
| **Custom domain** | ~$10–15/year (optional, from any registrar) |

**Total ongoing cost: $0** (or ~$10–15/year if a custom domain is added)
