# Pharmacy-website-

A Next.js website for Sweeney's Late Night Pharmacy, with a shopfront hero that follows the real open or closed state.

## Overview

The site presents the pharmacy's services, products, community links and visiting details in a calm, editorial style. The hero is an illustrated shopfront whose lights and sign change with the opening hours (Europe/Dublin time). Design tokens, colour contrast targets and type choices are documented in [`sweeneys-pharmacy/DESIGN.md`](sweeneys-pharmacy/DESIGN.md).

## Key features

- Live open, closing-soon and closed status with a weekly hours table
- Sections for services, products, community, GP and visit information
- Privacy and terms pages, consent dialog, sitemap and robots routes
- Mobile action bar and a map facade that loads on demand
- Accessible type (Atkinson Hyperlegible Next) and AA-checked colour pairs

## Project structure

```
sweeneys-pharmacy/
  src/app/          routes: home, privacy, terms, robots, sitemap
  src/components/   layout, sections, status, ui, icons
  DESIGN.md         design system
new updated.html    earlier static version
```

## Tech stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4.

## Getting started

```bash
cd sweeneys-pharmacy
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Credits

The Next.js redesign was merged from a pull request by Umer-2612.

## License

No license file yet. Author: [Sandeep Kumar Naysrania](https://github.com/Naysrania18)
