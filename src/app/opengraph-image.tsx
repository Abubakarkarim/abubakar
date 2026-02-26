import { ImageResponse } from "next/og";

export const alt = "Abdul Haseeb | Senior Full Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c4a6e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            marginBottom: 12,
          }}
        >
          Abdul Haseeb
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(248, 250, 252, 0.9)",
          }}
        >
          Senior Full Stack Software Engineer | AI-Integrated Web Developer
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(148, 163, 184, 1)",
            marginTop: 16,
          }}
        >
          Lahore, Pakistan · 5+ Years Experience
        </div>
      </div>
    ),
    { ...size }
  );
}
