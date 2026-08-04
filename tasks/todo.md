# SnappyLedger Build — Todo

Full plan: `/Users/rabder/.claude/plans/spicy-pondering-kurzweil.md`. Each milestone must have its
browser check done before moving to the next — building this to learn React/Vite/TypeScript, so we
go one milestone at a time rather than racing to the end.

- [x] 1. Vite scaffold (react-ts) + hello world
- [x] 2. Design tokens + static shell
- [x] 3. Supabase client + env setup (+ verify RLS on `logs`)
- [x] 4. Auth screen (Supabase Auth)
- [x] 5. Category data fetching + shared `CategoryIcon`
- [x] 6. Quick Log static layout
- [x] 7. Quick Log validation (sanitize, shake, helper text, success overlay)
- [x] 8. Calendar sheet + date logic
- [x] 9. Swipe-up gesture (independent from tap handler)
- [x] 10. Real Supabase insert (explicit `category_id`/`user_id`)
- [x] 11. History screen (grouping, filters, detail sheet)
- [x] 12. Navigation + polish pass
- [x] 13. PWA manifest/installability

## Review

All 13 milestones complete — SnappyLedger is built, deployed to Vercel, and installed as a PWA.

**Deliberate deviations from the original written plan:**
- Categories are ordered client-side by a fixed array (`CATEGORY_ORDER` in `src/lib/api/categories.ts`) rather than relying on DB row order, which Postgres doesn't guarantee without an explicit `ORDER BY`.
- Milestone 11's `fetchLogs` returns raw `LogEntry[]` and joins to categories client-side in `HistoryScreen`, rather than using Supabase's relational embed (`select('*, categories(...)')`) — that requires a foreign-key relationship between `logs` and `categories`, which doesn't exist (see the standing risk below). Category filtering is also client-side rather than re-querying per filter tap.
- Screen navigation (`BottomTabBar` → `activeScreen` state in `App.tsx`) was pulled forward from milestone 12 into milestone 11, since there was no way to reach/test the History screen otherwise.
- `QuickLogScreen`/`HistoryScreen` both need `overflow: hidden` on their root container — discovered as a real bug post-milestone-13 (translated-but-"closed" sheets, like the calendar sheet, were still expanding the page's scrollable area on mobile, making them reachable by scrolling even while visually off-screen).

**Still open, deliberately deferred (see `tasks/risks.md`):**
- `logs.category_id`/`logs.user_id` DB defaults (`gen_random_uuid()`) were never fixed — the app always explicitly passes both on insert as the mitigation, but the underlying DB-level footgun is still there if that discipline is ever dropped.
- No foreign-key constraint between `logs.category_id` and `categories.id` — this is also *why* the client-side-join approach above was necessary instead of the plan's original relational-embed design.
- No automated tests beyond the pure utility functions (`amountSanitize`, `groupLogsByDay`) — no component/e2e tests, per the plan's explicit v1 scope.
- No offline/service-worker caching — the PWA installs and runs standalone but requires network connectivity (Supabase-backed, no local cache).
