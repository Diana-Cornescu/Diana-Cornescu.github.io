# Deferred features

Three features were rolled back off `dev` to simplify the current release. The
code for each is preserved here as a **re-add patch** — not a branch, so it
won't go stale as you keep editing the site. When you want a feature back in a
future release, apply its patch on top of whatever `dev` looks like then and
mend as needed.

| Patch | Brings back |
|-------|-------------|
| `about-strip.patch`   | The auto-scrolling image band on the About/index page |
| `gallery.patch`       | The Gallery tab (`gallery.html` + its nav link everywhere) |
| `project-pages.patch` | Per-project detail pages (`project.html`) + reverts the project cards from GitHub links back to internal detail links |

## Re-adding a feature later

From the repo root:

```bash
git apply --3way deferred/project-pages.patch   # pick the one you want
# ...resolve any conflict markers, test locally, commit
```

- Each patch applies **cleanly on its own** against the rolled-back code.
- `--3way` lets git merge around edits you've made since. Plain `git apply`
  works too if nothing nearby has changed.
- **Re-adding the Gallery and the About strip in the same pass** will conflict
  in `assets/app.js` — those two builders sat next to each other. Apply one,
  commit, then the other, or resolve the one conflict by hand.
- These patches live in the repo, so delete a patch file once you've merged it
  (or once you've decided a feature is gone for good).

## Notes

- **Project data was left untouched.** Every project's `details`, `images`,
  `github`, and `website` fields are still in `config.js` — only the *rendering*
  was removed, so re-adding is mostly wiring, not re-typing content.
- **One project has no GitHub link.** "Resume Auditing Workflow: Claude Skills"
  has neither a `github` nor a `website`, so its card is now **non-clickable**
  (rendered as a static card). Add a `github:` or `website:` to it in
  `config.js` and it becomes a link again automatically.
- **Ultimate source of truth:** the commit right before the rollback contains
  all three features fully working. If a patch ever drifts too far, you can pull
  any file from there instead: `git show <pre-rollback-sha>:gallery.html`.
