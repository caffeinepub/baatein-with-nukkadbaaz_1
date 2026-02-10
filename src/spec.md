# Specification

## Summary
**Goal:** Build a basic yet attractive theatre-focused blogging website (“Baatein With Nukkadbaaz”) for Heena Mehta, with public browsing and an admin authoring workflow.

**Planned changes:**
- Create public pages with clear navigation: Home, Posts (listing), Post Details, About (Heena Mehta profile + blog mission), all in English.
- Apply a consistent theatre-journalism visual theme (warm, stage-inspired palette; complementary typography; consistent components) avoiding a blue/purple-dominant look.
- Add post categories (Workshops, Stage Shows, Interviews, Theatre News) and a category filter on the Posts list; show category on Post Details.
- Implement a Motoko backend for persistent post storage: list posts (newest first), get post by id/slug, and admin-only create/update/delete with stable storage across upgrades.
- Add frontend admin experience using Internet Identity: sign in/out, create/edit/delete posts with fields (title, category, cover image, excerpt, rich/markdown-like body), and refresh UI after changes.
- Seed the backend with at least 6 example theatre posts spanning the categories.
- Add static theatre-relevant images (logo, hero/banner, category icons, post cover placeholder) stored as frontend assets and used across the layout and post cards.

**User-visible outcome:** Visitors can browse and filter theatre-related blog posts, read full articles, and learn about Heena Mehta; the admin can sign in with Internet Identity to create, edit, and delete posts that persist and display immediately on the site.
