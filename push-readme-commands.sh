# 1) Check status & current branch
git status
git branch --show-current

# 2) Stage and commit README
git add README.md
git commit -m "docs: update README for Gemini Content Engine"

# 3) Ensure remote exists (only if not set)
# Replace <repo-url> with your GitHub repo URL if needed
git remote get-url origin 2>/dev/null || git remote add origin <repo-url>

# 4) Push current branch (sets upstream if first push)
BRANCH=$(git branch --show-current || echo main)
git push -u origin "$BRANCH"

# 5) Prevent committing .env: add to .gitignore and remove from index
echo ".env" >> .gitignore
git add .gitignore
git rm --cached .env || true
git commit -m "chore: ignore .env and remove from index" || true
git push origin "$BRANCH" || true

# 6) If .env was already pushed and you need to remove it from remote history (advanced, optional):
# - Install BFG Repo-Cleaner (https://rtyley.github.io/bfg-repo-cleaner/)
# - Run from a fresh clone of the repo:
#   java -jar bfg.jar --delete-files .env
#   git reflog expire --expire=now --all && git gc --prune=now --aggressive
#   git push --force
#
# OR use git filter-repo (recommended over filter-branch)
# See docs: https://github.com/newren/git-filter-repo
