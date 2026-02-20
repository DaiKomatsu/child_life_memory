import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignOutLink } from "@/components/sign-out-link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Child Life Memory</h1>
      <p>お子さんの成長記録・アルバム・AI提案</p>
      {session?.user ? (
        <p style={{ marginTop: "1rem" }}>
          {session.user.email} でログイン中 — <SignOutLink />
        </p>
      ) : (
        <p style={{ marginTop: "1rem" }}>
          <Link href="/signin">サインイン</Link> /{" "}
          <Link href="/signup">サインアップ</Link>
        </p>
      )}
      <p style={{ marginTop: "1rem" }}>
        <a href="/api/health">API: /api/health</a>
      </p>
    </main>
  );
}
