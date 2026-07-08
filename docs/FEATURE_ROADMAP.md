# Feature Roadmap

This file tracks planned prototype improvements. Current completed functionality is documented in `PROJECT_CONTEXT.md`.

## Priority 1

- Review prototype with branch-staff transaction scenarios.
- Tighten catalog/cart/payment workflow friction.
- Validate experimental full-order refund branch flow before any main/production merge decision.
- Validate seeded refund demo cases with operations and finance stakeholders.
- Decide whether refund approval should integrate with Lark after stakeholder review.
- Define Accounting handoff requirements for approved refund requests outside the POS prototype.
- Validate experimental Siam Branch dashboard metrics with branch managers before any main/production merge decision.
- Validate printable receipt format with branch operations before production handoff.
- Add presenter notes for stakeholder walkthroughs.
- Add payment failure and retry flow.
- Validate suspended-sales queue, resume, cancel, and duplicate-sale flows with branch managers.
- Validate pending QR payment flow with branch staff.
- Validate delivery information copy against OnDemand operations.
- Tune smart recommendation rules against real sales bundles.
- Validate Demo Tools scenario switching with stakeholders.

## Priority 2

- Add additional keyboard shortcuts for high-frequency branch actions beyond global search.
- Add multi-student cart assignment.
- Add split payment or mixed payment methods.
- Add realistic promotion and discount rules beyond manager-approved manual discounts.
- Add SMS resend status and resend limits.

## Priority 3

- Add manager role and permission model.
- Decide whether the experimental full-order refund flow should graduate to main scope after stakeholder review.
- Add live class seat hold behavior without inventory management.

## Technical Roadmap

- Split `app/page.tsx` into feature components.
- Extract Demo Data Engine into a dedicated module when component splitting begins.
- Add project-local Playwright dependency and scripted browser tests.
- Add broader responsive visual QA for mobile/tablet dashboard, catalog/cart, queues, transaction detail, and refund request screens.
- Add automated checks for experimental dashboard metrics once the dashboard scope is approved.
- Add automated checks for suspended queue, pending payment queue, student profile timeline, delivery selection, and resume state restoration.
- Review dependency audit warnings before production handoff.
