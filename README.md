# Child Life Memory

お子さんの成長記録・アルバム・時期別必需品の AI 提案アプリ。

## 技術スタック

- **FE/BE**: Next.js 14 (App Router) + TypeScript
- **DB**: MySQL (Docker) + Prisma
- **AI**: OpenAI ChatGPT API（Phase 1 以降で利用）

## 開発の進め方

- 仕様は `docs/` に 1 機能 1 ファイルで管理。`docs/README.md` を参照。
- 基本的に 1 機能 = 1 PR。ブランチは `feature/xx-機能名`。
- Phase 0 完了後、Phase 1 からは `docs/01-auth.md` の仕様を書いてから実装。

## ローカルで動かす

```bash
# 依存関係
npm install

# 環境変数（初回）
cp .env.example .env

# DB 起動（Docker）
docker compose up -d mysql

# マイグレーション（初回）
npx prisma db push

# 開発サーバー
npm run dev
```

- トップ: http://localhost:3000
- API 疎通: http://localhost:3000/api/health

## ビルド

```bash
npx prisma generate
npm run build
```

## Phase

- **Phase 0**: 土台（本リポジトリ構成・Docker・docs）
- **Phase 1**: MVP（認証・子どもプロフィール・成長記録・アルバム・AI 2 本）
- **Phase 2**: AI 拡張（アルバム AI・メモ補助・意味検索）
- **Phase 3**: 家族共有

詳細は `docs/00-overview.md` を参照。
