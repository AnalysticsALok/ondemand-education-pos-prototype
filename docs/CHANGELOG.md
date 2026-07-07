# Changelog

## Milestone 1 - Initial Clickable Prototype

- Created React/vinext prototype scaffold.
- Added Home with two sale entry points.
- Added Existing Student search.
- Added Student Profile.
- Added New Student / Walk-in form with phone validation.
- Added Learning Catalog with best-seller default, search, and filters.
- Added product cards for digital courses, books, e-books, and live classes.
- Added mixed-product shopping cart.
- Added payment flow for cash, credit card, and QR payment.
- Added payment success screen with SMS activation state.
- Added Recent Transactions.
- Added Transaction Detail.
- Added manager-approved Void Flow.
- Added responsive home layout.
- Validated with lint, production build, and local server health check.

## Milestone 2 - Documentation Source Of Truth

- Added `/docs/PROJECT_CONTEXT.md`.
- Added `/docs/UI_UX_GUIDELINES.md`.
- Added `/docs/FEATURE_ROADMAP.md`.
- Added `/docs/CHANGELOG.md`.
- Added `/docs/KNOWN_LIMITATIONS.md`.
- Established rule that `PROJECT_CONTEXT.md` must be updated whenever a major feature changes.

## Milestone 3 - POS Workflow Enhancements

- Added global search for students, products, and receipts.
- Added sticky student banner for catalog and payment.
- Added persistent cart rail during catalog/product selection.
- Added Favorites catalog section and product favorite toggles.
- Added Recently Sold section derived from transaction history.
- Added smart recommendation panel in the cart.
- Added Suspend Sale and Resume Sale workflows.
- Added Duplicate Sale from transaction detail.
- Added manager approval modal for manual discounts.
- Added discount reason and approval metadata in transaction detail.
- Added branch, payment gateway, SMS, shift, and staff status indicators.
- Converted transaction history from static mock rendering to live prototype state.
- Fixed completed purchases so they create transaction records and appear in Recent Transactions.
- Updated void behavior to change transaction status to `Voided` without deleting the transaction.

## Milestone 4 - Suspended Sales Queue And Student Profile Purchases

- Added dedicated Suspended Sales operations page.
- Added suspended sale search by student, phone, product, reason, note, and staff.
- Added suspended sale table with student, phone, item count, product summary, total, timestamp, staff, reason/note, and status.
- Added Resume Sale, View Detail, and Cancel Suspended Sale actions.
- Added Suspended Sale Detail page.
- Added suspend reason and note capture from the cart.
- Added Home Suspended Sales shortcut with active count badge.
- Added Suspended Sale Found card to Student Profile.
- Added Resume Sale from Student Profile.
- Added Student Profile purchase sections for digital courses, books, e-books, live classes, and purchase history.
- Connected completed payments to Student Profile purchase sections through live transaction history.
- Added View Profile action on Payment Success.

## Milestone 5 - Enterprise Polish And Checkout Realism

- Added Pending Payment transaction status.
- Added Pending Payments queue for generated QR payments.
- Added Resume Payment, Complete Payment, and Cancel Payment actions.
- Added Order Summary as a pre-payment quotation.
- Added Existing Student delivery information step for carts containing physical books.
- Added saved delivery addresses, default address selection, add new address, and edit address behavior.
- Added delivery notice in cart when physical books are present.
- Added delivery address display in Order Summary, Receipt Preview, and Transaction Detail.
- Added Receipt Preview with printed receipt layout and print/download/email/SMS actions.
- Added Student Timeline with purchases, SMS events, suspended sales, pending payments, completed payments, voided transactions, and live-class events.
- Added Student Alerts in banner/profile.
- Replaced simple promotion count with Eligible Promotions panels.
- Added duplicate purchase warning when adding an already-owned product.
- Expanded global search to include parent phone, product types, receipts, transactions, and suspended sales.
- Added loading states for search, product filtering, and payment processing.
- Added empty states for suspended sales, pending payments, recent transactions, search results, and recommendations.
- Added session smart defaults for last payment method, last catalog filter, and recently viewed products.

## Milestone 6 - Remaining Polish Cleanup

- Removed branch-stock language from book products and replaced it with central delivery language.
- Bound `Cmd K` / `Ctrl K` to global command search.
- Added transaction-history search with loading feedback.
- Added pending-payment search loading feedback.
- Added visible feedback for receipt print, PDF download, email, and SMS resend mock actions.
- Added current-branch session selection and surfaced it in header, Home, and system status.

## Milestone 7 - Stakeholder Demo And Vercel Readiness

- Converted primary scripts to standard Next.js commands for Vercel.
- Removed unused backend/database starter files.
- Removed unused Cloudflare Worker/vinext deployment artifacts.
- Removed unused D1/Drizzle dependencies.
- Replaced starter README with stakeholder demo and Vercel deployment instructions.
- Confirmed no environment variables are required.
- Added OnDemand-branded favicon and removed unused starter public assets.
- Applied safe `npm audit fix`; remaining production advisory is tied to Next.js transitive PostCSS and cannot be fixed without npm's suggested breaking downgrade.
- Verified production start on port 3001 after build.
