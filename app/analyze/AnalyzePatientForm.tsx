"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import FormSection from "@/components/FormSection";
import ImageUploadZone from "@/components/ImageUploadZone";
import PageTitle from "@/components/PageTitle";
import {
  Button,
  ButtonSubmit,
  ErrorMessage,
  Input,
  Label,
  Select,
} from "@/components/ui";
import {
  AGE_UNITS,
  GENDER_OPTIONS,
  ROUTES,
  SPECIES_OPTIONS,
  STUDY_TYPES,
} from "@/lib/constants";
import { useLocale } from "@/contexts/LocaleContext";

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  animalName: "",
  age: "",
  unit: "Year(s)",
  species: "",
  breed: "",
  gender: "",
  referringProfessional: "",
  professionalEmail: "",
  guardian: "",
  guardianEmail: "",
  studyType: "",
  createAsDraft: false,
};

export default function AnalyzePatientForm() {
  const { copy } = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [form, setForm] = useState(initialForm);

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleClear = () => {
    setForm(initialForm);
    setImages([]);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { createAsDraft, ...payload } = form;
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          imageCount: images.length,
          status: createAsDraft ? "draft" : "active",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? copy.analyze.createError);
        return;
      }
      router.push(`${ROUTES.dashboard}?created=1`);
      router.refresh();
    } catch {
      setError(copy.analyze.connectionError);
    } finally {
      setLoading(false);
    }
  };

  const heartIcon = (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,340px]">
      <Card padding="lg" className="p-6 lg:p-8">
        <PageTitle title={copy.analyze.pageTitle} icon={heartIcon} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <ErrorMessage message={error} />}

          <FormSection title={copy.analyze.patientSection}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="date">{copy.analyze.date}</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="animalName">{copy.analyze.animalName}</Label>
                <Input
                  id="animalName"
                  type="text"
                  placeholder="E.g: Max"
                  value={form.animalName}
                  onChange={(e) => update("animalName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">{copy.analyze.age}</Label>
                <Input
                  id="age"
                  type="text"
                  inputMode="numeric"
                  placeholder="E.g: 3"
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="unit">{copy.analyze.unit}</Label>
                <Select
                  id="unit"
                  value={form.unit}
                  onChange={(e) => update("unit", e.target.value)}
                  required
                >
                  {AGE_UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="species">{copy.analyze.species}</Label>
                <Select
                  id="species"
                  value={form.species}
                  onChange={(e) => update("species", e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  {SPECIES_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {copy.speciesLabels[s] ?? s}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="breed">{copy.analyze.breed}</Label>
                <Input
                  id="breed"
                  type="text"
                  placeholder="E.g: Golden Retriever"
                  value={form.breed}
                  onChange={(e) => update("breed", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gender">{copy.analyze.gender}</Label>
                <Select
                  id="gender"
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  {GENDER_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </FormSection>

          <FormSection title={copy.analyze.referrerSection}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="referringProfessional">
                  {copy.analyze.referringProfessional}
                </Label>
                <Input
                  id="referringProfessional"
                  type="text"
                  placeholder="E.g: Dr. Smith"
                  value={form.referringProfessional}
                  onChange={(e) =>
                    update("referringProfessional", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="professionalEmail">
                  {copy.analyze.professionalEmail}
                </Label>
                <Input
                  id="professionalEmail"
                  type="email"
                  placeholder="professional@email.com"
                  value={form.professionalEmail}
                  onChange={(e) => update("professionalEmail", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="guardian">{copy.analyze.guardian}</Label>
                <Input
                  id="guardian"
                  type="text"
                  placeholder={copy.analyze.guardianPlaceholder}
                  value={form.guardian}
                  onChange={(e) => update("guardian", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="guardianEmail">
                  {copy.analyze.guardianEmail}
                </Label>
                <Input
                  id="guardianEmail"
                  type="email"
                  placeholder="owner@email.com"
                  value={form.guardianEmail}
                  onChange={(e) => update("guardianEmail", e.target.value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title={copy.analyze.studySection}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="studyType">{copy.analyze.studyType}</Label>
                <Select
                  id="studyType"
                  value={form.studyType}
                  onChange={(e) => update("studyType", e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  {STUDY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {copy.studyTypeLabels[t] ?? t}
                    </option>
                  ))}
                </Select>
              </div>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(form.createAsDraft)}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      createAsDraft: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">
                  {copy.analyze.createAsDraft}
                </span>
              </label>
            </div>
          </FormSection>

          <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-6">
            <Button
              type="button"
              variant="danger"
              onClick={handleClear}
              className="inline-flex items-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              {copy.analyze.clear}
            </Button>
            <ButtonSubmit
              fullWidth={false}
              disabled={loading}
              className="ml-auto inline-flex items-center gap-2 px-6 py-3"
            >
              {loading ? copy.studies.saving : copy.analyze.saveButton}
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </ButtonSubmit>
          </div>
        </form>
      </Card>

      <ImageUploadZone
        images={images}
        onAdd={(files) => setImages((prev) => [...prev, ...files].slice(0, 20))}
        onRemove={(i) =>
          setImages((prev) => prev.filter((_, idx) => idx !== i))
        }
      />
    </div>
  );
}
