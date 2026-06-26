# Starter Notes

`component-contracts.ts` defines the recommended shared API.

Cursor should adapt it to the existing repository rather than blindly copy it.

Preferred basic submit implementation:

```tsx
<form action="/search" method="get" role="search">
  <label htmlFor="vibe-query" className="sr-only">
    Tell VibeVI what you are looking for
  </label>
  <textarea
    id="vibe-query"
    name="q"
    defaultValue={defaultQuery}
    placeholder="Ask anything... beaches, boat trips, romantic dinners, rainy day ideas..."
  />
  <button type="submit" aria-label="Find the move">
    ...
  </button>
</form>
```

Keep basic search functional without JavaScript where possible.

Do not build a fake message transcript in v1.
