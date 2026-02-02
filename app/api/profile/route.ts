import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateUserProfile, getUserById } from "@/lib/db";
import type { SessionUser } from "@/lib/types";
import type { ProfessionalTitle } from "@/lib/types";
import { SESSION_COOKIE } from "@/lib/constants";

async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  if (!sessionCookie?.value) return null;
  try {
    const user = JSON.parse(sessionCookie.value) as SessionUser;
    if (user?.id && user?.email) return user;
  } catch {
    // invalid
  }
  return null;
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await getUserById(session.id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const { password: _, ...profile } = user;
  return NextResponse.json({ profile });
}

const VALID_TITLES: ProfessionalTitle[] = ["Dr.", "Dra.", "M.V."];

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { phone, professionalTitle, license, fullName } = body;
    if (professionalTitle && !VALID_TITLES.includes(professionalTitle)) {
      return NextResponse.json(
        { error: "Invalid professional title" },
        { status: 400 }
      );
    }
    const title =
      professionalTitle?.trim() &&
      VALID_TITLES.includes(professionalTitle.trim() as ProfessionalTitle)
        ? (professionalTitle.trim() as ProfessionalTitle)
        : undefined;
    const updated = await updateUserProfile(user.id, {
      phone: phone?.trim(),
      professionalTitle: title,
      license: license?.trim(),
      fullName: fullName?.trim(),
    });
    if (!updated)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({
      success: true,
      user: { ...updated, password: undefined },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
