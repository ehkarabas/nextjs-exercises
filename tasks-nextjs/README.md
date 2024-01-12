<div align=center>
	<h1>Tasks with NextJS</h1>
</div>

<div align="center">
	<a href="https://tasks-with-nextjs-ehkarabas-ii6irtqn2.vercel.app/">
		<img src="https://img.shields.io/badge/live-%23.svg?&style=for-the-badge&logo=www&logoColor=white%22&color=black">
	</a>
  <br>
	<img src="./public/images/tasks-nextjs-presentation.gif"/>
</div>

## Description

A tasks app built with NextJS 14 on the frontend and Prisma on the backend. Prisma connected to Planetscale host, frontend includes API routes for testing purposes. Interactions on UI enchanced via a custom hook.

## Backend Goals

Practicing on Prisma, models, configuration, migrating to different remote hosts, CRUD operations.

## Frontend Goals

Practicing on NextJS 14, server actions, client & server components, React 18.2 useFormState and useFormStatus hooks, customizing React hooks, styling with DaisyUI, NextJS 14 routing, creating API endpoints via route handlers.

## Technologies

- NextJS 14
- React 18
- Prisma
- DaisyUI
- Planetscale
- Tailwind
- Custom Hooks

## Installation

To run this app on your local, run commands below on the terminal:

1. Clone the repo on your local.

   ```bash
   git clone https://github.com/ehkarabas/nextjs-exercises.git
   ```

2. Install node modules to this sub-repo..

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```

3. Run the app on your browser.

   ```bash
   yarn dev
   ```

   or

   ```bash
   npm run dev
   ```

## Resource Structure

```
tasks-nextjs(folder)
|
├── README.md
├── app
│   ├── (dashboard)
│   │   └── auth
│   │       ├── [[...signin]]
│   │       │   └── page.js
│   │       └── _page.js
│   ├── about
│   │   ├── info
│   │   │   └── page.js
│   │   └── page.js
│   ├── api
│   │   └── tasks
│   │       └── route.js
│   ├── client
│   │   └── page.js
│   ├── drinks
│   │   ├── [id]
│   │   │   ├── drink.jpg
│   │   │   ├── error.js
│   │   │   ├── loading.js
│   │   │   └── page.js
│   │   ├── error.js
│   │   ├── layout.js
│   │   ├── loading.js
│   │   └── page.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── prisma-example
│   │   └── page.js
│   ├── providers.js
│   └── tasks
│       ├── [id]
│       │   ├── error.js
│       │   ├── loading.js
│       │   └── page.js
│       ├── error.js
│       ├── loading.js
│       └── page.js
├── components
│   ├── Counter.jsx
│   ├── DeleteForm.jsx
│   ├── EditForm.jsx
│   ├── Navbar.jsx
│   ├── TaskForm.jsx
│   ├── TaskFormCustom.jsx
│   └── TaskList.jsx
├── jsconfig.json
├── middleware.js
├── next.config.js
├── package.json
├── postcss.config.js
├── prisma
│   ├── dev.db
│   ├── migrations
│   │   ├── 20240110175005_task_model
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   ├── images
│   │   └── tasks-nextjs-presentation.gif
│   ├── next.svg
│   └── vercel.svg
├── tailwind.config.js
└── utils
    ├── actions.js
    ├── db.ts
    └── hooks.js
```
