"use client";

import { signOut } from "next-auth/react";

export function SignOutLink() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/signin" })}
      style={{
        background: "none",
        border: "none",
        color: "inherit",
        textDecoration: "underline",
        cursor: "pointer",
        padding: 0,
        font: "inherit",
      }}
    >
      サインアウト
    </button>
  );
}
