import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getReportsByUserId,
  getReportStats,
  createReport,
} from "@/lib/reports-db";
import type { SessionUser } from "@/lib/types";
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
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [reports, stats] = await Promise.all([
    getReportsByUserId(user.id),
    getReportStats(user.id),
  ]);
  return NextResponse.json({ reports, stats });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const {
      date,
      animalName,
      age,
      unit,
      species,
      breed,
      gender,
      referringProfessional,
      professionalEmail,
      guardian,
      guardianEmail,
      studyType,
      imageCount = 0,
      status: requestStatus,
    } = body;
    if (
      !date?.trim() ||
      !animalName?.trim() ||
      !age?.trim() ||
      !unit?.trim() ||
      !species?.trim() ||
      !gender?.trim() ||
      !guardian?.trim() ||
      !studyType?.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: date, animalName, age, unit, species, gender, guardian, studyType",
        },
        { status: 400 }
      );
    }
    const status = requestStatus === "draft" ? "draft" : "active";
    const report = await createReport(
      user.id,
      {
        date: String(date).trim(),
        animalName: String(animalName).trim(),
        age: String(age).trim(),
        unit: String(unit).trim(),
        species: String(species).trim(),
        breed: String(breed ?? "").trim(),
        gender: String(gender).trim(),
        referringProfessional: String(referringProfessional ?? "").trim(),
        professionalEmail: String(professionalEmail ?? "").trim(),
        guardian: String(guardian).trim(),
        guardianEmail: String(guardianEmail ?? "").trim(),
        studyType: String(studyType).trim(),
        imageCount: Number(imageCount) || 0,
      },
      { status }
    );
    return NextResponse.json({ success: true, report });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}
