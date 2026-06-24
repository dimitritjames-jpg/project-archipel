import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VibeVI - Find Your Island Vibe";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #e9fff8 0%, #72e7dc 24%, #0f8da3 48%, #0A192F 100%)",
          color: "#fffaf0",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            right: 80,
            top: 58,
            background:
              "radial-gradient(circle, #F59E0B 0%, #FFB454 42%, rgba(255,180,84,0.10) 72%)",
            opacity: 0.95,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -140,
            bottom: -120,
            width: 760,
            height: 260,
            borderRadius: "55% 45% 0 0",
            background: "#f4dfb3",
            opacity: 0.96,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -80,
            bottom: 110,
            width: 620,
            height: 155,
            borderRadius: "50%",
            background: "#063c49",
            opacity: 0.84,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 178,
            bottom: 194,
            width: 0,
            height: 0,
            borderLeft: "0 solid transparent",
            borderRight: "92px solid transparent",
            borderBottom: "180px solid rgba(255,250,240,0.92)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 244,
            bottom: 190,
            width: 138,
            height: 18,
            borderRadius: 999,
            background: "#fffaf0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 86,
            right: 86,
            bottom: 62,
            height: 62,
            display: "flex",
            gap: 18,
            opacity: 0.68,
          }}
        >
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              style={{
                flex: 1,
                borderTop: "8px solid rgba(255,250,240,0.78)",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            padding: "76px 92px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 34,
              color: "#083344",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 58,
                height: 58,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                background: "#0A192F",
                color: "#10B981",
                boxShadow: "0 20px 60px rgba(10,25,47,0.28)",
              }}
            >
              VI
            </span>
            Find Your Island Vibe
          </div>
          <div
            style={{
              maxWidth: 760,
              display: "flex",
              flexDirection: "column",
              color: "#fffaf0",
              textShadow: "0 14px 42px rgba(10,25,47,0.40)",
            }}
          >
            <div
              style={{
                fontSize: 116,
                lineHeight: 0.9,
                fontWeight: 900,
                letterSpacing: "-0.075em",
              }}
            >
              VibeVI
            </div>
            <div
              style={{
                marginTop: 28,
                maxWidth: 680,
                color: "#fef3c7",
                fontSize: 40,
                lineHeight: 1.18,
                fontWeight: 750,
              }}
            >
              Beach. Boat. Bite. Night.
            </div>
            <div
              style={{
                marginTop: 28,
                maxWidth: 690,
                color: "rgba(255,250,240,0.90)",
                fontSize: 28,
                lineHeight: 1.28,
                fontWeight: 550,
              }}
            >
              A modern U.S. Virgin Islands guide for beaches, boat days, local plates,
              ferry moves, cruise days, and island stories.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
