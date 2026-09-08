# Source-link resilience audit

Checked: 8 September 2026 (09:46 UTC)
Command: `node scripts/sourceaudit.mjs --check-links --json`

This is an availability and routing audit, not a claim that an HTTP response
proves a historical or folkloric assertion. Content claims still require the
repository's line-level witness notes, source roles and discrepancy records.

## Result

| Measure | Baseline | Current audit |
|---|---:|---:|
| Tale records / references | 47 / 172 | 47 / 179 |
| Lore cards / merged links | 176 / 693 | 176 / 698 |
| Corpus works / external links | 37 / 58 | 37 / 56 |
| Local corpus works / coverage edges | 23 / 150 | 23 / 150 |
| Distinct external URLs | 504 | 508 |
| Reachable | 443 | 457 |
| Access-controlled or bot-guarded | 42 | 41 |
| Server responded with another error | 1 | 1 |
| Temporarily unavailable to the checker | 18 | 9 |
| Definitive 404/410 | 0 | 0 |

The current inventory is broader than the baseline because quote-evidence and
extract-work URLs are now owned and probed alongside tales, lore and corpus
works. Seven redundant or superseded routes were consolidated onto sources
already evidenced in the repository; the dead PrizrenPress tortoise slug was
also replaced by the publisher's surviving canonical article route.

## Repairs made

- Repointed all uses of the repeatedly timing-out UPenn *High Albania* page to
  the Internet Archive's full 1909 book scan.
- Corrected two false Project Gutenberg attributions: ebook 45072 is *How We
  Robbed Mexico in 1848* and ebook 47554 is *Gypsies of the Air*, not Durham.
  Both now point to the verified Durham scan.
- Distinguished Durham's short 1910 article, “High Albania and its customs in
  1908,” from the full 1909 book instead of labelling the article scan as the
  book.
- Replaced the dead HTTPS Albanian Literature folklore route with the surviving
  HTTP author-site route and explicitly qualified the lack of HTTPS.
- Replaced expired-certificate mirrors for Barleti, Constantine/Dhoqina and
  Fishta with, respectively, an EEBO institutional record, the surviving author
  site, and an Internet Archive full-text witness.
- Replaced the timing-out Lambertz catalogue route with the full Internet
  Archive scan and canonicalised Kuteli's Open Library work URL.
- Added the checked local Constantine prose variant as a repository link; it is
  explicitly a variant, not a substitute for the selected Chameria ballad.

No primary witness was replaced with Wikipedia, and no citation was invented.

## What the checker now distinguishes

Every live result includes the records that own the URL. The checker retries a
failed `HEAD` request with `GET`, then separates:

- `broken`: only definitive HTTP 404 or 410;
- `guarded`: 401, 403, 406, 418, 429 or 451, with an access reason;
- `server-response`: other HTTP failures, kept separate from dead links;
- `unavailable`: transport failure, classified as timeout, connection reset,
  TLS/certificate, DNS or other network failure.

The JSON report includes the full guarded, server-response and unavailable
records instead of hiding the non-404 failures behind totals.

## Residual live-check findings

The final JSON run found no definitive dead URL. Its 9 unavailable URLs were:

| Classification | URLs | Interpretation |
|---|---:|---|
| Timeout | 7 | Seven archive, catalogue or reference routes did not answer within the audit window; none is proven dead. |
| Connection reset | 1 | One Open Library catalogue route closed the automated connection; retain it as a catalogue-level route. |
| TLS/certificate | 1 | One DOI route presented a certificate-chain error to Node; the entry retains other exact or institutional evidence. |

One route returned HTTP 500 in the latest run. Its entry retains other evidence,
so this remains an explicitly non-healthy institutional route rather than being
treated as a dead link.

The 41 guarded results were real HTTP responses—mainly 403s from institutions,
publishers and research databases that reject automated clients. They are
access-controlled, not evidence of link death. Because external behavior varies
by network and time, reruns may move URLs among reachable, guarded and
temporarily unavailable; only 404/410 is treated as definitively broken.
