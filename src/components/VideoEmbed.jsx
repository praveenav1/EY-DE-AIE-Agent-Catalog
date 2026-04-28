// src/components/VideoEmbed.jsx
import { useMemo } from "react";

/* ------------------ helpers ------------------ */
const isVideoFile = (url = "") => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

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

/* ---------- SharePoint / OneDrive resolver ---------- */
// inside src/components/VideoEmbed.jsx

function resolveSharePoint(url = "") {
  try {
    const u = new URL(url);
    const isSPO =
      u.hostname.endsWith(".sharepoint.com") ||
      u.hostname.endsWith("-my.sharepoint.com");
    if (!isSPO) return null;

    // 1) Already an embed URL? Use as-is.
    if (u.pathname.includes("/_layouts/15/embed.aspx")) {
      return { type: "sharepoint", src: u.toString() };
    }
    if (
      u.pathname.includes("/_layouts/15/doc.aspx") &&
      (u.searchParams.get("action") === "embedview" ||
        u.searchParams.get("action") === "view")
    ) {
      return { type: "sharepoint", src: u.toString() };
    }

    // 2) If we have UniqueId/sourcedoc, build canonical embeds
    const uniqueId =
      u.searchParams.get("UniqueId") || u.searchParams.get("uniqueId");
    const sourcedoc =
      u.searchParams.get("sourcedoc") || u.searchParams.get("SourceDoc");

    // Build site base (origin + first path segments up to _layouts or full path)
    const parts = u.pathname.split("/").filter(Boolean);
    const layoutsIdx = parts.findIndex((p) => p === "_layouts");
    const basePath =
      layoutsIdx > -1 ? parts.slice(0, layoutsIdx).join("/") : parts.join("/");
    const siteBase = `${u.origin}/${basePath}`;

    if (uniqueId) {
      return {
        type: "sharepoint",
        src: `${siteBase}/_layouts/15/embed.aspx?UniqueId=${encodeURIComponent(
          uniqueId
        )}&DefaultItemOpen=1`,
      };
    }
    if (sourcedoc) {
      return {
        type: "sharepoint",
        src: `${siteBase}/_layouts/15/doc.aspx?sourcedoc=${encodeURIComponent(
          sourcedoc
        )}&action=embedview`,
      };
    }

    // 3) Handle "viewer links" like "/:v:/r/personal/.../Documents/...mp4?web=1"
    //    Convert to:  "/_layouts/15/embed.aspx?Id=/personal/.../Documents/...mp4&DefaultItemOpen=1"
    const path = u.pathname; // e.g., "/:v:/r/personal/.../Documents/...mp4"
    const viewerPrefix = "/:v:/r/";
    if (path.startsWith(viewerPrefix)) {
      const serverRel = "/" + path.slice(viewerPrefix.length); // "personal/.../Documents/...mp4"
      const siteRoot = u.origin; // "https://eyindia-my.sharepoint.com"
      const src = `${siteRoot}/_layouts/15/embed.aspx?Id=${encodeURIComponent(
        serverRel
      )}&DefaultItemOpen=1`;
      return { type: "sharepoint", src };
    }

    // 4) As a last resort, if it's clearly a SharePoint URL but not convertible:
    return { type: "sharepoint-missing-embed", original: url };
  } catch {
    return null;
  }
}
/* ------------------ main resolver ------------------ */
function resolveEmbed(url, { autoplay, muted, loop, controls, useNoCookie }) {
  if (!url) return { type: "none" };

  // SharePoint first
  const sp = resolveSharePoint(url);
  if (sp) return sp;

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  const yt = getYouTubeId(url);
  if (yt) {
    const qs = new URLSearchParams({
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
      controls: controls ? "1" : "0",
      ...(autoplay ? { autoplay: "1" } : {}),
      ...(muted ? { mute: "1" } : {}),
      ...(loop ? { loop: "1", playlist: yt } : {}),
      ...(origin ? { origin } : {}),
    });
    const host = useNoCookie
      ? "https://www.youtube-nocookie.com"
      : "https://www.youtube.com";
    return { type: "youtube", src: `${host}/embed/${yt}?${qs.toString()}` };
  }

  const vm = getVimeoId(url);
  if (vm) {
    const qs = new URLSearchParams({
      title: "0",
      byline: "0",
      portrait: "0",
      controls: controls ? "1" : "0",
      ...(autoplay ? { autoplay: "1" } : {}),
      ...(muted ? { muted: "1" } : {}),
      ...(loop ? { loop: "1" } : {}),
      transparent: "0",
      dnt: "1",
    });
    return { type: "vimeo", src: `https://player.vimeo.com/video/${vm}?${qs.toString()}` };
  }

  if (isVideoFile(url)) return { type: "file", src: url };

  // Unknown pattern → render a friendly message
  return { type: "unknown", src: url };
}

/* ------------------ component ------------------ */
export default function VideoEmbed({
  url,
  title = "Video demo",
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  poster,
  useNoCookie = false,
}) {
  const embed = useMemo(
    () => resolveEmbed(url, { autoplay, muted, loop, controls, useNoCookie }),
    [url, autoplay, muted, loop, controls, useNoCookie]
  );

  // No URL configured
  if (embed?.type === "none") {
    return (
      <div className="video-container video-empty">
        <div className="video-empty-inner">No video configured.</div>
      </div>
    );
  }

  // SharePoint / OneDrive (Stream on SharePoint)
  if (embed?.type === "sharepoint") {
    return (
      <div className="video-container" aria-label={title}>
        <iframe
          key={embed.src}
          src={embed.src}
          title={title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ border: 0, position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  // SharePoint link that is not an embed URL
  if (embed?.type === "sharepoint-missing-embed") {
    return (
      <div className="video-container video-empty">
        <div className="video-empty-inner">
          This SharePoint link can’t be embedded as-is.  
          Use an <code>embed.aspx?UniqueId=…</code> or <code>doc.aspx?action=embedview</code> link (copy the <code>src</code> from SharePoint’s “Embed” dialog).
        </div>
      </div>
    );
  }

  // YouTube / Vimeo
  if (embed?.type === "youtube" || embed?.type === "vimeo") {
    return (
      <div className="video-container" aria-label={title}>
        <iframe
          key={embed.src}
          src={embed.src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: 0, position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  // Direct file (mp4/webm/ogg) — ✅ guarded
  if (embed?.type === "file" && embed?.src) {
    return (
      <div className="video-container" aria-label={title}>
        <video
          key={embed.src}
          src={embed.src}
          controls={controls}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          playsInline
          preload="metadata"
          poster={poster}
          style={{ backgroundColor: "#000", position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  // Unknown / unsupported
  return (
    <div className="video-container video-empty">
      <div className="video-empty-inner">
        Unsupported video URL. Provide a SharePoint <code>embed</code> link, YouTube/Vimeo link, or a direct <code>.mp4</code>/<code>.webm</code> file.
      </div>
    </div>
  );
}