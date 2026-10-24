# 簿記3級 ネット試験練習 を GitHub Pages に公開する
#   1) _build\merge.py --write で問題データを結合し index.html を作り直す
#   2) commit → push（1分ほどで https://masatopapa.github.io/boki3-cbt/ に反映。
#      sw.js がネット優先なので、使っている人は次に開いたときに自動で新版になる）
# 使い方: publish.cmd をダブルクリック、または  powershell -File publish.ps1 "コミットメッセージ"
$ErrorActionPreference = "Stop"
$env:Path = "$env:LOCALAPPDATA\Programs\MinGit\cmd;$env:LOCALAPPDATA\Programs\gh\bin;$env:Path"

$root  = Split-Path -Parent $MyInvocation.MyCommand.Path
$build = Join-Path (Split-Path -Parent $root) "_build"

python (Join-Path $build "merge.py") --write
if ($LASTEXITCODE -ne 0) { throw "merge.py failed" }

Set-Location $root
cmd /c "git add -A 2>&1"
$msg = if ($args.Count -gt 0) { ($args -join " ") } else { "update " + (Get-Date -Format "yyyy-MM-dd HH:mm") }
cmd /c "git commit -m ""$msg"" 2>&1"
cmd /c "git push 2>&1"
if ($LASTEXITCODE -ne 0) { throw "git push failed" }
Write-Host ""
Write-Host "公開しました → https://masatopapa.github.io/boki3-cbt/  （反映まで1分ほど）"
