import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getReportById,
  updateReportStatus,
  deleteReport,
} from "@/lib/reports-db";
import type { SessionUser } from "@/lib/types";
import { SESSION_COOKIE } from "@/lib/constants";
import type { ReportRecord } from "@/lib/types";

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

const VALID_STATUSES: ReportRecord["status"][] = [
  "draft",
  "active",
  "completed",
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const report = getReportById(id);
  if (!report || report.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const body = await request.json();
    const { status } = body;
    if (
      typeof status === "string" &&
      VALID_STATUSES.includes(status as ReportRecord["status"])
    ) {
      const updated = updateReportStatus(
        id,
        user.id,
        status as ReportRecord["status"]
      );
      return NextResponse.json({ success: true, report: updated });
    }
    return NextResponse.json(
      { error: "Invalid or missing status" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const report = getReportById(id);
  if (!report || report.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const deleted = deleteReport(id, user.id);
  if (!deleted) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
