# 🎨 Bondhon Enterprise Design System & Premium UI Guidelines

This document serves as the definitive single source of truth for the **Bondhon Matrimonial Platform Design System**. Built upon modern aesthetics, strict visual excellence, and Apple/Stripe-tier interface principles, this design system establishes the foundational rules for typography, spacing, colors, themes, elevation, micro-animations, and interactive components.

---

## 1. 🔠 Typography System

Bondhon employs a highly polished, clean typographic hierarchy designed for maximum legibility and elegance.

- **Primary Font Family (`--font-sans`)**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`. Used for body copy, UI buttons, form inputs, and system badges.
- **Display Font Family (`--font-heading`)**: `Inter`, `Plus Jakarta Sans`, `sans-serif`. Used for hero banners, page headers, modal titles, and premium tier pricing numbers.
- **Monospace (`--font-mono`)**: `Geist Mono`, `Menlo`, `monospace`. Used for OTP input fields, code confirmation keys, and system transaction IDs.

### 📐 Scale & Paired Line Heights
```text
+--------------+-------------+---------------+-------------------------------------------------+
| Token        | Size (rem)  | Line Height   | Appropriate Usage                               |
+--------------+-------------+---------------+-------------------------------------------------+
| text-xs      | 0.75rem     | 1.00rem       | Micro-copy, form labels, timestamps, footnotes   |
| text-sm      | 0.875rem    | 1.25rem       | Button labels, table cells, short descriptions  |
| text-base    | 1.00rem     | 1.50rem       | Standard body text, active chat messages        |
| text-lg      | 1.125rem    | 1.75rem       | Subheadings, large button text, callouts        |
| text-xl      | 1.25rem     | 1.75rem       | Section headers, profile card names             |
| text-2xl     | 1.50rem     | 2.00rem       | Modal headers, pricing tier names               |
| text-3xl     | 1.875rem    | 2.25rem       | Page titles, primary dashboard headings         |
| text-4xl     | 2.25rem     | 2.50rem       | Feature section headers, checkout titles        |
| text-5xl-7xl | 3.00-4.50rem| 1.10 leading  | Marketing landing page Hero headlines           |
+--------------+-------------+---------------+-------------------------------------------------+
```

---

## 2. 📏 Spacing & Layout Grid

Our layout engine operates on a strict **4px baseline grid** (converted to rems) to ensure perfect rhythm and alignment across all viewports.

### 🔳 The Spacing Scale
- `space-1` (0.25rem / 4px): Icon-to-text gap, fine component borders.
- `space-2` (0.50rem / 8px): Stacked input field to helper text, tag gaps.
- `space-3` (0.75rem / 12px): Standard button padding, small card internal spacing.
- `space-4` (1.00rem / 16px): Default mobile container padding, form field vertical stacking.
- `space-6` (1.50rem / 24px): Primary card inner padding, desktop navigation gutters.
- `space-8` (2.00rem / 32px): Major component grouping gaps, dashboard grid gaps.
- `space-12` (3.00rem / 48px): Outer section padding on inner pages.
- `space-24` (6.00rem / 96px): Landing page Hero section separation.

### 📱 Responsive Viewport Breakpoints (Mobile-First)
```text
+-------------+-------------+-------------------------------------------------------------+
| Token       | Breakpoint  | Layout Behavior                                             |
+-------------+-------------+-------------------------------------------------------------+
| (Default)   | < 640px     | 100% full width, stacked drawers, mobile navigation bars.    |
| sm          | >= 640px    | 2-column small grids, modal width constraints (max-w-md).    |
| md          | >= 768px    | Desktop sidebar activates, 3-column discovery grids.        |
| lg          | >= 1024px   | Multi-pane chat windows expand, table column expansions.     |
| xl          | >= 1280px   | Maximum container bounds (max-w-7xl), ultra-wide padding.   |
| 2xl         | >= 1536px   | Widescreen optimization, fixed hero image scaling.          |
+-------------+-------------+-------------------------------------------------------------+
```

---

## 3. 🎨 Color Palette & Theme Definitions

Bondhon completely discards generic RGB colors in favor of curated, harmonious **OKLCH / HSL** color spaces that maintain perceptual balance in both dark and light modes.

### 🌟 Brand Pillars
- **Primary (Indigo)**: Represents trust, stability, professional accomplishment, and security.
- **Accent (Rose/Crimson)**: Represents warmth, affection, passion, and matrimonial commitment.
- **Neutral (Zinc)**: Ultra-clean, modern grayscale providing perfect reading contrast without harsh black/white fatigue.

```text
+-------------------+---------------------------+---------------------------+--------------------------------------------------+
| Color Role        | Light Mode Token (OKLCH)  | Dark Mode Token (OKLCH)   | Contextual Meaning                               |
+-------------------+---------------------------+---------------------------+--------------------------------------------------+
| Background        | oklch(0.99 0.003 264)     | oklch(0.12 0.005 264)     | Underlying page and canvas background            |
| Card Background   | oklch(1 0 0)              | oklch(0.15 0.005 264)     | Elevated structural cards and modal surfaces     |
| Primary Brand     | oklch(0.45 0.24 264)      | oklch(0.65 0.24 264)      | Primary CTAs, active states, active tab borders   |
| Accent Brand      | oklch(0.65 0.24 16)       | oklch(0.70 0.24 16)       | Heart icons, premium highlights, like buttons   |
| Success (Emerald) | oklch(0.75 0.18 156)      | oklch(0.75 0.18 156)      | Government ID verified badges, online indicators |
| Warning (Amber)   | oklch(0.78 0.19 75)       | oklch(0.78 0.19 75)       | Pending verification, premium billing alert      |
| Destructive       | oklch(0.577 0.245 27.32)  | oklch(0.704 0.191 22.21)  | Suspend user actions, cancellation warnings      |
| Borders           | oklch(0.92 0.005 264)     | oklch(0.22 0.01 264)      | Component outlines, table row dividers           |
+-------------------+---------------------------+---------------------------+--------------------------------------------------+
```

---

## 4. 🔲 Corner Radius & Geometric Curves

To maintain an elite Apple-level hardware/software cohesion, our geometric corner radiuses follow a strict exponential hierarchy.

- `--radius-sm` (6px): Badges, tooltips, checkboxes, small tags.
- `--radius-md` (8px): Form input fields, secondary utility buttons, dropdown menu items.
- `--radius-lg` (10px): Primary call-to-action buttons, discovery filter chips.
- `--radius-xl` (14px): Small UI cards, notification popover boxes.
- `--radius-2xl` (18px): Standard discovery profile cards, chat message speech bubbles.
- `--radius-3xl` (24px): Large pricing cards, dashboard feature panels, authentication modal containers.
- `--radius-4xl` (32px): Hero section background cards, major layout wrappers.

---

## 5. 🌥️ Shadows, Elevation & Depth

We utilize multi-layered, soft drop-shadows combined with ambient color tints (indigo/rose) to simulate natural lighting and elevation.

```text
+----------------------+-------------------------------------------------------------------------+
| Elevation Token      | Composed CSS Shadow Values                                              |
+----------------------+-------------------------------------------------------------------------+
| shadow-premium-sm    | 0 1px 2px 0 rgba(0, 0, 0, 0.05)                                         |
| shadow-premium-md    | 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)         |
| shadow-premium-lg    | 0 10px 15px -3px rgba(79,70,229,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)   |
| shadow-premium-xl    | 0 20px 25px -5px rgba(79,70,229,0.15), 0 10px 10px -5px rgba(0,0,0,0.04)|
| shadow-premium-2xl   | 0 25px 50px -12px rgba(244, 63, 94, 0.25)                               |
| shadow-premium-glow  | 0 0 25px -3px rgba(79, 70, 229, 0.4)                                    |
| shadow-premium-inner | inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)                                   |
+----------------------+-------------------------------------------------------------------------+
```
- **Contextual Glow (`shadow-premium-glow`)**: Applied exclusively to active premium badges, selected checkout options, and live compatibility score meters.

---

## 6. ⚡ Micro-Animations & Dynamic Feedback

An interface that feels alive encourages interaction. Bondhon integrates custom CSS keyframes and Framer Motion micro-interactions to create a delightful, fluid experience.

### 🎭 Keyframe Choreography
1. `animate-float` (4s ease-in-out infinite): Produces a gentle 8px vertical levitation. Used on landing page hero elements and floating success story badges.
2. `animate-shimmer` (2.5s infinite linear): Glides a metallic highlight across loading skeletons and elite tier pricing borders.
3. `animate-pulse-glow` (3s cubic-bezier infinite): Gently pulses the opacity and scale of online presence dots and government verification shields.
4. `animate-scale-up` (0.3s cubic-bezier forwards): Snappy bounce-in entry animation for dialogs, modals, and liked profile confirmation alerts.

### 🖱️ Interactive Micro-States
- **Hover Transitions**: All interactive cards and buttons utilize `transition-all duration-300`. Buttons gain a slight shadow lift (`hover:shadow-lg`) and background brightness adjustment.
- **Active / Tap States**: Buttons compress slightly (`active:scale-[0.98]`) to provide immediate tactile confirmation to the user.

---

## 7. 🏷️ Iconography System

Bondhon standardizes on **Lucide React** for crisp, vector-scaled iconography.

### 📌 Icon Rules & Sizing Tokens
- **Line Weight**: Strictly `2px` stroke width across all icons for visual consistency.
- **Sizing Tokens**:
  - `icon-sm` (`h-3.5 w-3.5` / 14px): Inline button prefixes, small table status markers, tag icons.
  - `icon-md` (`h-5 w-5` / 20px): Primary navigation items, input field prefix symbols (search, email, lock).
  - `icon-lg` (`h-6 w-6` / 24px): Feature grid headers, card title highlights.
  - `icon-xl` (`h-12 w-12` / 48px): Success modal checkmarks, empty state illustrations.

---

## 8. 💎 Premium UI & UX Guidelines

To maintain our core directive of delivering an elite, wow-inducing user experience, all front-end engineers on Bondhon must adhere to the following strict guidelines:

### 1. 🧊 Glassmorphism & Backdrop Blur
Always incorporate `backdrop-blur-xl` combined with a translucent background (`bg-white/80` or `bg-zinc-900/80`) on sticky headers, floating navigation bars, and modal overlays. This ensures underlying content flows beautifully beneath the UI elements.

### 2. 🌈 Smooth Gradients
Avoid solid color fills on major call-to-action buttons or hero headlines. Utilize rich, multi-stop linear gradients:
- **Primary Gradient**: `bg-gradient-to-r from-indigo-600 to-rose-500` (Transitioning from professional trust to personal warmth).
- **Text Gradient**: `bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent`.

### 3. 🚫 Zero Placeholder Rule
Never use generic gray placeholder boxes, `lorem ipsum` text, or broken image frames. Every state—including initial discovery feeds, chat empty states, and pricing matrices—must be populated with high-fidelity, realistic professional simulation data.

### 4. ♿ Accessibility (a11y) & Contrast
- **Form Labels**: Every input field must have an explicit, readable label (`text-sm font-medium text-zinc-700 dark:text-zinc-300`).
- **Focus Rings**: All interactive inputs and buttons must display a clear focus ring upon keyboard navigation (`focus:ring-2 focus:ring-indigo-500 outline-none`).
- **Contrast Ratio**: Guarantee at least a `4.5:1` contrast ratio for all body text against its background.

---

## 🚀 Summary of Implementation

This design system is fully compiled and active within the platform:
- **Base CSS Integration**: [globals.css](file:///Users/ta-shanto/Coding/personal-projects/Bondhon/src/app/globals.css)
- **Component Primitives**: [shadcn/ui setup](file:///Users/ta-shanto/Coding/personal-projects/Bondhon/src/components/ui)
- **Theming Engine**: Fully wired via `next-themes` in [Root Layout](file:///Users/ta-shanto/Coding/personal-projects/Bondhon/src/app/layout.tsx)
