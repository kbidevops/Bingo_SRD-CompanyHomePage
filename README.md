# Bingo_SRD-CompanyHomePage

Static website for BingoCVM company pages.

## Run locally

From the project root:

```bash
npx http-server . -p 5500 -c-1
```

Then open:

```text
http://localhost:5500/
```

## Language support (Korean / English)

This project now supports shared bilingual UI in common includes.

- Language switch button: top navigation (`KR/EN` toggle)
- Shared translations: navigation + footer
- Persistence: selected language is stored in `localStorage` (`siteLanguage`)

### Key files

- `js/i18n.js`: translation dictionary and language switching logic
- `includes/header.html`: translatable nav labels + language toggle button
- `includes/footer.html`: translatable footer labels/content
- `js/nav-toggle.js`: mobile menu aria labels respond to selected language

### Add more English translations

1. Add `data-i18n="your.key"` (or `data-i18n-aria-label`) on target element.
2. Add Korean and English entries for `your.key` in `js/i18n.js`.
3. Reload the page and switch language from the nav button.
