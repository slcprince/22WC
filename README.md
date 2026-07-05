# 2022 FIFA World Cup Showcase 🚧 Work in Progress

A small multi-page site covering the 2022 FIFA World Cup in Qatar — groups, knockout bracket, all 32 teams, and the tournament's stats & awards. Static HTML/CSS/JS, no build step, no dependencies.

**Status:** actively being built out. Functional and browsable, but not polished end-to-end — see the roadmap below.

---

## Live structure

| Page | File | What's on it |
|---|---|---|
| Overview | `worldcup2022.html` | Final scoreboard, podium (top 4), tournament stat strip |
| Groups | `groups.html` | All 8 groups, full standings (P/W/D/L/GF-GA/Pts) |
| Bracket | `bracket.html` | Round of 16 → Final, all 16 knockout matches |
| Teams | `teams.html` | All 32 nations with group, finishing stage, and a standout player moment |
| Stats & Awards | `stats.html` | Top 12 scorers (animated bar chart) + all 9 tournament awards |

Shared across every page:
- `wc-styles.css` — colors, type, layout, and all the animation keyframes
- `shared-layout.js` — injects the nav header + footer on every page, plus scroll-reveal, count-up numbers, and the scorer bar-chart animation

## Running it locally

No install needed — it's plain static files.

```bash
git clone https://github.com/yourname/your-repo.git
cd your-repo
# then just open worldcup2022.html in a browser, or serve it:
python3 -m http.server 8000
# visit http://localhost:8000/worldcup2022.html
```

## Data sources

- Results, standings, and award winners: FIFA / Wikipedia
- Flags: [flagcdn.com](https://flagcdn.com) (live-loaded, no local assets)
- Banner graphics: hand-built inline SVG (no external images, so nothing to break or 404)

## Roadmap / known gaps

- [ ] Full 23–26 player rosters per squad (currently: each team's standout player/moment only, not the full roster — a real dataset would be needed to do this accurately for all 32 teams)
- [ ] Swap hardcoded 2022 data for a live public football-data API, so future tournaments update automatically
- [ ] Mobile layout pass (bracket and group tables get cramped under ~380px)
- [ ] Accessibility pass on the knockout bracket (currently visual-only grouping, could use better semantic structure for screen readers)
- [ ] Dark/light theme toggle (currently dark-only, "night stadium" theme)

## Contributing / notes to self

This started as a single-file prototype and got split into the multi-page structure above — if you're picking this back up later, start from `shared-layout.js` to see how nav + animations are wired across pages before editing individual page files.
