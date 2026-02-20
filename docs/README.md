# 仕様書・開発フロー

## 概要

- **開発スタイル**: スペック駆動（仕様書 → 実装）
- **仕様書**: 1機能につき1つの `docs/*.md`
- **PR方針**: 基本的に 1機能 = 1PR
- **ブランチ**: `main` が安定、機能は `feature/xx-機能名` で開発し PR で main にマージ

## Phase と doc 一覧

| Phase | 順番 | doc | 機能 |
|-------|------|-----|------|
| 0 | — | 00-overview, _template | 土台・概要・テンプレート |
| 1 (MVP) | 1 | 01-auth.md | 認証 |
| 1 | 2 | 02-child-profile.md | 子どもプロフィール |
| 1 | 3 | 03-growth-record.md | 成長記録 |
| 1 | 4 | 04-album.md | アルバム（写真・動画） |
| 1 | 5 | 05-ai-essentials.md | AI: 必需品提案 |
| 1 | 6 | 06-ai-growth-advice.md | AI: 成長・発達アドバイス |
| 2 | 7 | 07-ai-album.md | AI: アルバム（タグ・キャプション・1年前） |
| 2 | 8 | 08-ai-memo.md | AI: メモ補助 |
| 2 | 9 | 09-ai-search.md | AI: 意味検索 |
| 3 | 10 | 10-family-share.md | 家族共有 |

## 読む順序

1. `00-overview.md` … プロジェクト全体・用語・技術スタック
2. 実装する機能の `0x-*.md` … 依存 doc を参照しながら

## 1機能1PR の例外

- Phase 0 の初期構成（複数ファイルを1PRでよい）
- リファクタのみ（新機能なし）
- 仕様の軽微な typo 修正

これらは 1PR にまとめてよい（00-overview に明記）。
