# Migration status

Approved source pages: `/live/G3qb9rNEOJ/2`, `/company-1`, `/service-1-1`.

| Old URL | New URL | Handling |
|---|---|---|
| / | / | HOME updated |
| /2 | / | 301 |
| /company | /company | Preserved |
| /company-1 | /company | 301 |
| /service-1 | /service-1 | Preserved |
| /service-1-1 | /service-1 | 301 |
| /news | /news | Preserved |
| /posts/yhkUsFJl | same | Preserved |
| /posts/smartcity-release | same | Preserved |
| /posts/jFh5vRTe | same | Preview article retained |
| /contact | /contact | Fields preserved |
| /thanks | /thanks | Standalone completion page |
| unmatched | /404 | Cloudflare static 404 |

Contact has three required fields (Name, Email, Message), with no consent checkbox on the observed source. New endpoint validates lengths, email, same-origin, and a honeypot; provider setup and stronger anti-spam configuration remain necessary before production. Never submit real personal data to the preview before this is completed.

The first layout implementation preserves original responsive CSS and original photos. The original Japanese commercial webfonts are replaced with system Japanese fonts. Astro ClientRouter and CSS view transitions provide navigation; their direction/timing is provisional until compared to source motion. IntersectionObserver uses source element delays/durations. Reduced motion is supported.

Domain cutover, only after explicit owner approval: record current DNS; test preview including mail delivery; add pass-support.com in Pages custom domains; apply only Pages-specified records, preserving MX/TXT/email records; verify HTTPS and redirects; remove preview noindex and generate canonical sitemap; keep Studio available for rollback until confirmed. Do not cancel Studio as part of deployment.
