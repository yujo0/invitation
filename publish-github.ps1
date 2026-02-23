# Deploy helper for beginners
# Usage:
#   .\publish-github.ps1 -RepoUrl "https://github.com/<username>/<repo>.git"

param(
  [Parameter(Mandatory = $true)]
  [string]$RepoUrl,

  [string]$CommitMessage = "Initial PhD invite site"
)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "git is not installed."
  exit 1
}

if (-not (Test-Path ".git")) {
  git init
}

git add .

$hasStagedChanges = git diff --cached --name-only
if (-not $hasStagedChanges) {
  Write-Host "No staged changes to commit."
} else {
  git commit -m $CommitMessage
}

$remoteExists = git remote | Select-String -Pattern "^origin$"
if ($remoteExists) {
  git remote set-url origin $RepoUrl
} else {
  git remote add origin $RepoUrl
}

git branch -M main
git push -u origin main

Write-Host ""
Write-Host "Push complete."
Write-Host "After Actions finishes, your public URL is usually:"
Write-Host "https://<your-github-id>.github.io/<repo-name>/"
