# E-commerce Client

A Codecademy portfolio project: a React frontend for the
[ecommerce-api](https://github.com/shafasayed/ecommerce-api) REST API,
built with React, React Router, and Vite.

## Live demo

- App: https://ecommerce-client-ucsk.onrender.com
- API: https://ecommerce-api-oyot.onrender.com

Hosted on Render's free tier. The API it talks to spins down after periods
of inactivity, so the first request after a while can take 30-60 seconds.

## Features

- Registration and login (session-based, against the API)
- Browsing products and viewing product details
- A personal shopping cart with quantity updates
- Checkout via Stripe (test mode)
- Order history, including cancelling a pending order
- Routes that require login (cart, checkout, orders) redirect to the
  login page when logged out

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API address

Create a `.env` file:

```bash
cp .env.example .env
```

By default the app talks to `http://localhost:3000`. Set
`VITE_API_ENDPOINT` in `.env` if your API runs somewhere else.

### 3. Start the dev server

```bash
npm run dev
```

Open http://localhost:5173. You'll need
[ecommerce-api](https://github.com/shafasayed/ecommerce-api) running
locally too (its README covers that setup, including PostgreSQL and
Stripe test keys).

## Scope and known limitations

Third-party login (Google/Facebook) was skipped to keep this project
scoped to a single working session — see the API's README for the
full note.

Login sessions may not persist across page loads in Safari, since the
frontend and API are deployed on two different domains and Safari's
tracking-prevention rules block cookies set this way. Login and every
other feature works correctly in other browsers. See the API's README
for the full explanation and the production-ready fix (token-based auth
instead of cookies).

## What I learned

- Structuring a React app with pages, a shared API layer, and route guards
- Sharing login state across an app with React Context
- Calling a separate backend from the frontend, including CORS and
  cross-origin cookies
- Redirecting a Stripe Checkout session back into a single-page app
- Deploying a Vite app as a static site, including SPA routing rewrites
