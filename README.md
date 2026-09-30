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

`CNAME` deliberately still contains `navu.life`: it records the current GitHub
Pages custom domain. The owner has rejected GitHub as the replacement website
host; GitHub remains the source repository. Merging to `main` currently triggers
GitHub Pages publication, so review Pages disablement or the approved export
process before any push or merge. This source is a review candidate, not a
completed domain migration. No hosting or DNS settings have been changed.

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

## Selected hosting and domain connection, still pending

The owner selected Cloudflare Pages Free for this static marketing website.
Firebase remains the app backend/hosting provider; do not create a Firebase
marketing site or deploy the website to its existing app site. No hosting plan
purchase or paid Functions/Workers add-on is part of this release.

The reviewed direct-upload artifact has 26 files with `index.html` and `404.html`
at its root. It contains no Functions folder, `_worker.js`, secrets, CNAME,
backend, or app build. No build step or custom headers/redirect rules are required.
Pages serves the legal HTML pages and redirects `.html` requests to their clean
paths; the existing root 404 preserves missing-page behavior. See [Pages routing](https://developers.cloudflare.com/pages/configuration/serving-pages/).

Use the authenticated owner Cloudflare dashboard's Workers & Pages → Create
application → Pages → Direct Upload / drag and drop flow. Upload the reviewed
ZIP as-is, choose the Free plan, and verify the supplied `pages.dev` address
before connecting the domain. The dashboard's security challenge currently
blocks the parent's session; the owner must finish normal account access.
No account or live site was created from this execution environment. See
[Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

To serve `neldo.app` directly, add it under the Pages project's Custom domains.
Cloudflare requires the apex to be an active zone in the same account with
Cloudflare nameservers. Domain registration stays at Squarespace. Before the
separately approved nameserver switch, copy and compare all existing Google
Workspace MX, verification TXT, SPF TXT, DKIM TXT and `_domainconnect` records;
DNS scanning alone is not verification. Use the actual assigned nameservers
and Pages CNAME, and retire only conflicting parking web records/HTTPS hints
as reviewed. Verify DNS, HTTPS, localized/legal links and support mailbox
delivery after the switch. The old `navu.life` redirect remains separate.
[Cloudflare custom-domain guidance](https://developers.cloudflare.com/pages/configuration/custom-domains/).

[Cloudflare pricing](https://developers.cloudflare.com/pages/functions/pricing/)
states that static asset requests are free and unlimited when no Function is
invoked. This artifact invokes none. Existing domain, Google Workspace and app
costs are separate. Source pushes/PRs/merges and app release remain separately
gated; direct upload does not require changing GitHub Pages or CI credentials.
