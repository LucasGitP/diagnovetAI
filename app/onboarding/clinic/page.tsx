import { redirect } from "next/navigation";
import Image from "next/image";
import OnboardingLayout from "@/components/OnboardingLayout";
import WhySection from "@/components/WhySection";
import { getSession } from "@/lib/auth";
import { getCopyAsync } from "@/lib/locale-server";
import { ROUTES } from "@/lib/constants";
import ClinicForm from "./ClinicForm";

export default async function ClinicPage() {
  const user = await getSession();
  if (!user) redirect(ROUTES.login);

  const copy = await getCopyAsync();
  const o = copy.onboarding.clinic;

  return (
    <OnboardingLayout
      title={o.title}
      subtitle={o.subtitle}
      rightContent={
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop"
            alt="Dog"
            width={400}
            height={400}
            className="object-cover object-top"
          />
        </div>
      }
    >
      <ClinicForm />
      <WhySection
        title={o.whyTitle}
        bullets={[o.bullet1, o.bullet2, o.bullet3]}
      />
    </OnboardingLayout>
  );
}
