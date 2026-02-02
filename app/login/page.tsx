"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/AuthCard";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  ButtonSubmit,
  Divider,
  ErrorMessage,
  Input,
  Label,
  ProcessingState,
} from "@/components/ui";
import { useLocale } from "@/contexts/LocaleContext";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const { copy } = useLocale();
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrUsername: emailOrUsername.trim(),
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? copy.auth.loginError);
        return;
      }
      router.push(ROUTES.dashboard);
      router.refresh();
    } catch {
      setError(copy.auth.connectionError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard title={copy.auth.loginTitle}>
        {loading && <ProcessingState />}

        {!loading && (
          <>
            <Divider />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && <ErrorMessage message={error} />}
              <div>
                <Label htmlFor="emailOrUsername">
                  {copy.auth.emailOrUsername}
                </Label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  autoComplete="username"
                  placeholder={copy.auth.emailOrUsername}
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="password">{copy.auth.password}</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={copy.auth.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <ButtonSubmit fullWidth disabled={loading}>
                {copy.auth.continueButton}
              </ButtonSubmit>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          {copy.auth.noAccount}{" "}
          <Link
            href={ROUTES.register}
            className="font-medium text-teal-600 hover:underline"
          >
            {copy.auth.registerLink}
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}
