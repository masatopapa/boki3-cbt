# 簿記3級 ネット試験練習（boki3-cbt）

日商簿記3級のネット試験（CBT方式）と同じ操作で解く練習ページ。GitHub Pages で公開している作業コピー。

- 公開URL: https://masatopapa.github.io/boki3-cbt/
- 問題データと見た目の正は `..\_build\`（`q\*.json` と `template.html`）。**このフォルダの index.html は直接直さない**（`merge.py --write` で上書きされる）。
- 更新: `publish.cmd` をダブルクリック（merge.py --write → commit → push）。
- PWA: manifest.json / sw.js（ネット優先＋オフラインキャッシュ）。sw.js の ASSETS にファイルを足したら CACHE の v番号を上げる。
