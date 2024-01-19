<div align=center>
	<h1>GPTGenius</h1>
</div>

<div align="center">
	<a href="https://gptgenius-ehkarabas.vercel.app/">
		<img src="https://img.shields.io/badge/live-%23.svg?&style=for-the-badge&logo=www&logoColor=white%22&color=black">
	</a>
</div>

<div align="center">
      <p>You can check presentation as video from below</p>
</div>

[![Go To The Presentation Video](https://i.hizliresim.com/so6i5fy.png)](https://youtu.be/mwiHh2fPmlI)

<hr>

## Description

A chat and tour plan generator app built with NextJS 14 and OpenAI on the frontend and Prisma on the backend. Authentication handled with Clerk. Response generation limited, all end-users have predefined token amount to generate responses. Related images generated with Unsplash API. Prisma connected to Planetscale host.

## Backend Goals

Practicing on Prisma, models, model relations, unique field combinations on model level, configuration, migrating to different remote hosts, CRUD operations.

## Frontend Goals

Practicing on NextJS 14, client & server components, Clerk prebuilt components and hooks, customizing React hooks, tanstack useQuery on client components and QueryClient.prefetchQuery on server components to handle caching according to queryKey and useMutation on client components to handle extras after an invoke, theming via Context API and Redux store, theming Clerk in compatible with DaisyUI, styling with DaisyUI, NextJS 14 routing.

## Technologies

- NextJS 14
- React 18
- Prisma
- OpenAI
- Clerk
- TanStack
- DaisyUI
- Planetscale
- Unsplash API
- Tailwind
- Redux, Redux Toolkit
- Context API
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
gptgenius(folder)
|
├── README.md
├── app
│   ├── (dashboard)
│   │   ├── chat
│   │   │   └── page.js
│   │   ├── layout.js
│   │   ├── profile
│   │   │   └── page.js
│   │   └── tours
│   │       ├── [id]
│   │       │   └── page.js
│   │       ├── loading.js
│   │       ├── new-tour
│   │       │   └── page.js
│   │       └── page.js
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components
│   ├── Chat.jsx
│   ├── MemberProfile.jsx
│   ├── NavLinks.jsx
│   ├── NewTour.jsx
│   ├── Sidebar.jsx
│   ├── SidebarHeader.jsx
│   ├── ThemeToggle.jsx
│   ├── TourCard.jsx
│   ├── TourInfo.jsx
│   ├── Tours.jsx
│   └── ToursList.jsx
├── contexts
│   ├── generalProvider.js
│   ├── storeProvider.js
│   ├── themeClerkContext.js
│   └── toastRQProvider.jsx
├── features
│   └── themeSlice.jsx
├── gptgenius.md
├── hooks
│   └── useThemeCall.jsx
├── jsconfig.json
├── middleware.js
├── next.config.js
├── package.json
├── postcss.config.js
├── prisma
│   ├── db.ts
│   └── schema.prisma
├── public
│   ├── next.svg
│   └── vercel.svg
├── store
│   └── store.jsx
├── tailwind.config.js
├── utils
│   └── actions.js
└── yarn.lock
```
