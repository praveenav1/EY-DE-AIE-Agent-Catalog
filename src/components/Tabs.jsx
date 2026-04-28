import { useEffect, useId, useRef, useState } from "react";

/**
 * Accessible Tabs (WAI-ARIA pattern).
 * Arrow keys navigate tabs; Home/End jump.
 */
export default function Tabs({ tabs, initial = 0 }) {
  const [index, setIndex] = useState(initial);
  const listRef = useRef(null);
  const baseId = useId();

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const buttons = el.querySelectorAll("[role=tab]");
    function onKey(e) {
      const map = { ArrowRight: 1, ArrowLeft: -1 };
      if (e.key === "Home") { buttons[0]?.focus(); setIndex(0); return; }
      if (e.key === "End") { const last = buttons.length - 1; buttons[last]?.focus(); setIndex(last); return; }
      if (!(e.key in map)) return;
      e.preventDefault();
      const next = (index + map[e.key] + buttons.length) % buttons.length;
      buttons[next]?.focus();
      setIndex(next);
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <div className="tabs">
      <div className="tablist" role="tablist" aria-label="Agent details tabs" ref={listRef}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={i === index}
            aria-controls={`${baseId}-panel-${i}`}
            id={`${baseId}-tab-${i}`}
            className="tab"
            onClick={() => setIndex(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== index}
          className="tabpanel"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
