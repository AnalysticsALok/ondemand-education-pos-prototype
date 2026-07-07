# Feature Roadmap

This file tracks planned prototype improvements. Current completed functionality is documented in `PROJECT_CONTEXT.md`.

## Priority 1

- Review prototype with branch-staff transaction scenarios.
- Tighten catalog/cart/payment workflow friction.
- Add stakeholder demo scenario labels.
- Add presenter notes for stakeholder walkthroughs.
- Add payment failure and retry flow.
- Validate suspended-sales queue, resume, cancel, and duplicate-sale flows with branch managers.
- Validate pending QR payment flow with branch staff.
- Validate delivery information copy against OnDemand operations.
- Tune smart recommendation rules against real sales bundles.

## Priority 2

- Add additional keyboard shortcuts for high-frequency branch actions beyond global search.
- Add multi-student cart assignment.
- Add split payment or mixed payment methods.
- Add realistic promotion and discount rules beyond manager-approved manual discounts.
- Add SMS resend status and resend limits.

## Priority 3

- Add manager role and permission model.
- Add refund flow distinct from same-day void.
- Add live class seat hold behavior without inventory management.

## Technical Roadmap

- Split `app/page.tsx` into feature components.
- Add project-local Playwright dependency and scripted browser tests.
- Add broader responsive visual QA.
- Add automated checks for suspended queue, pending payment queue, student profile timeline, delivery selection, and resume state restoration.
- Review dependency audit warnings before production handoff.
