<!-- BEGIN OHMS-GLOBAL (synced 2026-08-11; edit ~/AGENTS.md, not this block; re-sync replaces between markers) -->
## Global agent contract
Read `~/AGENTS.md` (Claude Code: same core in `~/.claude/CLAUDE.md`, auto-loaded) before working here. In force: questions are read-only; label options A/B/C; stop points are hard; problem-first writeups; `<model> via <harness>` trailer on commits/PRs; reports from real output (no template defaults); no parity claims without a diff; claims stated at the level verified (green tests are not evidence for a user-facing claim); verification runs once per unchanged tree; subagents return a verdict by ~20 tool calls / ~8 minutes; PID discipline (stop only what you started); disk budget (no deleting outside this repo/worktree; two ENOSPC strikes = stop and report); never mutate global system/tool config to pass a build; Silo invariants (MAS review-clean, Editorial Dark, ohmslaw.net privacy claims stay true); hit every surface before calling app work done. Repo-specific rules below override where they conflict.
<!-- END OHMS-GLOBAL -->

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **meshtastic-atak-reference** (25 symbols, 19 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "master"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/meshtastic-atak-reference/context` | Codebase overview, check index freshness |
| `gitnexus://repo/meshtastic-atak-reference/clusters` | All functional areas |
| `gitnexus://repo/meshtastic-atak-reference/processes` | All execution flows |
| `gitnexus://repo/meshtastic-atak-reference/process/{name}` | Step-by-step execution trace |

<!-- gitnexus:end -->