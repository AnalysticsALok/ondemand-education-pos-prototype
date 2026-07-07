# Known Limitations

## Product Limitations

- Split payments are not implemented.
- Promotion rules are simplified.
- Discount rules are simplified, though manual discounts now require manager approval.
- Tax behavior is mocked and should be confirmed with finance/accounting.
- Multi-student cart assignment is not implemented.
- Payment failure and retry states are not implemented.
- Receipt PDF download and email receipt are mock actions with visible confirmation feedback.
- SMS resend is represented as an action but does not simulate limits or failure.
- Full-order refund is implemented as an experimental branch feature only and is not approved for main/production.
- Refund is mock state only and has no backend, payment gateway, settlement, accounting, or audit-system integration.
- Refund does not support partial refund, item-level refund, exchange, store credit, or refund to a different payment method.
- Dashboard is implemented as an experimental read-only branch feature only and is not approved for main/production.
- Dashboard metrics are calculated from in-memory mock/live prototype state and should not be treated as accounting, BI, or operational reporting truth.
- Staff authentication and role permissions are not implemented.
- Manager approval is mocked with simple code or PIN entry fields.
- Smart recommendations use simple mock logic rather than real sales analytics.
- Suspended sale cancellation removes the mock case instead of preserving an audit trail.
- Suspended sale dates and staff names are mocked.
- Pending payment monitoring is mocked and does not poll a real QR provider.
- Delivery addresses are mock profile data and do not persist after reload.
- No inventory, branch stock, or warehouse stock behavior is implemented by design.

## UX Limitations

- Most responsive visual inspection has focused on the Home screen.
- Catalog, delivery, pending payments, suspended sales, and transaction tables should receive more tablet-specific QA.
- Experimental dashboard should receive tablet and small-laptop visual QA before stakeholder presentation.
- Icon-only actions have labels and tooltips but should receive accessibility testing.
- Global search supports `Cmd K` / `Ctrl K`; additional keyboard shortcuts are not implemented.

## Technical Limitations

- The prototype uses mock data only.
- There is no backend persistence.
- State resets on page reload.
- Suspended sales and purchase history are prototype state only.
- `app/page.tsx` is currently large and should be split as the prototype grows.
- Automated browser flow tests are not installed as a project-local dependency.
- `npm audit --omit=dev` reports a moderate PostCSS advisory through the current Next.js dependency tree; npm only offers a breaking forced downgrade, so it remains a monitored dependency risk.
