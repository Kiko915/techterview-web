![TechTerview Logo](./public/logo/techterview_wordmark_colored.png)

# GitHub Workflow Guide

Welcome to the TechTerview dev team!  
This document covers our branch naming conventions, pull request (PR) process, and merge rules for consistent, collaborative development.

---

## Branch Naming Conventions

- **Prefix by type:**
  - `feature/` — new features (`feature/auth-ui`)
  - `bugfix/` — bug fixes (`bugfix/login-error`)
  - `hotfix/` — urgent fixes (`hotfix/critical-crash`)
  - `refactor/` — code improvement (`refactor/dashboard-layout`)
  - `design/` — UI/UX changes (`design/new-homepage`)
  - `docs/` — documentation updates (`docs/install-guide`)
- **Format:** lowercase, hyphen-separated, short but descriptive.
- **Example:**  
  - `feature/signup-page`  
  - `bugfix/nav-link-broken`  
  - `docs/readme-update`

---

## Pull Request (PR) Rules

- Open a PR when merging to `main`.
- PR title format: `[Type] Description`.  
  Example: `[Feature] Add User Authentication`
- PR description: summary of changes and purpose.  
  Reference relevant issues if available.
- Assign at least one reviewer—two preferred.
- Resolve all conflicts before review.
- Use discussions and comments for suggestions and improvements.
- PRs require at least one approval before merging.

---

## Merge Rules

- Only merge after all reviews and required checks have passed.
- Use the “merge pull request” button—avoid direct pushes to `main`.
- Delete merged branches to keep the repo clean.
- The team lead (or assigned reviewer) merges PRs.
- Protect `main` with required PR review and status checks (no direct pushes).

---

## Best Practices

- Pull the latest `main` before starting work.
- Keep commits focused and messages clear.
- Push changes frequently—don’t hoard code.
- Use GitHub Issues for tracking tasks/bugs.
- Update documentation and link it in PRs when needed.
- Ask for feedback early and often!

---

For questions or suggestions, open an Issue or discuss in team chat.  
Let’s build something great, together!
