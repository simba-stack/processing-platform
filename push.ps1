# push.ps1 - push new changes
Set-Location $PSScriptRoot

Write-Host ">>> git status" -ForegroundColor Cyan
git status --short

Write-Host ">>> git add ." -ForegroundColor Cyan
git add .

Write-Host ">>> git commit" -ForegroundColor Cyan
$msg = if ($args.Count -gt 0) { $args[0] } else { "update" }
git commit -m "$msg"

Write-Host ">>> git push" -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "Push done. Render auto-deploy ~2 min." -ForegroundColor Green
