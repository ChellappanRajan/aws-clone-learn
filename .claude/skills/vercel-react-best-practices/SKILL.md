---
name: vercel-react-best-practices
description: Vercel and React best practices for building and reviewing Next.js App Router code in this repo. Use when writing or reviewing components, data fetching, caching, routing, Server Actions, performance, or deployment-related code in this Next.js project.
---

# Vercel / React Best Practices

Guidance for writing idiomatic, performant Next.js (App Router) + React code in
this repo, aligned with Vercel's recommended patterns.

## Component model

- Default to **Server Components**. Only add `"use client"` when a file needs
  interactivity, browser-only APIs, React state/effects, or a client-only
  library.
- Keep client components small and push them as deep (leaf-level) in the tree
  as possible — wrap only the interactive part, not the whole page/layout.
- Never import a Server Component into a Client Component file; instead pass
  server-rendered content down via `children`/props (composition pattern).
- Don't fetch data in Client Components with `useEffect` when it can be
  fetched on the server and passed down as props.

## Data fetching & caching

- Fetch data where it's used (co-locate `fetch` calls in the component that
  needs it) — Next.js dedupes identical requests automatically.
- Fetch in parallel, not in a waterfall: start independent `fetch`/data calls
  before `await`-ing them, or use `Promise.all`.
- Be explicit about caching intent on every `fetch`:
  - `cache: 'force-cache'` (default) for static/shared data.
  - `next: { revalidate: <seconds> }` for time-based ISR-style revalidation.
  - `cache: 'no-store'` only for genuinely per-request/dynamic data.
- Prefer `revalidatePath`/`revalidateTag` (tag fetches with `next: { tags: [...] }`)
  over blanket `no-store` when data changes on mutation.
- Use `<Suspense>` boundaries + streaming to avoid blocking the whole route on
  the slowest data dependency.

## Routing & layouts (App Router)

- Use `layout.tsx` for shared UI/state that must persist across navigations;
  don't re-fetch layout-level data in every page.
- Add `loading.tsx` for route-level Suspense fallbacks and `error.tsx` for
  segment-level error boundaries instead of ad-hoc try/catch UI.
- Use route groups `(group)` and parallel/intercepting routes only when the
  URL structure genuinely calls for it — don't add routing complexity for
  purely visual composition (a plain component is simpler).
- Generate metadata via the `metadata` export or `generateMetadata`, not by
  manually mutating `document.title`.

## Server Actions & mutations

- Use Server Actions (`"use server"`) for form submissions/mutations instead
  of hand-rolled API routes when the client is a Next.js app.
- Validate and re-authorize on the server inside the action — never trust
  client-supplied IDs/roles.
- After a mutation, call `revalidatePath`/`revalidateTag` (or `redirect`) so
  the UI reflects the new state; don't rely on client-side cache hacks.
- Keep Server Actions small and colocated with the feature that uses them.

## Performance

- Use `next/image` for all images (automatic sizing, lazy loading, format
  negotiation) instead of raw `<img>`.
- Use `next/font` for web fonts to self-host and avoid layout shift; don't
  load fonts via a `<link>` to an external CDN.
- Code-split heavy, non-critical, or client-only widgets with
  `next/dynamic` (`ssr: false` only when the module truly can't run on the
  server, e.g. it touches `window` at import time).
- Avoid large client bundles: check `import` cost before pulling in a heavy
  library into a Client Component; prefer a server-rendered equivalent when
  one exists.

## React fundamentals

- Follow the Rules of Hooks — don't call hooks conditionally or in loops.
- Give list items a stable, unique `key` (not array index, unless the list is
  static and never reordered).
- Don't reach for `useMemo`/`useCallback`/`React.memo` preemptively; add them
  only after a measured re-render cost, since they add complexity and can
  themselves cost more than they save.
- Lift state only as high as the components that actually need it — avoid
  global state for data that's local to one subtree.
- Prefer derived values computed during render over syncing state with
  `useEffect`.

## TypeScript & correctness

- Keep `strict` TypeScript on; type `fetch` responses and Server
  Action inputs explicitly rather than `any`.
- Type props explicitly for exported components; avoid implicit `any` in
  event handlers.

## Deployment (Vercel)

- Keep secrets in environment variables, never hard-coded; prefix
  browser-exposed vars with `NEXT_PUBLIC_` deliberately, and keep everything
  else server-only.
- Choose the Node.js runtime by default; only opt into `export const runtime
  = 'edge'` for routes that need low-latency global execution and don't use
  Node-only APIs.
- Keep build output small: avoid importing server-only SDKs into code paths
  that are part of the client bundle.

## Accessibility

- Use semantic HTML elements before reaching for ARIA attributes.
- Ensure interactive elements are keyboard-operable and have visible focus
  states; don't strip default focus outlines without replacing them.
- Provide meaningful `alt` text for `next/image` (empty `alt=""` only for
  purely decorative images).
