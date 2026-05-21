# push.ps1 - push v0.2.0 (auth + LK + landing redesign)
Set-Location $PSScriptRoot

Write-Host ">>> git status" -ForegroundColor Cyan
git status --short

Write-Host ">>> git add ." -ForegroundColor Cyan
git add .

Write-Host ">>> git commit" -ForegroundColor Cyan
git commit -m "v0.2.0: postgres + auth (signup/login/logout) + LK pages + landing redesign"

Write-Host ">>> git push" -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "Push done. Render will auto-deploy in ~30 sec." -ForegroundColor Green
