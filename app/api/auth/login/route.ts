import { NextRequest, NextResponse } from "next/server";
import { findUserByEmailOrUsername } from "@/lib/db";
import type { SessionUser } from "@/lib/types";
import { SESSION_COOKIE } from "@/lib/constants";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emailOrUsername, password } = body as {
      emailOrUsername?: string;
      password?: string;
    };

    if (!emailOrUsername?.trim() || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email o usuario y contraseña son requeridos.",
        },
        { status: 400 }
      );
    }

    const user = findUserByEmailOrUsername(emailOrUsername.trim());
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Usuario o contraseña incorrectos." },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Usuario o contraseña incorrectos." },
        { status: 401 }
      );
    }

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
    return NextResponse.json(
      { success: false, error: "Error al iniciar sesión." },
      { status: 500 }
    );
  }
}
