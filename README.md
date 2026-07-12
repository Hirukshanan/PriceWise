<div align="center">

# 🛍️ PriceWise

**Smart price comparison, favourites, and price-drop alerts — built with Vue 3.**

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## ✨ Overview

PriceWise is a shopping-comparison web app where users can browse products, track prices across two simulated sellers, save favourites, and set price-drop alerts. It's built as a Vue 3 + TypeScript single-page application, styled with Tailwind CSS, and powered by the [DummyJSON](https://dummyjson.com/) product API.

## 🚀 Features

- **🔍 Product browsing & search** — Live category filters and search, pulled straight from the DummyJSON products API.
- **⚖️ Best-deal comparison** — Every product is priced across two simulated sellers (with shipping costs factored in) so you can instantly see which one wins.
- **❤️ Favourites** — Save products you're interested in and revisit them anytime.
- **🔔 Price watch & alerts** — Set a target price for a product and monitor it for drops or restocks.
- **🕓 Comparison history** — Automatically keeps track of the last 20 products you've viewed.
- **🌗 Dark mode** — Theme preference is remembered and respects your system setting by default.
- **🔐 Authentication** — Local register/login flow that gates protected routes (favourites, price watch, account, product detail).
- **⚙️ Notification preferences & profile settings** — Configure alert types, quiet hours, and personal details from the account panel.
- **📱 Responsive UI** — Clean, mobile-first layout built entirely with Tailwind CSS.

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Routing | [Vue Router 4](https://router.vuejs.org/) |
| Data source | [DummyJSON](https://dummyjson.com/) product API |
| Persistence | Browser `localStorage` |

## 📂 Project Structure

```
PriceWise/
├── src/
│   ├── components/
│   │   ├── ProductCard.vue
│   │   └── common/            # NavBar, sidebar, modals (notifications, profile, history)
│   ├── composables/
│   │   └── useBestDeal.ts     # Seller price comparison logic
│   ├── router/                # Route definitions & auth guards
│   ├── store/                 # Reactive shared state + localStorage persistence
│   ├── types/                 # Product & alert TypeScript types
│   ├── views/                 # Home, Product Detail, Favourites, Price Watch,
│   │                          # Login, Register, Account
│   └── App.vue
├── public/
└── index.html
```

## 🛠️ Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### Installation

```sh
git clone https://github.com/Hirukshanan/PriceWise.git
cd PriceWise
npm install
```

### Development

```sh
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Type-check & Production Build

```sh
npm run build
```

### Preview the Production Build

```sh
npm run preview
```

## 🗺️ Routes

| Path | Description | Auth required |
|---|---|---|
| `/` | Home — browse & search products | No |
| `/product/:id` | Product detail & seller comparison | Yes |
| `/favourites` | Saved products | Yes |
| `/price-watch` | Active price alerts | Yes |
| `/account` | Profile & notification settings | Yes |
| `/login` | Sign in | No |
| `/register` | Create an account | No |

## 📌 Notes

- Product data is fetched live from the public DummyJSON API, so results reflect its sample catalog.
- Seller comparison prices (e.g. "Global Mart" vs "Local Express") are simulated for demonstration purposes rather than pulled from real retailers.
- All user data (accounts, favourites, alerts, settings) is stored locally in the browser via `localStorage` — there's no backend/database.


---

<div align="center">
Made with Vue 3 + TypeScript ⚡
</div>
