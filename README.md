# BIBIBOP Nutrition Calculator

Production-ready independent nutrition calculator for `bibibopnutritioncalculator.pro`. The homepage statically renders a complete 62-row official-PDF dataset, interactive bowl calculator, original explanatory content, FAQ structured data, and nutrition table. Small Cloudflare Pages Functions deliver contact and newsletter forms through Resend, with optional Turnstile verification when keys are configured.

## Stack

- Next.js App Router with TypeScript strict mode and static export
- React client islands for the calculator, filters, menu, and forms
- Tailwind CSS 4 build pipeline plus a small custom design system
- Vitest and Testing Library for unit and component checks
- Playwright for critical browser flows
- Cloudflare Pages static hosting and Pages Functions
- Resend HTTP API and Cloudflare Turnstile for forms

## Structure

```text
src/app/                     Routes, metadata, static SEO files
src/components/calculator/   Browser-only calculator interface
src/components/content/      Table and reusable content shell
src/components/forms/        Contact and newsletter clients
src/components/layout/       Header and footer
src/config/                  Domain, source version, dates, routes
src/data/                    Typed nutrition rows and conflicts
src/lib/                     Calculation logic
functions/api/               Cloudflare Pages form handlers
public/                      Brand SVGs, headers, redirects, security.txt
tests/                       Vitest validation
e2e/                         Playwright flows
scripts/                     Build-blocking dataset verification
```

## Local setup

Node.js 22 is required.

```bash
nvm use
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

### Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run verify:data
npm run build
npm run test:e2e
npm run preview
```

`npm run build` runs the dataset verifier first and writes the static export to `out/`. For browser tests, install the Chromium runtime once with `npx playwright install chromium`.

## Nutrition data maintenance

The only calculator dataset is `src/data/bibibop-nutrition.ts`. Its source URL and version metadata live in `src/config/site.ts`. Do not combine values from the official webpage and PDF, average conflicts, or replace an official token with an invented exact number.

When a new official PDF appears:

1. Follow `DATA_UPDATE_CHECKLIST.md`.
2. Compare all rows and the allergen matrix as one version.
3. Update the central data file, source config, source-conflict notes, methodology explanation, and version-history card.
4. Preserve `<1` as `less-than` and `N/A` as `not-available`.
5. Run the complete test and build sequence.

The verifier prints total rows, category counts, duplicate status, missing-field status, and data-version information. It fails the production build on structural errors.

## Adding content later

### Blog posts

Create a real route below `src/app/blog/` only after an original, source-checked article is ready. Wrap the article in `src/components/content/BlogPostTemplate.tsx`; it automatically links M. Arsalan, adds the reusable author box, and emits Article author schema. Add the published summary to `src/data/blog-posts.ts`, add crawlable archive entries, change the blog metadata from `noindex, follow` to indexable, and add `/blog/` to `publicRoutes` in `src/config/site.ts` so it enters `sitemap.xml`. Do not remove noindex for an empty archive.

### Additional calculators

Add each tool with a complete typed data source, methodology, tests, and useful landing content. Once the hub contains useful additional tools, remove its noindex setting and add `/nutrition-calculators/` to `publicRoutes`.

## Cloudflare Pages deployment

This is a static-export Pages project with small Pages Functions. It is not an SSR Next.js Worker.

Use these exact Pages settings:

- Framework preset: **Next.js (Static HTML Export)**
- Production branch: **main**
- Build command: **`npm run build`**
- Build output directory: **`out`**
- Root directory: repository root
- Node version: **22**

The newer Workers Git deployment screen can use:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

`wrangler.jsonc` and `worker/index.ts` make that exact newer Workers command functional: the worker runs first only for `/api/*`, while Cloudflare Static Assets serves the exported site. For a classic Pages project, use the `out` directory and repository-level `functions/` directory. Both deployment paths use the same validated form handlers and keep the Next.js site static.

### Connect GitHub

