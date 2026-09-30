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

## Replacement hosting and domain connection, still pending

The proposed destination is a separate Firebase Hosting site for this marketing
website within the existing Firebase project. Verify the cloud configuration and
approve a new site ID, Hosting target, static-root configuration, and release
process before creating anything. Preserve the existing Flutter Hosting site;
the marketing website must not overwrite it. No hosting purchase is proposed.

After approval, use that marketing site's custom-domain wizard to connect the
Squarespace-registered `neldo.app` and chosen `www` behavior. Enter the exact
verification TXT and routing records supplied by the selected site's wizard.
No GitHub or generic Firebase DNS addresses are proposed here. Review conflicting
Squarespace parking A, `www`, and HTTPS records as part of the approved connection.

Preserve Google Workspace MX, verification TXT, SPF TXT, and DKIM TXT records,
plus `_domainconnect`; do not delete the DNS zone or replace all records. Then
verify apex/`www` behavior, HTTPS, all localized/legal links, and inbound/reply
delivery for `support@neldo.app` before release. Redirecting the old domain
requires a separate approved plan. Firebase, DNS, account changes, deployment,
pushes, PRs, and merges remain subject to the owner's explicit authorization.
