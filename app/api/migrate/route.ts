import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createRateLimitMiddleware } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  const rateLimit = createRateLimitMiddleware({
    windowMs: 60 * 1000,
    maxRequests: 1,
  });
  const blocked = rateLimit(request);
  if (blocked) return blocked;

  const authHeader = request.headers.get("authorization");
  const apiKey = process.env.INTERNAL_API_KEY;
  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(url, key);

  // Add language column to portfolio_projects if missing
  const { error } = await supabase.rpc("exec_migration", {
    sql_text: `ALTER TABLE portfolio_projects ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'en';`,
  });

  if (error) {
    // Try direct insert trick - use raw query via supabase-js doesn't exist.
    // Try via supabase.from workaround
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
