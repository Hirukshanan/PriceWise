<div align="center">

# 🛍️ PriceWise

### Smart price comparison, favourites & price-drop alerts — built with Vue 3

Browse products, compare simulated sellers side-by-side, and never miss a deal.

<p>
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white" alt="Vue 3.5" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
</p>

[Features](#-features) •
[Tech Stack](#-tech-stack) •
[Getting Started](#️-getting-started) •
[Routes](#️-routes) •
[Project Structure](#-project-structure)

</div>

---

## ✨ Overview

**PriceWise** is a shopping-comparison single-page app where users can browse products, see prices compared across two simulated sellers, save favourites, and set price-drop alerts. It's built with **Vue 3 + TypeScript**, styled with **Tailwind CSS**, and powered by the [DummyJSON](https://dummyjson.com/) product API.

> 💡 All comparison and account data runs entirely in the browser — no backend required — which makes it easy to clone, run, and explore.

<!--
📸 Add a screenshot or GIF of the app here once you have one, e.g.:
![PriceWise screenshot](./docs/screenshot.png)
-->

## 🚀 Features

| Category | What it does |
|---|---|
| 🔍 **Product browsing & search** | Live category filters and search, pulled straight from the DummyJSON products API |
| ⚖️ **Best-deal comparison** | Every product is priced across two simulated sellers — *Global Mart* and *Local Express* — with shipping factored in, so you instantly see which one wins |
| ❤️ **Favourites** | Save products you're interested in and revisit them anytime |
| 🔔 **Price watch & alerts** | Set a target price for a product and get notified on drops or restocks |
| 🕓 **Comparison history** | Automatically keeps track of the last 20 products you've viewed |
| 🌗 **Dark mode** | Theme preference is remembered and respects your system setting by default |
| 🔐 **Authentication** | Local register/login flow that gates protected routes (favourites, price watch, account, product detail) |
| ⚙️ **Notification & profile settings** | Configure alert types, quiet hours, and personal details from the account panel |
| 📱 **Responsive UI** | Clean, mobile-first layout built entirely with Tailwind CSS |

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

## 🏗️ How the deal comparison works

Each product runs through a small comparison engine (`useBestDeal.ts`) that prices it across two simulated sellers:

- **Global Mart** — the base product price, no shipping cost
- **Local Express** — the product's own discount applied, plus a flat shipping fee

The lower final price is flagged as the best deal, so you can compare at a glance without doing the math yourself.

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
- Seller comparison prices ("Global Mart" vs "Local Express") are simulated for demonstration purposes rather than pulled from real retailers.
- All user data (accounts, favourites, alerts, settings) is stored locally in the browser via `localStorage` — there's no backend or database.

## 🤝 Contributing

Contributions, issues, and feature suggestions are welcome. Feel free to check the [issues page](https://github.com/Hirukshanan/PriceWise/issues) or open a pull request.

## 👤 Author

**Hirukshanan** — [@Hirukshanan](https://github.com/Hirukshanan)

---

<div align="center">

Made with Vue 3 + TypeScript ⚡

If you found this project useful, consider giving it a ⭐!

</div>
