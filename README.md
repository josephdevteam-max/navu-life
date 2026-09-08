# NAVU website

Public page for **https://navu.life**. Static HTML only. No app code, service code, or keys.

The cooking app lives in the private `navu-mvp` repo.

## Release status

Android is ready for release testing. iPhone support is planned for a future
release. Testing inquiries go to joseph.devteam@gmail.com; the
website does not promise immediate access or public app-store availability.

## Updated website preview

Based on live-site main commit `874d65d`, visually checked against navu.life on September 8, 2026. Homepage changes live in `index.html`, `website.css`, and `website.js`; the legacy `styles.css` remains untouched for privacy and error pages.

Run locally with `python -m http.server 8804 --bind 127.0.0.1`. No build step, API, analytics, or persistent theme storage. Dark appearance is the default; the header toggle switches the page and app captures together. Without JavaScript, the initial dark screenshots and all informational content remain available.

## Screenshot provenance

`assets/preview/` contains September 8 captures of the actual Flutter widgets in the NAVU feature branch, using in-memory example data. They are development previews, not new live service responses, native iOS captures, or proof of public release. The screenshot harness is `App/test/preview/capture_ui.dart` in navu-mvp. It captures the three modes by tapping their real UI controls. Dark/light pairs cover chat, meal, recipe, setup, Lowkey, and Locked In.

The bundled DM Sans font and OFL license come from the app. Historical Android screenshots remain available at their existing asset URLs, but are no longer the homepage showcase.

Saved meals stay on the device where they were saved. Screenshots do not imply account synchronization or store availability.

## Validation

- JavaScript syntax check passed.
- Actual browser review at desktop, 390px, and 320px; light and dark appearances.
- Mode buttons switch the matching screenshots and description; tour buttons switch the image, text, full-image link, and pressed state.
- Flutter capture run: 19 passed. Related all-meal/snack Flutter tests: 35 passed.
- No production deployment or merge performed. Release-status and contact copy preserved from the current live site.

## Allergy and diet limitations
Visible homepage guidance and a nearby showcase link require ingredient, label, substitution, and cross-contact checks. Suggestions are not guaranteed suitable; dietary preferences are not medical advice. Current meal/recipe captures include the app notice (navu-mvp 96fdaa6). No legal-immunity claim or consent waiver. App validation: 266 tests, 123 diet guard checks, 19 captures passed; analyzer has 75 informational findings, no errors or warnings.

