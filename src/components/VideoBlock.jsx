// src/components/VideoBlock.jsx
import { useMemo, useState } from "react";

/* ---------- URL resolvers ---------- */
function getYouTubeId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2];
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2];
    }
  } catch {}
  return null;
}
function getVimeoId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("vimeo.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      const last = parts.pop();
      return /^\d+$/.test(last) ? last : null;
    }
  } catch {}
  return null;
}
const isVideoFile = (url = "") => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

function resolveEmbed(url, { autoplay, muted, loop }) {
  const yt = getYouTubeId(url);
  if (yt) {
    const qs = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      autoplay: autoplay ? "1" : "0",
      mute: muted ? "1" : "0",
      loop: loop ? "1" : "0",
      playlist: loop ? yt : undefined, // YT requires this for looping
    });
    return { type: "youtube", src: `https://www.youtube.com/embed/${yt}?${qs.toString()}` };
  }
  const vm = getVimeoId(url);
  if (vm) {
    const qs = new URLSearchParams({
      title: "0", byline: "0", portrait: "0",
      autoplay: autoplay ? "1" : "0",
      muted: muted ? "1" : "0",
      loop: loop ? "1" : "0",
      transparent: "0", dnt: "1",
    });
    return { type: "vimeo", src: `https://player.vimeo.com/video/${vm}?${qs.toString()}` };
  }
  if (isVideoFile(url)) return { type: "file", src: url };
  return { type: "unknown", src: url };
}

/* ---------- Component ---------- */
export default function VideoBlock({ initialUrl = "", title = "Video demo" }) {
  const [url, setUrl] = useState(initialUrl);
  const [autoplay, setAutoplay] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loop, setLoop] = useState(false);

  const embed = useMemo(() => resolveEmbed(url, { autoplay, muted, loop }), [url, autoplay, muted, loop]);

  return (
    <>
      <h4>Video Demo</h4>

      {/* URL + toggles */}
      <div className="input-row" style={{ marginTop: 8 }}>
        <input
          type="url"
          placeholder="Paste YouTube, Vimeo, or direct .mp4/.webm URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="Video URL"
        />
        <button className="btn" onClick={() => setUrl((v) => (v || "").trim())}>Preview</button>
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <label className="toggle">
          <input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} /> Autoplay
        </label>
        <label className="toggle">
          <input type="checkbox" checked={muted} onChange={(e) => setMuted(e.target.checked)} /> Muted
        </label>
        <label className="toggle">
          <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} /> Loop
        </label>
      </div>

      {/* Player */}
      <div style={{ marginTop: 8 }}>
        <div className="video-container" aria-label={title}>
          {(!url || embed.type === "unknown") && (
            <div className="video-empty">
              <div className="video-empty-inner">
                Paste a YouTube, Vimeo, or .mp4/.webm URL to preview the demo.
              </div>
            </div>
          )}

          {(embed.type === "youtube" || embed.type === "vimeo") && (
            <iframe
              key={embed.src}
              src={embed.src}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}

          {embed.type === "file" && (
            <video
              key={embed.src}
              src={embed.src}
              controls
              autoPlay={autoplay}
              muted={muted}
              loop={loop}
              playsInline
              preload="metadata"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "#000" }}
            />
          )}
        </div>
      </div>
    </>
  );
}