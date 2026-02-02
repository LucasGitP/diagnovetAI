import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/db";
import type { SessionUser } from "@/lib/types";
import { SESSION_COOKIE } from "@/lib/constants";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, password, fullName } = body as {
      email?: string;
      username?: string;
      password?: string;
      fullName?: string;
    };

    if (!email?.trim()) {
      return NextResponse.json(
        { success: false, error: "El email es requerido." },
        { status: 400 }
      );
    }
    if (!username?.trim()) {
      return NextResponse.json(
        { success: false, error: "El nombre de usuario es requerido." },
        { status: 400 }
      );
    }
    if (!password || password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "La contraseña debe tener al menos 6 caracteres.",
        },
        { status: 400 }
      );
    }
    if (!fullName?.trim()) {
      return NextResponse.json(
        { success: false, error: "El nombre completo es requerido." },
        { status: 400 }
      );
    }

    const user = createUser({
      email: email.trim(),
      username: username.trim(),
      password,
      fullName: fullName.trim(),
    });

    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
    };

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
    });

    response.cookies.set(SESSION_COOKIE, JSON.stringify(sessionUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (e) {
    const err = e as Error;
    if (err.message === "EMAIL_IN_USE") {
      return NextResponse.json(
        { success: false, error: "Ya existe una cuenta con ese email." },
        { status: 409 }
      );
    }
    if (err.message === "USERNAME_IN_USE") {
      return NextResponse.json(
        { success: false, error: "Ese nombre de usuario ya está en uso." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error al crear la cuenta." },
      { status: 500 }
    );
  }
}
