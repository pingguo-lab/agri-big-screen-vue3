# 发布到 GitHub Pages
#
# 用法：在项目根目录执行  powershell -File deploy\发布到GitHubPages.ps1
# 原理：主分支只放源码；构建产物推到 gh-pages 分支，Pages 从该分支发布。
#
# 前置：已安装 git，且仓库已关联 origin。

$ErrorActionPreference = "Stop"
$repo = "https://github.com/pingguo-lab/agri-big-screen-vue3.git"

Write-Host "1/3 构建..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { throw "构建失败" }

Write-Host "2/3 提交产物到 gh-pages..." -ForegroundColor Cyan
Push-Location dist
try {
  if (Test-Path .git) { Remove-Item .git -Recurse -Force }
  git init -b gh-pages | Out-Null
  git add -A
  git -c core.autocrlf=false -c user.name="pingguo" -c user.email="2727897074@qq.com" commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" | Out-Null
  git remote add origin $repo
  git -c core.autocrlf=false push -f origin gh-pages
} finally {
  Pop-Location
}

Write-Host "3/3 完成：https://pingguo-lab.github.io/agri-big-screen-vue3/ （约 1 分钟后生效）" -ForegroundColor Green
