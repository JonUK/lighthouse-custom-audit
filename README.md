# Lighthouse custom audit
An example of a Lighthouse custom audit that checks DOM elements.

This repository contains a Lighthouse custom audit to check for the well known web accessibility issue of adding a click handler to a non-interactive element and not ensuring it’s accessible for keyboard and screen reader users.

The following article accompanies this repository.
https://keepinguptodate.com/pages/2021/08/custom-lighthouse-audit/

Run the static server for the test HTML page
```bash
npm run serve
```

Run the custom audit aginst the test HTML page
```bash
npm run lighthouse
```

---

![Lighthouse report summary](https://keepinguptodate.com/pages/2021/08/lighthouse-report-summary.png)

![Lighthouse-custom-section-results](https://keepinguptodate.com/pages/2021/08/lighthouse-custom-section-results.png)
