<div align=center>
	<h1>Jobify</h1>
</div>

<div align="center">
	<a href="https://jobify-ehkarabas.vercel.app/">
		<img src="https://img.shields.io/badge/live-%23.svg?&style=for-the-badge&logo=www&logoColor=white%22&color=black">
	</a>
</div>

<div align="center">
      <p>You can check presentation as video from below</p>
</div>

[![Go To The Presentation Video](https://i.hizliresim.com/enytu5r.png)](https://youtu.be/94dsMcQMKlg)

<hr>

## Description

A job application tracking app built with NextJS 14 and Shadcn on the frontend and Prisma on the backend. Authentication handled with Clerk. Users can filter their records and track their process via stats page. Prisma connected to Planetscale host.

## Backend Goals

Practicing on Prisma, models, aggregation with and without groupBy, pagination, configuration, migrating to different remote hosts, CRUD operations.

## Frontend Goals

Practicing on NextJS 14, client & server components, Clerk prebuilt components and hooks, tanstack useQuery on client components and QueryClient.prefetchQuery on server components to handle caching according to queryKey and useMutation on client components to handle execution states of invoking, using Shadcn as pre-styled components, pure js(with prisma) pagination, filtering via React Hook Form with support of urlSearchParams & useQuery, validating forms with Zod, theming via NextTheme with support of Shadcn, theming Clerk in compatible with NextTheme via Context API, NextJS 14 routing, preparing mock data with mockaroo to test pagination.

## Technologies

- NextJS 14
- React 18
- Prisma
- Clerk
- TanStack
- Shadcn
- React Hook Form
- Zod
- Planetscale
- Tailwind
- Recharts
- Dayjs
- Context API

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
jobify(folder)
|
├── README.md
├── app
│   ├── (dashboard)
│   │   ├── add-job
│   │   │   └── page.tsx
│   │   ├── jobs
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── stats
│   │       ├── loading.tsx
│   │       └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── assets
│   ├── logo.svg
│   └── main.svg
├── components
│   ├── ButtonContainer.tsx
│   ├── ChartsContainer.tsx
│   ├── ComplexButtonContainer.tsx
│   ├── CreateJobForm.tsx
│   ├── DeleteJobButton.tsx
│   ├── EditJobForm.tsx
│   ├── FormComponents.tsx
│   ├── JobCard.tsx
│   ├── JobInfo.tsx
│   ├── JobsList.tsx
│   ├── JobsSuspenseBridgeComp.tsx
│   ├── LinksDropdown.tsx
│   ├── Navbar.tsx
│   ├── SearchForm.tsx
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   ├── StatsContainer.tsx
│   ├── StatsLoadingCard.tsx
│   ├── ThemeToggle.tsx
│   ├── theme-provider.tsx
│   └── ui
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── skeleton.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── use-toast.ts
├── components.json
├── lib
│   └── utils.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.js
├── prisma
│   ├── mock_data.json
│   ├── schema.prisma
│   └── seed.js
├── public
│   ├── next.svg
│   └── vercel.svg
├── tailwind.config.ts
├── tsconfig.json
├── utils
│   ├── actions.ts
│   ├── db.ts
│   ├── links.tsx
│   └── types.ts
└── yarn.lock
```
