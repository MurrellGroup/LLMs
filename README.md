# Large language models

A 30-minute academic talk for scientists from varied disciplines. The presentation uses sparse slides and click-controlled animations, with detailed speaker notes and linked primary sources.

## Present

The presentation is published at:

**https://murrellgroup.github.io/LLMs/**

You can also download this repository and open **`index.html`** directly in a modern browser. Keep the `assets` directory alongside it. The presentation needs no API key, external font, CDN, model connection, or network access. External reference links naturally require internet access.

| Control | Action |
| --- | --- |
| Space, Right Arrow, Page Down | Next reveal, then next slide |
| Left Arrow, Page Up | Previous reveal |
| Shift + Right / Left Arrow | Next / previous slide |
| Home / End | First / last slide |
| R | Replay the current slide |
| N | Toggle speaker notes |
| P | Open a separate presenter window |
| O | Slide index |
| F | Fullscreen |
| T / Shift + T | Start or pause / reset the elapsed timer |
| B / Escape | Blank the screen / close or unblank |
| ? | Help and references |

The bottom arrows work on a touch screen. Animations do not advance automatically and respect reduced-motion preferences. The presenter window synchronizes slide positions using the browser's local BroadcastChannel API. If a browser blocks pop-ups, allow one or use the in-page notes. Some browsers restrict cross-window synchronization for local `file:` URLs; the hosted Pages version uses a shared origin.

Append `?handout=1` for a reading view with all reveals visible. The Print slides command in the help panel prints every slide at its final reveal. Use a landscape layout and disable browser-added headers and footers. Direct links such as `#12.2` select slide 12, reveal 2.

## Configure GitHub Pages

1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions → Deploy presentation to GitHub Pages → Run workflow**, or push a change to `main`.

The workflow checks the content, exports the notes, packages the public files, and deploys the resulting artifact. It has the required `contents: read`, `pages: write`, and `id-token: write` permissions and uses the `github-pages` environment. Repository or organization deployment rules may still apply.

GitHub's setup instructions: [custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [selecting the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Talk structure

The 26 slides are timed to 30:00, excluding questions.

| Slides | Content |
| --- | --- |
| 1–4 | Neural networks as parameterized functions, loss, gradients, optimization |
| 5–9 | Autoregressive prediction, parallel training, corpus scale, political and mathematical examples |
| 10–13 | Transformer layers, query/key/value attention, vertical and lateral information flow, KV caching |
| 14–18 | Pretraining, instruction tuning, preference feedback, reasoning tokens, reinforcement learning |
| 19–23 | Actual AIME and IMO tasks, reasoning-RL progress, executable code checks, olympiad-level proofs |
| 24–26 | Reliable verification, new algorithmic results, experimental feedback, and uncertainty |

Read [SPEAKER_NOTES.md](SPEAKER_NOTES.md) for the timed script and animation cues, and [SOURCES.md](SOURCES.md) for sources and interpretation.

## Edit

- `assets/content.js`: slide copy, speaker notes, timing, and citations.
- `assets/foundation-scenes.js`: numerical prediction, squared error, gradient descent, and autoregressive generation.
- `assets/transformer-scenes.js`: layers, attention, information flow, and KV caching.
- `assets/diagrams.js`: shared diagram entry point.
- `assets/talk.js`: navigation, reveal state, presenter mode, timer, reading view, and printing.
- `assets/talk.css`: restrained academic slide layout and responsive controls.
- `index.html`: application shell.
- `.github/workflows/pages.yml`: GitHub Pages deployment.

No package installation is needed. With Node.js available:

```sh
node scripts/check.mjs
node scripts/export-notes.mjs
node scripts/build.mjs
```

The last command copies only the presentation's public files into the ignored `dist/` folder. It does not alter the source. Regenerate the Markdown notes after changing `assets/content.js` or diagram cues.

## Evidence and scope

The demonstrations are scripted teaching examples; they are not live model calls or fabricated records of model outputs. Attention weights, token boundaries, and the loss landscape are illustrative. Dated capability claims are separately attributed to the relevant research reports. The examples are selected historical milestones, not a current leaderboard.

The verification argument is a mechanistic interpretation, not a claim that human superiority is established in every unverified task or that only maths and coding can show exceptional performance. The talk distinguishes benchmark success, gold-medal-level performance, a new best-known construction, and real-world outcomes.

Sources were checked on 14 November 2026. The build checks content, all SVG states, local asset references, and the 30-minute timing.
