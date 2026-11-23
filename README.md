# Daily Task Tracker — by Eiqa

A vintage, floral-themed personal to-do planner with a pink and olive-green design.
Built with React, TypeScript, Vite, Tailwind CSS and React Router.

Tasks are saved in your browser's localStorage. There is no backend, login or online
account, so data stays on one browser and does not sync between devices.

## Features

- **Today:** current date, animated progress bar, today's tasks, empty and completed states
- **Calendar:** Monday-first month view, pink/green task dots, selected-day task list, Today button
- **All Tasks:** All / Pending / Completed filters with counts, sorted by date
- Add, edit, delete (with confirmation), complete (heart checkbox) and view remarks
- Keyboard-accessible popups (Escape to close, focus trapping), reduced-motion support
- Responsive layout with a bottom navigation bar

## Run locally (Windows 11 + VS Code)

1. Install Node.js LTS from https://nodejs.org
2. Open this folder in VS Code (File > Open Folder).
3. In the VS Code terminal (Ctrl + `) run:

```bash
npm install
npm run dev
```

4. Open the address shown (usually http://localhost:5173).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build |

## Project structure

```text
src/
  assets/floral/   Lily, Sprig, Ribbon, Star SVG components
  components/      Header, Navigation, Layout, ProgressBar, TaskItem, TaskList,
                   HeartCheckbox, CalendarGrid, EmptyState, CompletionMessage,
                   AddTaskButton, Modal, TaskFormModal, TaskDetailsModal,
                   DeleteConfirmModal, Toast
  pages/           Today, Calendar, AllTasks
  context/         TaskContext (task state + localStorage), ModalContext (popups + toasts)
  hooks/           useTasks, useModals, useTodayKey
  types/           task.ts
  utils/           dateUtils.ts (local dates), taskUtils.ts (progress, sorting, storage)
```

## Deploying

Run `npm run build`, then deploy the `dist/` folder.

- **Netlify:** `public/_redirects` is included so /calendar and /tasks work on refresh.
- **Vercel:** `vercel.json` is included for the same reason.
- **GitHub Pages:** needs extra setup (a `base` path in `vite.config.ts` and a hash router
  or a 404 fallback), because it cannot rewrite routes to `index.html`.

## Upload to GitHub

```bash
git init
git add .
git commit -m "Daily Task Tracker"
```

Then create an empty repository on github.com and follow the "push an existing repository" steps.
`node_modules` and `dist` are already ignored by `.gitignore`.