1. Create a Cloudflare Pages project and connect this GitHub repository.
2. Select `main`, use the settings above, and save the first deployment.
3. Add all production secrets and public build variables before testing forms.
4. Repeat non-secret public settings for Preview if preview form testing is desired.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Secret Resend API token, server only |
| `CONTACT_TO_EMAIL` | Set to `contact@bibibopnutritioncalculator.pro` |
| `CONTACT_FROM_EMAIL` | Verified sender, for example `Website <forms@bibibopnutritioncalculator.pro>` |
| `TURNSTILE_SECRET_KEY` | Optional secret Turnstile verification key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional public widget key embedded at build time |
| `SITE_URL` | `https://bibibopnutritioncalculator.pro` |

Set secrets in Cloudflare rather than committing `.env.local`. The client never receives the Resend key or Turnstile secret. If required Resend or email values are missing, the form endpoint returns 503 instead of pretending delivery succeeded.

### Resend and email

1. Create the `contact@bibibopnutritioncalculator.pro` mailbox with an email host. Cloudflare Pages does not create an inbox.
2. Add and verify the sending domain in Resend, including the requested DNS records.
3. Create a Resend API key and set the sender and destination variables.
4. Send a test from production and confirm HTML, plain text, Reply-To, and failure behavior.

Newsletter signups are emailed to the same inbox for manual retention. This is explicitly not described as double opt-in.

### Turnstile

Turnstile is optional. The forms retain origin checks, field validation, maximum lengths, and honeypot protection without it. To enable Turnstile:

1. Create a Turnstile widget for the apex domain and any preview testing hostname.
2. Add the public site key as a build environment variable and the secret as a runtime secret.
3. Redeploy because `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is embedded during the static build.
4. Test valid, expired, and missing tokens. Server-side verification is mandatory.

### Custom domain and HTTPS

1. Add `bibibopnutritioncalculator.pro` under the Pages project's Custom Domains.
2. Confirm the DNS record is active and Cloudflare has issued HTTPS.
3. Add `www.bibibopnutritioncalculator.pro` to Cloudflare and verify the `_redirects` rule sends it to the apex with a 301. If the zone does not route `www` to Pages, add an equivalent Cloudflare Redirect Rule.
4. Check the canonical, sitemap, security headers, form endpoints, and `/.well-known/security.txt` on production.

## Security notes

The Pages Functions accept only POST JSON, enforce maximum lengths, validate email and consent, reject disallowed origins, use a honeypot, verify Turnstile server-side when configured, escape HTML email content, send a plain-text alternative, and expose no server secret to browser code. No analytics or advertising scripts are included. Cloudflare-compatible headers are defined in `public/_headers`.

The CSP permits the exact Turnstile script, frame, and connection origin and allows inline Next.js bootstrap code required by static hydration. Re-test the policy after upgrading Next.js or adding any third-party resource. No implementation should be described as perfectly secure.

Run `npm audit` during dependency updates and review findings in context. Keep Node, Next.js, and Pages tooling patched.

## Troubleshooting

- **Form returns 503:** one or more server environment variables are missing.
- **Turnstile fails on preview:** add the preview hostname to the widget and ensure the preview environment has keys.
- **Resend returns an error:** verify the sending domain, From address, API key, and DNS records.
- **Functions are 404:** confirm the deployment is a Pages project built from the repository root and includes the top-level `functions/` directory.
- **Dataset build fails:** run `npm run verify:data`, correct the reported count or field, and do not bypass the check.
- **Static export fails:** remove runtime-only Next.js features such as Server Actions, cookies, dynamic request APIs, or Node API routes.

## Legal and trademark note

This project is independent and is not affiliated with or endorsed by BIBIBOP Asian Grill. BIBIBOP and related marks belong to their respective owner. Names are used descriptively to identify publicly available nutrition data. The project uses an original logo, illustrations, layout, and written content. Nutrition output is informational and not medical advice or an allergy-safety guarantee.
