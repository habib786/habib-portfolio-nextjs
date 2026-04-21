import { ImageResponse } from "next/og";

export const alt = "Habib Farooq - Full Stack Developer & AI Engineer";

export const contentType = "image/png";

export const sizes = [
  { width: 1200, height: 630, id: "og" },
  { width: 1200, height: 675, id: "twitter" },
  { width: 1080, height: 1080, id: "square" },
  { width: 1080, height: 1350, id: "vertical" },
];

export async function generateImageMetadata() {
  return sizes.map((s) => ({
    id: s.id,
    width: s.width,
    height: s.height,
    alt,
    contentType,
  }));
}

export default function OpenGraphImage({ id }: { id: Promise<string> }) {
  const resolvedId = Promise.resolve(id);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(1200px 630px at 20% 20%, rgba(16,106,90,0.22) 0%, rgba(0,0,0,0) 55%), radial-gradient(1200px 630px at 80% 80%, rgba(250,204,21,0.18) 0%, rgba(0,0,0,0) 55%), linear-gradient(135deg, #050608 0%, #0b0f14 55%, #050608 100%)",
        color: "white",
        padding: "80px",
        letterSpacing: "-0.02em",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          lineHeight: 1.05,
          textAlign: "center",
        }}
      >
        Habib Farooq
      </div>
      <div
        style={{
          marginTop: 18,
          fontSize: 32,
          fontWeight: 500,
          opacity: 0.92,
          textAlign: "center",
        }}
      >
        Full Stack Developer • AI Engineer
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 22,
          fontWeight: 500,
          opacity: 0.72,
          textAlign: "center",
        }}
      >
        habibfarooq.com
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
