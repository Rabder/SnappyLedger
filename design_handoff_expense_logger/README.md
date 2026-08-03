# Handoff: Expense Logger (Quick Log + History)

## Overview
A mobile-first, installable PWA for logging everyday personal expenses faster than a spreadsheet. Two screens: **Quick Log** (default screen — log an expense in a few taps) and **History** (browse past entries, filtered by category). Target user: working adults, post-college, who want near-zero-friction expense capture.

## About the Design Files
The files in `source/` are **design references built in HTML** (a prototyping tool's component format — the `<x-dc>`/`<script data-dc-script>` wrapper and `{{ }}` template syntax are NOT a framework to ship). They render live and are fully click-through interactive, so treat them as an interactive spec of exact layout, copy, states, and behavior — not code to paste into the app. **Recreate this UI in the target codebase's existing environment** (React Native, native iOS/Android, or a real web framework) using its established component/styling patterns. If no environment exists yet, React + a CSS-in-JS or utility-CSS approach is a good default for a PWA like this.

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy below are final for v1. Category icons are the one placeholder exception — see Assets.

## Screens / Views

### 1. Quick Log (`source/Expense Quick Log.dc.html`) — default/home screen
**Purpose:** Log one expense as fast as possible; one-handed, thumb-reachable.

**Layout:** Mobile viewport (design at 390×844, standard mobile-first responsive). Vertical flex column:
1. Status bar area (omit in real app — OS-owned in a real PWA)
2. Header row: "New expense" title (22px/700) + a close/X icon button (32×32, top-right) — X likely dismisses back to... itself/no-op in v1 since this is the home screen; wire to whatever "cancel and reset" means in the real nav.
3. Date pill button, pill-shaped, shows "Today" by default, opens the calendar sheet on tap.
4. Amount card: bordered rounded rect (18px radius, 1px border `rgba(255,255,255,0.08)`, 18px padding), containing a "$" prefix (34px, muted) + a native numeric text input (`inputmode="decimal"`, 42px/700, Space Mono, center-aligned, no visible border — the card itself is the visual container). Border highlights to accent color on focus.
5. Category grid: 3×2 grid, 10px gap, of 6 fixed tappable tiles (NOT a dropdown/free text): Rent, Food, Transport, Subscriptions, Entertainment, Other. Each tile: rounded rect (16-18px radius), an icon slot (48-82px depending on final layout) + label (11px/600) below it, single-select (tap toggles selection; tapping the selected one again deselects). Selected state: background = accent at 16% opacity, border = accent at 60% opacity.
6. Note field: single-line text input, always visible but visually secondary (small 13px text, muted placeholder "Add a note (optional)"), full width, rounded 12px, subtle background.
7. Flexible spacer.
8. Save area: a small horizontal grip/handle (drag affordance, 36×4px pill) above a full-width primary button "Log it" (17px/700, white text, accent background, 18px radius, 17px vertical padding). Below it, a helper caption (11px, muted) reads "swipe up or tap to log" when valid.
9. Bottom tab bar: 2 tabs, "Log" (active) and "History", each a small icon (22×22 rounded square, filled=active/accent, outlined=inactive) + 10.5px label. Fixed to the bottom, safe-area padding below.

**Overlays (absolutely positioned, cover the screen):**
- **Calendar sheet** (bottom sheet, slides up from `translateY(110%)` to `0` over ~280ms, cubic-bezier(0.32,0.72,0,1)): dark scrim behind it; sheet has a grab handle, month nav (‹ month year ›, next-month arrow disabled when viewing the current month), "Today"/"Yesterday" quick-select chips, a standard 7-column calendar grid (Sun–Sat), each day a circular tap target, **dates after today are disabled/dimmed** (backdating allowed, future dates are not), and a "Done" button to close.
- **Success confirmation** (full-screen overlay, fades/scales in ~250ms): a 88px circular success icon (green, checkmark), "Logged!" (24px/700), a one-line summary "$25 · Food" (15px/600, muted), and a "Log another" button that resets the form (amount, category, note cleared; date reset to today) and dismisses the overlay.

**Validation:** Save requires amount > 0 AND a category selected. Button dims to accent-at-40%-opacity when invalid. Tapping "Log it" while invalid shakes the amount box and/or category grid (whichever is missing) and shows a red-tinted helper caption naming what's missing ("Enter an amount", "Pick a category", or both) for ~400ms.

**Interaction — save gesture:** Both a plain tap on "Log it" AND a swipe-up gesture on the small grip handle above it trigger save (swipe threshold ≈55px upward drag). These are independent handlers — don't gate the button's click on drag state (a real bug we hit: pointer-capture from a shared parent handler blocked plain clicks; keep tap and swipe as two separate listeners).

### 2. History (`source/History.dc.html`)
**Purpose:** Browse logged expenses, filtered by category. View-only in v1 (no edit/delete).

**Layout:**
1. Status bar (omit, OS-owned)
2. Header: "History" title (22px/700)
3. Category filter chip row: horizontally scrollable pill buttons — "All" + the 6 category names. Selected chip: accent background, white text. Unselected: dark tile background, secondary text color.
4. Scrollable list, grouped by day:
   - Day header row: day label ("Today" / "Yesterday" / "Aug 1", 13px/700, uppercase, muted) + right-aligned **day subtotal** (13px/700, Space Mono).
   - Rows below each header: 36×36 rounded-square category avatar (colored per category, letter/icon + white), then a stacked label (expense name/note, 13.5px/600) + category name (11.5px/500, muted), then the amount right-aligned (14px/700, Space Mono). Tapping a row opens the detail sheet.
5. Bottom tab bar: same as Quick Log, "History" active this time, "Log" links back.
6. Empty state (per active filter): centered "No expenses in this category yet" (14px/600, muted) when the filtered list is empty.

**Detail sheet** (tap a row): bottom sheet with scrim, shows the category avatar (44×44) + label + "category · full date", a large amount (40px/700, Space Mono), and a "Close" button.

## Interactions & Behavior Summary
- Category selection: single-select, toggleable (tap again to deselect) on Quick Log; single-select filter (not toggleable — "All" is the neutral/default) on History.
- Date default: always "today" on load; picking a future date is blocked entirely (disabled calendar cells).
- Amount input: numeric only, at most one decimal point, max 2 decimal places — sanitize keystrokes, don't rely on `type="number"` alone.
- No totals, charts, or spending summaries beyond the simple per-day subtotal on History (explicit v1 scope decision) — don't add net worth, trends, budgets, etc. without the user asking.
- Confirmation is transient/manual: user must tap "Log another" to return to a blank form (no auto-dismiss timer in the final "1b" direction that was chosen).

## State Management
**Quick Log** needs: `amount` (string, sanitized numeric), `category` (enum id or null), `date` (Date, defaults today), `note` (string), calendar sheet open/closed + its own visible-month cursor, save-attempted validation flags, saved/confirmation boolean.

**History** needs: `categoryFilter` (enum id or 'all'), the fetched expense list, and which entry (if any) is open in the detail sheet.

**Data fetching required (net new backend work):**
- `POST /expenses` — body: `{ amount: number, category: 'rent'|'food'|'transport'|'subs'|'ent'|'other', date: ISO date string, note?: string }`. Called on successful "Log it". Should be optimistic/instant from the user's POV — the UI already shows success before waiting on network is acceptable given the "buttery smooth" goal, but surface a retry/error path if the request actually fails (not designed here — ask before adding an error-toast pattern).
- `GET /expenses?category=<id|all>` — returns entries for History, ideally pre-sorted newest-first; grouping by day and per-day subtotal can be computed client-side from the flat list (see `mkGroups`-equivalent logic in the source files) or server-side, developer's call.
- No edit/delete endpoints needed for v1 (View-only history, by explicit decision).

## Design Tokens

**Colors:**
| Token | Hex | Usage |
|---|---|---|
| Page background | `#010304` | outer page bg (`oklch(9% 0.01 250)`) |
| Surface / card background | `#05080C` | phone frame / screen bg (`oklch(13% 0.012 250)`) |
| Tile default | `#0F141A` | unselected chip/tile bg (`oklch(19% 0.014 250)`) |
| Tile hover | `#151B22` | hover state (`oklch(22% 0.016 250)`) |
| Accent (primary) | `#8393FF` | buttons, selected states, links (`oklch(70% 0.16 275)`) — also used at 16% opacity (selected tile bg) and 60% opacity (selected tile border) |
| Success | `#26CB96` | confirmation checkmark |
| Error/validation hint | `#F87966` | invalid-save shake + helper text |
| Text primary | `#F3F5F8` | headings, amounts |
| Text secondary | `#C9CED4` | body/labels |
| Text muted | `#646A70` | captions, helper text |
| Text faint | `#595E64` | least prominent labels |
| Border default | `rgba(255,255,255,0.08)` | card/tile borders |
| Category — Rent | `#D76A5A` | avatar bg |
| Category — Food | `#3AA85B` | avatar bg |
| Category — Transport | `#2783D5` | avatar bg |
| Category — Subscriptions | `#8F68CB` | avatar bg |
| Category — Entertainment | `#E1505A` | avatar bg |
| Category — Other | `#555F69` | avatar bg |

**Typography:** Manrope (400/500/600/700/800) for all UI text; Space Mono (400/700) for all numeric amounts (the $ amount entry, subtotals, row amounts, detail-sheet total). Both loaded from Google Fonts.

**Spacing/radius scale observed:** 8-14px gaps between grid/flex siblings; 12-18px border-radius on cards/tiles/inputs; 20px pill radius on the date button and filter chips; bottom sheets use 24px top corners.

**Motion:** calendar/detail sheets slide up ~250-280ms `cubic-bezier(0.32,0.72,0,1)`; confirmation fades+scales in ~200-250ms ease; invalid-save shake ~400ms.

## Assets
- **App icon**: `source/icons/icon-192.png` and `icon-512.png` — generated placeholder mark (dark rounded square, accent-purple card, "$" glyph). Fine as a starting point; consider a designed wordmark/logo before shipping.
- **Category icons**: NOT yet supplied — the design uses a droppable image-slot placeholder per category tile in the prototype (empty by default). The real app needs 6 actual icon assets (simple line/glyph icons matching the palette above) for Rent, Food, Transport, Subscriptions, Entertainment, Other. History screen currently uses plain letter-initial avatars (R/F/T/S/E/O) instead — decide whether History should adopt the same icon set for consistency.
- **PWA manifest**: `source/manifest.json` — name, icons, `display: "standalone"`, theme/background color `#05080C`. Both screens' `<head>` include `apple-mobile-web-app-*` meta tags and `rel="manifest"`/`rel="apple-touch-icon"` links — carry these over (or their platform equivalent) so the real app installs full-screen with no browser chrome.

## Files
- `source/Expense Quick Log.dc.html` — Quick Log screen, fully interactive reference (open directly in a browser).
- `source/History.dc.html` — History screen, fully interactive reference.
- `source/manifest.json` — PWA manifest reference.
- `source/icons/` — placeholder app icons.
