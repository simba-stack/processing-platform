# setup.ps1 - first push to GitHub
Set-Location $PSScriptRoot

Write-Host ">>> git init" -ForegroundColor Cyan
git init

Write-Host ">>> git config" -ForegroundColor Cyan
git config user.email "levdan81@gmail.com"
git config user.name "simba-stack"

Write-Host ">>> git add ." -ForegroundColor Cyan
git add .

Write-Host ">>> git commit" -ForegroundColor Cyan
git commit -m "Initial commit: Next.js skeleton + render config"

Write-Host ">>> git branch -M main" -ForegroundColor Cyan
git branch -M main

Write-Host ">>> git remote add origin" -ForegroundColor Cyan
git remote add origin https://github.com/simba-stack/processing-platform.git

Write-Host ">>> git push -u origin main" -ForegroundColor Cyan
Write-Host "(Browser will open for GitHub login on first push)" -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "Done. Open: https://github.com/simba-stack/processing-platform" -ForegroundColor Green
