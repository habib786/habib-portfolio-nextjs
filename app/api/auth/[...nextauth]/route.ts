import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createRateLimitMiddleware } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const rateLimit = createRateLimitMiddleware({
    windowMs: 60 * 1000,
    maxRequests: 30,
  });
  const blocked = rateLimit(request);
  if (blocked) return blocked;

  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 },
      );
    }

    if (!session) {
      return NextResponse.json(
        { authenticated: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.name,
        avatar: session.user.user_metadata?.avatar_url,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const rateLimit = createRateLimitMiddleware({
    windowMs: 60 * 1000,
    maxRequests: 5,
  });
  const blocked = rateLimit(request);
  if (blocked) return blocked;

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
