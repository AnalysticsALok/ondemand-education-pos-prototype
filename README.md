# OnDemand Education POS Prototype

High-fidelity clickable prototype for an OnDemand Thailand Education POS used by branch staff.

This is a frontend-only stakeholder demo. It uses realistic mock data and does not require a backend, database, authentication provider, inventory system, or environment variables.

## Project Overview

The prototype demonstrates a production-ready branch sales workflow for:

- Existing student sales
- New Student / Walk-in sales
- Mixed education product carts
- Digital courses, live classes, e-books, and centrally delivered physical books
- Suspended sales
- Pending QR payments
- Delivery information for existing students buying books
- Order summary, payment, receipt preview, and student timeline behavior

The design priority is enterprise usability: fast cashier workflows, low training time, mistake prevention, and clear operational queues.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide icons
- Mock client-side state only

## Requirements

- Node.js `>=22.13.0`
- npm

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run lint
npm run build
```

## Start Production Build Locally

```bash
npm run build
npm run start
```

## Deploy To Vercel

This project is ready for Vercel using the standard Next.js flow.

Recommended Vercel settings:

- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave default
- Environment Variables: none required

No backend or database setup is needed.

## First GitHub Push

Create an empty GitHub repository first. Recommended repository name:

```text
ondemand-education-pos-prototype
```

Do not add a GitHub README, license, or `.gitignore` when creating the repository because this project already includes those files.

Then run:

```bash
git add .
git commit -m "Initial OnDemand POS prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ondemand-education-pos-prototype.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username or organization name.

After the repository is connected to Vercel, every push to `main` will trigger a new Vercel deployment automatically.

## Demo Flows

### 1. Existing Student Buys Digital Course Only

1. Start at Home.
2. Select `Existing Student`.
3. Search/select `Pimchanok Wongsa`.
4. Open Catalog.
5. Add `A-Level Math Intensive`.
6. Review cart and select `Review Order`.
7. Confirm Order Summary.
8. Pay with Cash or Credit Card.
9. View Payment Success.
10. Preview or print receipt.

### 2. Existing Student Buys Course + Physical Book

1. Start at Home.
2. Select `Existing Student`.
3. Search/select `Pimchanok Wongsa`.
4. Open Catalog.
5. Add `A-Level Math Intensive`.
6. Add `Math Workbook Set` or `Chemistry Formula Book`.
7. Notice `Book Delivery Required` in the cart.
8. Select `Review Order`.
9. Select or edit a saved delivery address.
10. Continue to Order Summary.
11. Complete payment.
12. Open Receipt Preview and verify delivery details.

### 3. New Student / Walk-in Buys Course

1. Start at Home.
2. Select `New Student / Walk-in`.
3. Enter student name, Thai mobile number, and grade.
4. Continue to Catalog.
5. Add a digital course.
6. Review Order Summary.
7. Complete payment or generate QR Pending Payment.
8. Confirm Payment Success shows SMS activation.
9. Open Student Profile to see SMS/purchase timeline.

## Keyboard Support

- `Cmd K` / `Ctrl K`: focus global search
- `Enter`: select first student/global search result when available
- `Esc`: clear global search or close modal workflows
- Tab order follows visible workflow order

## Documentation

Project source-of-truth documents live in `/docs`:

- `PROJECT_CONTEXT.md`
- `UI_UX_GUIDELINES.md`
- `FEATURE_ROADMAP.md`
- `CHANGELOG.md`
- `KNOWN_LIMITATIONS.md`

Update `PROJECT_CONTEXT.md` whenever a major feature or workflow changes.
