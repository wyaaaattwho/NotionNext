# Impression theme fonts

This directory contains self-hosted WOFF2 subsets of two freely licensed fonts:

- **Newsreader**, copyright 2020 The Newsreader Project Authors. Source: [Production Type / Newsreader](https://github.com/productiontype/Newsreader) and [Google Fonts distribution](https://github.com/google/fonts/tree/main/ofl/newsreader). Normal and italic variable fonts include the optical-size axis (`opsz` 6–72) and weight axis (`wght` 200–800).
- **Noto Serif SC**, copyright 2012 Google Inc. Source: [Google Fonts distribution](https://github.com/google/fonts/tree/main/ofl/notoserifsc). Simplified Chinese variable subsets include the weight axis (`wght` 200–900).

Both fonts are distributed under the **SIL Open Font License 1.1**. Their copyright notices and full licenses are included as `newsreader-OFL.txt` and `notoserifsc-OFL.txt`.

The binaries were downloaded, without modification, from the Google Fonts WOFF2 distribution on 2026-10-08. Newsreader version v26 includes Latin, Latin Extended, and Vietnamese subsets; Noto Serif SC version v36 includes the complete 101-subset Unicode distribution. The theme declares their Unicode ranges in `themes/impression/fonts.js`. A browser downloads only the subsets used by the displayed text, rather than the entire Chinese character set. Runtime requests are served by this repository, without a dependency on Google Fonts connectivity.

Together the 107 WOFF2 assets total 6,547,160 bytes (6.24 MiB). The default Latin normal face is 132,000 bytes; the italic Latin face is 146,872 bytes. Font faces expose weights 400–700 for the theme, and Newsreader uses automatic optical sizing in CSS.

Microsoft AI's `Bradford LL` typeface was consulted as a visual reference. No Microsoft or proprietary typeface assets are distributed here.
