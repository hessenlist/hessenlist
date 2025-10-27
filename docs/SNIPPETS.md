# Useful Snippets

## Fetch companies (server)
```ts
const { data, error } = await supabase.from("companies").select("*");
```

## Compute Activity Index (fallback)
```ts
computeActivityIndex(!!c.answered, c.tta_hours, !!c.contactable);
```

## Client search clear
```ts
onKeyDown={(e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    setQ("");
  }
}}
```
