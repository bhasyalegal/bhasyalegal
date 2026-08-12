# Original statue model backup

`lady-justice-original.glb` is the untouched original model (15.1 MB,
2.36M vertices) that shipped before the mobile-quality/performance pass.

The live model at `public/models/lady-justice.glb` is now a simplified,
re-compressed version (3.3 MB, ~400K vertices) — visually verified against
this original via rendered comparisons at several simplification levels.
See the chat summary for details on what changed and why.

To revert to the original model, replace `public/models/lady-justice.glb`
with this file. This backup folder is NOT read by the app (it's outside
`public/` and `src/`) and can be deleted at any time without affecting the
site.
