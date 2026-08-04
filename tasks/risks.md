# Known Risks / Potential Bugs

Tracked issues we've deliberately deferred rather than fixed, so they don't get rediscovered
from scratch later.

## Supabase schema

### `logs.category_id` and `logs.user_id` default to `gen_random_uuid()`
- **Where:** `public.logs` table, columns `category_id` and `user_id`.
- **Issue:** Both columns are nullable with a default of `gen_random_uuid()`. If a row is ever
  inserted without explicitly passing one of these, it silently gets a random, unrelated UUID
  instead of erroring — the row looks like it saved successfully but is orphaned (points at no
  real category / no real user). No FK constraints currently enforce that the value references
  a real row in `categories` or `auth.users`.
- **Status:** Deliberately left as-is for now (2026-08-03). App code must always explicitly set
  both `category_id` and `user_id` on every insert — do not rely on the DB defaults.
- **Fix if revisited:** Drop the `gen_random_uuid()` default on both columns, set `NOT NULL`,
  add FK constraints (`category_id` → `categories(id)`, `user_id` → `auth.users(id)`), and default
  `user_id` to `auth.uid()` once Supabase Auth is wired up. See conversation history
  2026-08-03 for exact migration SQL.

### `categories.color` default has embedded quote characters
- **Where:** `public.categories` table, column `color` (`character varying`).
- **Issue:** Default was `'"#FFFFFF"'::character varying` — since the column is plain varchar,
  not jsonb, this stores the literal 8-character string `"#FFFFFF"` (with quotes) instead of the
  6-character hex value `#FFFFFF`. Any code using the raw value as a CSS color would break.
- **Status:** Corrected — default changed to `'#FFFFFF'::character varying`. Existing seeded rows
  should use plain hex values (e.g. `#D76A5A` for Rent, `#3AA85B` for Food, etc. — see design
  tokens in `design_handoff_expense_logger/README.md`).
