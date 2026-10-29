# Opony Mateczny – website

Static rebuild of http://oponymateczny.pl (old WordPress site). Built with [Eleventy](https://www.11ty.dev/),
hosted on GitHub Pages (free, automatic HTTPS), editable by the owner through [Pages CMS](https://pagescms.org).
No cookies, no analytics, no third-party requests, so no cookie banner is needed.

## Run locally

```bash
npm install
npm start        # http://localhost:8080, reloads on change
npm run build    # writes the finished site to _site/
```

Requires Node.js 20+.

## Where the content lives

| What | File |
|---|---|
| Phones, e-mail, address, opening hours | `src/_data/site.json` |
| Home page tiles, strengths, directions | `src/_data/home.json` |
| Price list | `src/_data/prices.json` |
| New-tyre offers (name, size, price, photo) | `src/_data/tires.json` |
| Text pages (O firmie, Opony używane, Opony nowe, Cennik) | `src/strony/*.md` |
| Photos | `src/images/` |
| Look and feel | `src/css/style.css`, `src/_includes/*.njk` |

`.pages.yml` describes these files to Pages CMS, so the owner gets forms instead of raw JSON.

## Publish

1. Create a **public** GitHub repository (GitHub Pages is free only for public repos; there are no secrets in here).
2. Push:
   ```bash
   git remote add origin https://github.com/<your-user>/<repo>.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages → Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml`
   builds and deploys on every push to `main`. The preview URL is `https://<your-user>.github.io/<repo>/`.
4. Check the preview, then continue with *Switching the domain*.

## Let the owner edit (no code)

1. Brother creates a free GitHub account.
2. Repo → **Settings → Collaborators** → add him with write access.
3. He opens https://app.pagescms.org, signs in with GitHub, installs the Pages CMS app on this repo
   and picks it. The forms are defined in `.pages.yml`. Every save is a commit; the site rebuilds in 1–2 minutes.

Polish instructions for him are in `INSTRUKCJA.md`. Pages CMS config was written from its docs
and could not be tried against a real account here, so do a test edit first.

## Switching the domain (when the preview is approved)

DNS is currently served by `rgb365.eu` (the hosting). Change these records **there**:

| Record | Value |
|---|---|
| `A` for `oponymateczny.pl` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (check GitHub's current list in its custom-domain docs) |
| `CNAME` for `www` | `<your-user>.github.io` |

Leave the `MX`, `SPF` (`TXT`) and `mail` records alone if the mailbox on the domain is in use.
Then repo → **Settings → Pages → Custom domain** = `oponymateczny.pl` (the `CNAME` file is already in the repo)
and tick **Enforce HTTPS** once the certificate is issued (can take up to an hour).

Only after that is verified should the old hosting and domain arrangements be cancelled or moved.
The domain registration is a separate matter (registrar: Digital Media Technology Sp. z o.o., renews 2027-04-20).

## Content to confirm with the brother

- **Opony nowe prices** (179, 155, 180, 176 zł) come from the 2016-era site. Update or remove them before going live.
- **Przechowalnia** price: the old home page said 50 zł for 4 tyres, the old Cennik said "od 100 zł". The new site uses 100 zł everywhere.
- **Storage periods**: the old text said "od 1.X do 30.IV i od 1.III do 31.XI" (there is no 31 November). It now says 1.III–30.IX; confirm.
- **"Ponad 20 lat"** replaces "20 lat" (the old text dates from 2016).
- **"Nasze atuty"** was lorem ipsum; the three texts are drafted from the rest of the site.
- **Photos** (tyres, woman among tyre stacks, Kraków at night) look like stock images bought by the original web designer.
  Check the licence is OK to keep using, or swap them in `src/images/`.
- Typos from the old text were fixed (e.g. "Konopmickiej", "standartowe", "ofreta").
