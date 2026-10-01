# Neldo website

This repository contains the static public website: root HTML, local styles and
JavaScript, and bundled images/fonts. It has no build step, backend, analytics,
account form, or provider calls. The Flutter app is maintained separately in
`josephdevteam-max/navu-mvp`.

GitHub Pages currently publishes this repository's root on `main` at
`https://navu.life`. The confirmed website baseline is
`369e5cba7e96b3f978915d359c7cf471fcbe012f`; its Pages build/deployment completed
successfully in [run 36338500758](https://github.com/josephdevteam-max/navu-life/actions/runs/36338500758).
Earlier `navu-mvp/site/` and `navu-mvp/docs/` hosting instructions are legacy
copies, not the current public website source.

## Prepared rebrand and release coordination

The isolated rebrand changes visible copy, all three supported website languages,
legal drafts, accessibility text, metadata, and contact links to Neldo. Canonical
URLs and social metadata target `https://neldo.app`. The owner reports that
`support@neldo.app` exists in Google Workspace; delivery has not been independently
verified. The existing prelaunch, provider-verification, and app-release qualifiers
remain in place.

`CNAME` deliberately still contains `navu.life`: it preserves the existing
GitHub Pages custom-domain connection until the parent reviews and approves a
coordinated switch to `neldo.app`. Canonical/social metadata targets the intended
new domain, but no redirect or domain setting has been changed. The owner has
cancelled the Cloudflare workflow and requested GitHub Pages publication.
Website code is reviewed separately from app/backend releases.

The website's existing N monogram remains applicable to Neldo. The active gallery
uses only an authentic, brand-free historical capture of ingredient gathering and
recipe details, available in both appearances. Captions and alt text identify that
it was recorded before the Neldo rename. The energy-mode explanatory cards remain;
the gallery and detailed preview describe the single available captured step
accurately. The full-image dialog and website appearance toggle remain functional.

Older assets with burned-in NAVU wordmarks retain their original filenames and
contents for provenance and existing links; the homepage does not display them.
Fresh, complete Neldo app captures still require the reviewed app candidate and
Flutter SDK. No screenshot was retouched or presented as a fresh app capture.

Technical `navu-content-change` events, `data-navu-*` attributes, repository paths,
and repository names remain compatible. Renaming them does not change the visible
brand and is outside this presentation change.

## Local verification

Run `python3 -m http.server 8861 --bind 127.0.0.1` from this repository, then open
`http://127.0.0.1:8861/`. No backend is required. English, Spanish, and Portuguese
are available through the language selector or `?lang=es` / `?lang=pt`.

Check JavaScript with `node --check website.js` and `node --check languages.js`.
The existing HTML/JS files use CRLF; use
`git -c core.whitespace=cr-at-eol diff --check` to preserve those line endings
without treating carriage returns as newly introduced whitespace errors.

Browser review should cover desktop, 390px and 320px, both appearances, all three
languages, energy-mode cards, ingredient/details preview, full-image dialog, mobile menu,
legal links, and image loading. Block external network requests during this local
review. Static and browser checks do not verify production DNS, HTTPS, mail
delivery, app-store release, native app operation, or provider behavior.

## GitHub Pages review and domain cutover

The Pages candidate is based on website main
`369e5cba7e96b3f978915d359c7cf471fcbe012f` and the tested Neldo static source.
Use the review branch `codex/neldo-github-pages` and a pull request targeting
`main`; do not push main directly or force-push. This candidate keeps the existing
root `.nojekyll` static layout and `CNAME` unchanged. It excludes the abandoned
Cloudflare build scripts and configuration. App/backend code and deployment are
not part of the website pull request.

GitHub's [Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
prohibit using Pages to run an online business, e-commerce, or a site primarily
facilitating commercial transactions or providing commercial SaaS. The current
14 HTML pages have no forms, signin, checkout, payment integrations or app/API
service. The launch section says public access is closed and core meal help is
free. However, this is product promotion and draft terms anticipate optional paid
services/marketplace offers. GitHub does not expressly exempt every business
marketing site; hosting eligibility remains uncertain. Review that purpose with
GitHub Support before treating Pages as confirmed production hosting. Do not
claim blanket permission based only on the absence of payment code.

The approximately 709 KB reviewed static site is below the published 1 GB size
limit. Pages has a soft 100 GB/month bandwidth limit and may rate-limit traffic;
it is not an unlimited hosting commitment. See the official limits above.

Read-only source/protection evidence: main has no active branch protection and
no repository rulesets at the time inspected, but this task still uses a PR for
review. Latest successful Pages jobs used main. The direct Pages-settings API
read was blocked with a Forbidden transport response; the available connector
does not support a Pages-settings endpoint. These are distinct from a confirmed
GitHub authorization denial. Parent must inspect authenticated Settings > Pages
for the actual source, folder and custom domain before any production merge.
Do not change settings merely to bypass an access restriction.

After website/purpose review, the parent coordinates production publication and
the separately approved domain switch. Keep `navu.life` configured until the
new DNS and HTTPS plan is ready. Preserve every Google Workspace MX/SPF/DKIM,
verification TXT and `_domainconnect` record at Squarespace; no nameserver move
is needed for normal GitHub Pages domain routing. Use current official domain
instructions and the exact account target rather than reusing Cloudflare values.
A `CNAME` change to `neldo.app`, GitHub custom-domain setting, DNS record edits and
HTTPS verification require parent coordination. The old-domain redirect plan
remains separate; neither domain behavior nor mail delivery is verified here.
