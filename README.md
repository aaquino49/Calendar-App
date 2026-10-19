# Interval: privacy-first meeting budgets

**Interval** is a product concept for teams drowning in meetings. Each team gets a weekly budget of **meeting credits**, every meeting "costs" credits based on its length and headcount, and people see that cost while they plan. The goal is fewer, shorter, smaller meetings and more focused time, without anyone's calendar content being read or stored.

This repository holds a **clickable front-end prototype** of the Interval dashboard, plus the [development plan](DEVELOPMENT_PLAN.md) for a full Google Calendar product. The prototype runs on sample data; it doesn't connect to a calendar yet.

## The idea

```
credits = meeting minutes ÷ 30 × internal participants
```

A 45-minute meeting with six internal people costs 9 credits. The organizer's team pays. Meetings set up by outsiders are reported as "externally initiated load" but don't use the team's budget.

**Privacy by design:** Interval only needs each meeting's time, length and attendee count. It never reads meeting titles, descriptions or email, and the dashboard says so up front.

## What's in the prototype

Four views, switchable from the sidebar:

| View | What it shows |
|---|---|
| **Overview** | Credits used against the weekly budget, credits by day, a suggested "next best action" (such as shortening a recurring meeting), and the costliest meetings coming up |
| **Meetings** | A credit ledger for the week and a calculator: set a meeting's length and headcount to see what it would cost |
| **Reports** | A weekly report: focus time returned, meetings that got shorter, recurring series that ended |
| **Policies** | The team's weekly budget, how prompts behave, automatic exemptions (all-day events, focus time, out-of-office and externally organized meetings), and the privacy commitments |

## Running it

Needs Node.js 22.13 or later.

```bash
npm install
npm run dev      # local development server
npm run build    # production build
npm test         # builds, then checks that the dashboard server-renders
npm run lint
```

## Tech stack

- [vinext](https://github.com/cloudflare/vinext): the Next.js App Router running on Vite and Cloudflare Workers
- React 19, TypeScript, Tailwind CSS 4, [Lucide](https://lucide.dev) icons
- Drizzle ORM, set up for an optional Cloudflare D1 database. The schema is empty for now; `examples/d1/` shows a minimal API route with a table.

The project started from OpenAI's Sites starter, which is why it includes `.openai/hosting.json` and an optional Sign in with ChatGPT helper in `app/chatgpt-auth.ts`. Neither is used by the prototype.

## Project layout

| Path | What |
|---|---|
| `app/page.tsx` | The dashboard: all four views and their sample data |
| `app/layout.tsx`, `app/globals.css` | Page shell, metadata and styles |
| `worker/index.ts` | Cloudflare Worker entry point |
| `db/`, `drizzle/`, `drizzle.config.ts` | Database schema and migrations (empty starter) |
| `tests/rendered-html.test.mjs` | Server-render smoke test |
| `DEVELOPMENT_PLAN.md` | The product plan: scope, architecture, a 12-week build plan, the core data model and pilot success metrics |

## Roadmap

[`DEVELOPMENT_PLAN.md`](DEVELOPMENT_PLAN.md) lays out the path from this prototype to a Google-first MVP: a web dashboard plus a Google Calendar add-on that shows each meeting's credit cost inside the calendar, with incremental calendar sync, team budgets, private weekly reports and a free pilot for companies. It estimates 10 to 12 weeks for two engineers.
