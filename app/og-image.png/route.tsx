import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Habib Farooq";
  const subtitle =
    searchParams.get("subtitle") || "Full Stack Developer • AI Engineer";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background:
          "linear-gradient(135deg, #071B16 0%, #0B2A23 60%, #0E352C 100%)",
        color: "#F8FAFC",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 1040,
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 30,
            opacity: 0.9,
            maxWidth: 1040,
            whiteSpace: "pre-wrap",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          marginTop: 52,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 22,
          opacity: 0.9,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: "#FACC15",
          }}
        />
        <div>habibfarooq.com</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
