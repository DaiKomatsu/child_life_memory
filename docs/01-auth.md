# 認証

## 目的・概要

ログイン認証を提供する。1アカウント = 1ユーザー。MVP ではメール+パスワードでサインアップ・サインイン・サインアウトとセッション管理を行う。将来ソーシャルログイン（Google/Apple）を追加可能な構成とする。

## スコープ

- **含めるもの**
  - メールアドレス + パスワードによるサインアップ・サインイン
  - サインアウト
  - セッション管理（サーバー側で「ログイン中」判定）
  - 未認証時はログイン画面へ誘導（保護ルート）
- **含めないもの**
  - ソーシャルログイン（Phase 1 では対象外、将来拡張）
  - メール認証・パスワードリセット（将来拡張）

## ユーザーストーリー / シナリオ

- 新規ユーザーがメール・パスワードを入力してサインアップし、そのままログイン状態になる。
- 既存ユーザーがメール・パスワードでサインインし、トップなど保護された画面にアクセスできる。
- ログイン中のユーザーがサインアウトすると、未認証状態になりログイン画面に戻る。
- 未認証のユーザーが保護された URL にアクセスすると、ログイン画面にリダイレクトされる。

## API

認証は NextAuth.js のルート `POST/GET /api/auth/*` を利用する（カスタム API は持たない）。

- **サインアップ**: 本機能では「アプリ側でユーザー作成 + NextAuth の Credentials でサインイン」の組み合わせとする。ユーザー作成用に `POST /api/auth/signup` を用意する。
  - リクエスト: `{ "email": string, "password": string }`
  - 成功: 201, `{ "userId": string }`。クライアントは続けて signIn("credentials", ...) でサインインする。
  - エラー: 400（バリデーション）、409（メール重複）
- **サインイン・サインアウト**: NextAuth の `signIn` / `signOut` を利用（Credentials プロバイダー）。

## データ

- **User**  
  - id (cuid), email (unique), hashedPassword (nullable、ソーシャルのみの場合は null), name (nullable), emailVerified (DateTime?, 将来用), createdAt, updatedAt
- **Account**（NextAuth 用・OAuth 等の将来用）  
  - id, userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, など
- **Session**（NextAuth 用・DB セッションの場合）  
  - id, sessionToken, userId, expires
- **VerificationToken**（NextAuth 用・メール認証等の将来用）  
  - identifier, token, expires

Phase 0 の `Phase0Placeholder` は削除し、上記モデルに置き換える。

## 画面・UI

- **サインアップ画面** (`/signup`): メール、パスワード（確認用含む）、サインアップボタン。サインインへのリンク。
- **サインイン画面** (`/signin`): メール、パスワード、サインインボタン。サインアップへのリンク。
- 未認証で `/` やその他保護ルートにアクセスした場合 → `/signin` にリダイレクト。
- ログイン済みならトップ `/` を表示。ヘッダー等にサインアウトリンクを配置（本 PR では最小限でよい）。

## 非機能

- パスワードは bcrypt 等でハッシュして保存する。
- セッションは NextAuth の JWT または Database Session のいずれかでよい（実装しやすい方でよい）。

## 受け入れ条件（Done）

- [ ] サインアップ API が動作し、User が DB に作成される
- [ ] サインイン・サインアウトができ、セッションでログイン状態が維持される
- [ ] 未認証で `/` にアクセスすると `/signin` にリダイレクトされる
- [ ] ログイン済みで `/` にアクセスするとトップが表示される
- [ ] docs/01-auth.md が本仕様で更新されている

## 依存

なし。
