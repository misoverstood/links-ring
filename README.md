# links-ring

Shared footer ring for my personal sites. One file, `ring.js`, loaded by every site.

## Use on a site

```html
<nav class="links-ring" data-links-ring aria-label="My other sites"></nav>
<script src="https://misoverstood.github.io/links-ring/ring.js" defer></script>
```

Each site styles `.links-ring` itself. The current site gets `aria-current="page"`.

## Edit

- Add a site: append it to `SITES` in `ring.js` (fixed order, new sites at the end)
- Switch format: set `MODE` to `"list"` or `"ring"`
- Changes reach every site within about 10 minutes (GitHub Pages cache)
- teli.ca is deliberately not in the ring