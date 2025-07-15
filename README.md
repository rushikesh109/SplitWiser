# Splitwiser

[![Vercel](https://img.shields.io/badge/deployed%20on-vercel-000?logo=vercel)](https://splitwiser-app.vercel.app)
[![Next.js](https://img.shields.io/badge/built%20with-Next.js-000?logo=nextdotjs)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/styled%20with-Tailwind%20CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![No License](https://img.shields.io/badge/license-NOT%20SPECIFIED-lightgrey)](LICENSE)

---

## Overview

**Splitwiser** is a modern web application that makes splitting bills and expenses with friends, family, or groups effortless. Whether you're sharing rent, planning a trip, or managing group expenses, Splitwiser helps you track, split, and settle up with ease.

- **Live Demo:** [https://splitwiser-app.vercel.app](https://splitwiser-app.vercel.app)

## Key Features

- 📊 **Dashboard:** Get a clear summary of your balances and expenses.
- 👥 **Groups & Contacts:** Create groups or add individuals for shared expenses.
- 💸 **Expense Splitting:** Split bills equally or by custom shares.
- 🧾 **Expense Categories:** Organize spending with categories.
- 🔄 **Settlements:** Track who owes whom and settle up easily.
- 📈 **Insights:** Visualize your spending and group balances.
- 🔐 **Authentication:** Secure sign-up and sign-in with Clerk.
- 🌗 **Dark Mode:** Seamless light/dark theme toggle.
- ⚡ **Fast & Responsive:** Built with Next.js, React 19, and Tailwind CSS.

## Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** Radix UI, Lucide Icons, custom components
- **State & Forms:** React Hook Form, Zod, Clerk Auth
- **Backend/DB:** [Convex](https://convex.dev/) (serverless database & functions)
- **AI/Automation:** Google Generative AI, Inngest (workflows)
- **Email:** Resend
- **Charts:** Recharts

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or newer
- [pnpm](https://pnpm.io/) / [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/splitwiser.git
   cd splitwiser
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in required values (Convex, Clerk, etc).

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production
```bash
npm run build
npm start
```

## Usage

1. **Sign up or log in** with your email or social account.
2. **Create a group** or add contacts.
3. **Add expenses** and assign participants.
4. **Split expenses** equally or by custom shares.
5. **View balances** and settle up with group members.
6. **Track your spending** and get insights on the dashboard.

## Contributing

We welcome contributions! To get started:

1. Fork the repository and create your branch from `main`.
2. Make your changes and add tests if applicable.
3. Open a pull request with a clear description of your changes.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

> **Note:** This project does not currently specify a license. To make it open source, please add a LICENSE file (e.g., MIT, Apache 2.0, etc.).

---

**Splitwiser** — Effortless bill splitting for everyone.