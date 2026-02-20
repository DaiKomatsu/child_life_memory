"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("メールアドレスまたはパスワードが正しくありません。");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main style={{ maxWidth: 400, margin: "4rem auto", padding: "0 1rem" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>サインイン</h1>
      <form onSubmit={handleSubmit}>
        {error && (
          <p
            role="alert"
            style={{ color: "crimson", marginBottom: "1rem", fontSize: 14 }}
          >
            {error}
          </p>
        )}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            marginBottom: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "送信中…" : "サインイン"}
        </button>
      </form>
      <p style={{ fontSize: 14 }}>
        アカウントをお持ちでない方は{" "}
        <Link href="/signup">サインアップ</Link>
      </p>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main style={{ maxWidth: 400, margin: "4rem auto", padding: "0 1rem" }}>
          <h1 style={{ marginBottom: "1.5rem" }}>サインイン</h1>
          <p>読み込み中…</p>
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
