"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ButtonSubmit, ErrorMessage, Input, Label } from "@/components/ui";
import { useLocale } from "@/contexts/LocaleContext";
import { ROUTES } from "@/lib/constants";

interface ClinicFormProps {
  initialData?: { legalName: string; address: string; phone: string } | null;
}

export default function ClinicForm({ initialData = null }: ClinicFormProps) {
  const { copy } = useLocale();
  const o = copy.onboarding.clinic;
  const router = useRouter();
  const [legalName, setLegalName] = useState(initialData?.legalName ?? "");
  const [address, setAddress] = useState(initialData?.address ?? "");
  const [phone, setPhone] = useState(initialData?.phone ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSettings = Boolean(initialData !== undefined);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/clinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          legalName: legalName.trim(),
          address: address.trim(),
          phone: phone.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? copy.auth.connectionError);
        return;
      }
      router.push(isSettings ? ROUTES.settings : ROUTES.dashboard);
      router.refresh();
    } catch {
      setError(copy.auth.connectionError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}
      <div>
        <Label htmlFor="legalName">{o.legalName}</Label>
        <Input
          id="legalName"
          type="text"
          placeholder="E.g: Veterinary Clinic San Juan"
          value={legalName}
          onChange={(e) => setLegalName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">{o.address}</Label>
        <Input
          id="address"
          type="text"
          placeholder="E.g: Main Ave 123, City"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">{o.phone}</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="E.g: +1 555 123-4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <ButtonSubmit fullWidth disabled={loading}>
        {loading ? o.saving : o.saveButton}
      </ButtonSubmit>
      {!isSettings && (
        <p className="text-center text-sm text-gray-500">
          <Link
            href={ROUTES.dashboard}
            className="text-teal-600 hover:underline"
          >
            {o.skipForNow}
          </Link>
        </p>
      )}
    </form>
  );
}
