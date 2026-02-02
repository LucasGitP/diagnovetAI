"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  ButtonSubmit,
  ErrorMessage,
  Input,
  Label,
  ProcessingState,
} from "@/components/ui";
import { useLocale } from "@/contexts/LocaleContext";
import { ROUTES } from "@/lib/constants";

export default function RegisterPage() {
  const { copy } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim(),
          fullName: fullName.trim(),
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? copy.auth.registerError);
        return;
      }
      router.push(ROUTES.onboarding.almostDone);
      router.refresh();
    } catch {
      setError(copy.auth.connectionError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title={copy.auth.registerTitle}
        subtitle={copy.auth.registerSubtitle}
      >
        {loading && <ProcessingState />}

        {!loading && (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {error && <ErrorMessage message={error} />}
            <div>
              <Label htmlFor="fullName">{copy.auth.fullName}</Label>
              <Input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder={copy.auth.fullName}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">{copy.auth.email}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="username">{copy.auth.username}</Label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder={copy.auth.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">{copy.auth.passwordLabel}</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <ButtonSubmit fullWidth disabled={loading}>
              {copy.auth.createAccount}
            </ButtonSubmit>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          {copy.auth.haveAccount}{" "}
          <Link
            href={ROUTES.login}
            className="font-medium text-teal-600 hover:underline"
          >
            {copy.auth.loginLink}
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}
