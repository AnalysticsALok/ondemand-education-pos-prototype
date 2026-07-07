# UI/UX Guidelines

This file supports `PROJECT_CONTEXT.md`. If a design rule changes materially, update both files when relevant.

## Core UX Rules

- Optimize for branch staff performing 200-500 transactions per day.
- Prefer faster workflows over prettier interfaces.
- Reduce clicks and typing.
- Keep sale context visible.
- Keep the current cart visible during product selection on desktop/tablet widths.
- Treat suspended sales as an operations queue, not a cart-only feature.
- Treat pending QR payments as an operations queue.
- Physical-book delivery information belongs only in Existing Student checkout when books are present.
- Make destructive workflows deliberately slower.
- Gate manual discounts and voids with manager approval.
- Avoid decorative UI that competes with operational tasks.

## Visual System

- Primary color: `#028FC1`.
- Background: subtle gray application canvas.
- Main surfaces: white cards with subtle borders.
- Radius: prefer compact enterprise radius around `8px`.
- Shadows: avoid or use very lightly.
- Typography: Geist Sans, clear hierarchy, compact labels.

## Components

- Cards group related operational tasks.
- Buttons use primary, secondary, icon-only, and destructive variants.
- Inputs require visible labels and focus states.
- Tables must remain scannable and horizontally scroll on narrow screens.
- Operational queue tables should answer who, what, when, why, status, and next action without opening detail.
- Badges communicate status, type, warning, and counts.
- Search should support forgiving query behavior and quick chips.
- Global search should support students, parent phone, products, receipts, transactions, and suspended sales.
- Receipt Preview should look like the printed receipt, not a marketing confirmation screen.
- Favorites and Recently Sold should be quick-add surfaces, not separate pages.
- Recommendations should sit inside the cart and never block checkout.
- System status should be visible without covering mobile content.

## Interaction Principles

- Primary actions should advance the sale.
- Secondary actions should support or navigate.
- Icon-only buttons require accessible labels and tooltips.
- Validation should appear close to the field.
- Error states should explain how to recover.
- Suspend Sale should preserve student, cart, and approved discount state.
- Suspend Sale should capture reason and note so another staff member can resume safely.
- Student Profile should surface unfinished sales before purchase history.
- Student Timeline should act as the operational history of the student.
- Duplicate purchase warnings should inform staff but never block checkout.
- Duplicate Sale should copy products only and require a new student selection.
