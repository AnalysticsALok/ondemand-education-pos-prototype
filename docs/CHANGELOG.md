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
- Added Transactions.
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
- Fixed completed purchases so they create transaction records and appear in Transactions.
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
- Added empty states for suspended sales, pending payments, transactions, search results, and recommendations.
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

## Milestone 8 - Siam Branch Demo Data Engine

- Added deterministic Demo Data Engine for stakeholder demo realism.
- Expanded Siam Branch students to approximately 100 realistic Thai student records across Grades 4-12.
- Expanded product catalog to approximately 50 realistic education products across digital courses, books, e-books, and live classes.
- Seeded approximately 300 Normal Day Siam Branch transactions with completed, pending payment, voided, cancelled, and SMS-sent states.
- Added scenario switching for Normal Day, Promotion Week, Exam Season, Open House, and Heavy Branch Traffic.
- Added scenario-specific suspended sale queue volumes and pending QR payment examples.
- Added hidden Demo Tools screen from Settings.
- Added Demo Tools actions for reset, fresh generation, scenario switching, transaction seeding, student seeding, pending payment seeding, and suspended sale seeding.
- Restricted branch selector to Siam Branch only for this stakeholder demo scope.
- Verified `npm run lint` and `npm run build` after implementation.

## Milestone 9 - Experimental Full-Order Refund Flow

- Added experimental refund branch feature for full-order refunds only.
- Added Request Refund action on completed transaction detail records.
- Added controlled refund request screen with receipt details, purchased items, payment method, paid amount, full refund amount, refund reason, optional note, manager PIN, and confirmation checkbox.
- Replaced refund status model with `Refund Requested`, `Refund Approved / Sent to Accounting`, and `Refund Rejected`.
- Removed prototype support for `Refund Processing` and `Refunded`.
- Moved refund approval/rejection to a prototype-only Refund Approval section in Demo Tools.
- Added refund detail section with status, reason, note, requested staff, manager approval, requested date/time, refund amount, and activity log.
- Added refund status badges in Transactions.
- Added refund events to Student Profile timeline.
- Rejected refunds restore the original paid/completed transaction status while keeping the refund audit section visible.
- Kept refund separate from Void and excluded Pending Payment, Voided, Cancelled, and already-refund-state transactions from refund requests.
- Verified `npm run lint` and `npm run build`.

## Milestone 10 - Experimental Siam Branch Dashboard

- Added read-only experimental Dashboard page for Siam Branch stakeholder demo.
- Added Dashboard shortcut in the header and Home screen.
- Added Today's Sales widgets for revenue, completed transaction count, and average order value.
- Added Transaction Status Summary for completed, pending payment, suspended, voided, refund requested, approved/sent to Accounting, and rejected records.
- Added Pending Actions widgets for pending payments, suspended sales, refund requests, and SMS failed cases.
- Added Top Selling Products and Product Mix sections based on current completed transaction state.
- Added Recent Activity stream for payment completed, refund requested, refund approved/sent to Accounting, refund rejected, sale suspended, transaction voided, and SMS sent/failed events.
- Added Refund Summary for requested count, approved/sent to Accounting count, rejected count, and latest refund request.
- Kept dashboard read-only with no backend, database, or BI integration.
- Verified `npm run lint` and `npm run build`.

## Milestone 11 - Mobile Responsive Cleanup

- Updated header wrapping so mobile/tablet widths no longer force the full desktop navigation into a single row.
- Made Student Banner non-sticky on mobile and sticky only on desktop/tablet widths.
- Removed mobile fixed-height behavior from the cart rail so catalog and cart stack naturally.
- Reduced mobile page padding and added page-level overflow protection to prevent large blank horizontal areas.
- Kept operational tables horizontally scrollable inside their own containers.
- Verified `npm run lint` and `npm run build`.

## Milestone 12 - Experimental Refund Completion Polish

- Renamed `Recent` navigation and page language to `Transactions`.
- Added deterministic Siam Branch refund demo cases across Refund Requested, Refund Approved / Sent to Accounting, and Refund Rejected.
- Added Transactions filter chips for All, Completed, Pending Payment, Suspended, Voided, Refund Requested, Sent to Accounting, and Refund Rejected.
- Kept Transactions search focused on receipt, student, phone, and product.
- Added Suspended filter support inside Transactions for operational review.
- Improved Receipt Preview with a dedicated printable receipt area.
- Added browser print behavior with `window.print()`.
- Added print CSS so only the receipt appears in printed output.
- Added Transaction Detail access to Receipt Preview.
- Expanded receipt content with branch, receipt number, date/time, staff, student, phone, items, product type, BU/product group, quantity, unit price, discount, totals, payment method/status, delivery information, SMS activation note, and refund status.
- Verified `npm run lint` and `npm run build`.

## Milestone 13 - Internal POS Strategy Presentation

- Added POS Strategy Presentation inside the existing POS app.
- Added Demo Tools cards for POS Strategy Presentation and Internal Resources.
- Added an internal slide-like HTML presentation explaining Education POS First as a lower-risk incremental delivery strategy toward Void, Refund Request, Change, and Advanced RCMS.
- Added presentation slides for current challenge, lessons learned, proposed direction, why POS first, POS workflow, phased delivery, Void versus Refund, prototype demo, discussion, and closing.
- Added Open POS Demo, Back to Demo Tools, and Back to POS Home navigation from the presentation.
- Added initial Internal Resources page for POS Strategy Presentation, RCMS Demo Videos, Refund & Change Notes, Future Integration Notes, and Prototype Links.
- Added Thai-friendly speaker notes in `docs/POS_STRATEGY_PRESENTATION_NOTES.md`.
- Updated project documentation to reflect the internal presentation section and POS-first strategy decision.

## Milestone 14 - Internal Product Hub And Presentation Mode

- Reworked Internal Resources from a placeholder into an internal Product Hub.
- Added grouped resource sections for Project Documents, Design, Demo, Testing, Technical, and Business Process.
- Added external links for PRD, first requirement sheet, Miro board, Figma, UI/database mapping, RCMS demo video, operation training videos, testing sheets, accounting test cases, database review, Lark POC, report requirements, current operation flow, and refund/change policy.
- Added new-tab Open buttons for external resources.
- Added Presentation Mode to POS Strategy Presentation.
- Presentation Mode shows one slide at a time, hides normal navigation behind a focused overlay, supports Next/Previous, Left/Right keyboard arrows, Escape to exit, progress indicator, and slide number.
- Improved presentation wording around Refund & Change coordination, Accounting, legacy systems, business rules, incremental delivery, frequent releases, lower implementation risk, and unchanged long-term RCMS vision.
- Simplified the discussion slide to `Decision to Align`.
- Updated project documentation and speaker notes.
