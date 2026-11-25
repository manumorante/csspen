
# CSS Pen

### Famous logos recreated with step-by-step CSS animation

![CSS Pen](public/thumbs/netflix.png)

In **CSS Pen**, each figure is **drawn with CSS** and gradually takes shape, evolving step by step. From logos to iconic shapes, every design is carefully crafted to show **how it comes together visually** through structured styling.

At first glance, it's a gallery of minimalist illustrations. But there's more: you can **enable the code view**, follow its evolution step by step, and even **edit it** to see what happens if you change something. An artistic, educational, and experimental experience, all at once.

There's also a **back office** where new figures can be created from scratch, customizing each step in real time. While not open to the public yet, it lays the foundation for future contributions and expansion. Additionally, when you share a figure, the URL includes a **preview of the image**, allowing others to see it before opening the link.

> "A small change in code, a giant leap in form."  
> — Some developer excited about CSS

🔗 [Explore the gallery](https://www.csspen.es)


## Getting started

Requires [nvm](https://github.com/nvm-sh/nvm) and a Supabase project with the schema in `supabase/schema.sql` ([ADR 0001](docs/decisions/0001-database-schema.md)).

1. Install the Node version in `.nvmrc` and dependencies: `nvm install && npm ci`
2. Copy `.env.local.example` to `.env.local` and fill in your Supabase URL and anon key (Supabase dashboard → Project Settings → API).
3. Start the dev server: `npm run dev`, then open http://localhost:4001


## History

This project reflects how I have been adopting and applying new technologies, regardless of whether I was already familiar with them.

- `2017 Mar` Started with **Vanilla JS** and **pure CSS**  
- `2019 Mar` Rebuilt the project to use **React**  
- `2022 Feb` Adopted **Supabase**  
- `2022 Mar` Integrated **Tailwind CSS**  
- `2022 Mar` Deployed on **Vercel**  
- `2022 Mar` Revamped UI now like **Instagram Stories** with **CSS Grid** 
- `2023 Jul` Migrated to **TypeScript**  
- `2023 Jul` Switched to **Next.js** for enhanced performance  

---

[![wakatime](https://wakatime.com/badge/user/c8d2802f-0742-4964-bd79-1cb374b6de43/project/84223879-6d76-45d7-97ef-da701a20bcf6.svg)](#)