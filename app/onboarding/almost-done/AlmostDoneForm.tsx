"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ButtonSubmit,
  ErrorMessage,
  Input,
  Label,
  Select,
} from "@/components/ui";
import { useLocale } from "@/contexts/LocaleContext";
import { PROFESSIONAL_TITLES, ROUTES } from "@/lib/constants";

export default function AlmostDoneForm({
  user,
}: {
  user: { fullName: string };
}) {
  const { copy } = useLocale();
  const router = useRouter();
  const o = copy.onboarding.almostDone;
  const [phone, setPhone] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [fullName, setFullName] = useState(user.fullName);
  const [license, setLicense] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim(),
          professionalTitle: professionalTitle.trim() || undefined,
          fullName: fullName.trim(),
          license: license.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? copy.auth.connectionError);
        return;
      }
      router.push(ROUTES.onboarding.clinic);
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
        <Label htmlFor="phone">{o.phone}</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="E.g: 4086504124"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="professionalTitle">{o.professionalTitle}</Label>
        <Select
          id="professionalTitle"
          value={professionalTitle}
          onChange={(e) => setProfessionalTitle(e.target.value)}
          required
        >
          <option value="">Select...</option>
          {PROFESSIONAL_TITLES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="fullName">{o.fullName}</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="E.g: Fernanda Barbero"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="license">{o.license}</Label>
        <Input
          id="license"
          type="text"
          placeholder="E.g: MP 12345"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
        />
      </div>
      <ButtonSubmit fullWidth disabled={loading}>
        {loading ? o.saving : o.saveButton}
      </ButtonSubmit>
      <p className="text-center text-sm text-gray-500">
        <Link href={ROUTES.dashboard} className="text-teal-600 hover:underline">
          {o.skipForNow}
        </Link>
      </p>
    </form>
  );
}
