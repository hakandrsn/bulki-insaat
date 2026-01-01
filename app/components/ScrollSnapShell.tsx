"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type NavItem = {
  id: string;
  label: string;
};

function TopNav({
  items,
  visible,
  atTop,
  onNavigate,
}: {
  items: NavItem[];
  visible: boolean;
  atTop: boolean;
  onNavigate: (id: string) => void;
}) {
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-all duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto max-w-6xl px-4 sm:px-6",
          "pt-3",
        ].join(" ")}
      >
        <div
          className={[
            "flex items-center justify-between gap-3 rounded-2xl",
            "border border-black/10",
            "backdrop-blur-md",
            atTop ? "bg-white/40" : "bg-white/75",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={() => onNavigate("giris")}
            className={[
              "px-4 py-3 text-sm font-semibold tracking-tight text-zinc-900",
              "hover:bg-black/5 transition-colors rounded-2xl",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30",
            ].join(" ")}
            aria-label="En üste git"
          >
            Bulki
          </button>

          <nav className="flex items-center gap-1 pr-2">
            {items.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => onNavigate(it.id)}
                className={[
                  "px-3 py-2 text-sm text-zinc-700",
                  "rounded-xl hover:bg-black/5 hover:text-zinc-900 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30",
                ].join(" ")}
              >
                {it.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function ScrollSnapShell({
  navItems,
  children,
}: {
  navItems: NavItem[];
  children: ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [navVisible, setNavVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);

  const items = useMemo(() => navItems, [navItems]);

  const scrollToId = useCallback((id: string) => {
    const root = scrollRef.current;
    if (!root) return;

    const target = root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      window.history.replaceState(null, "", `#${id}`);
    } catch {
      // no-op
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    lastYRef.current = el.scrollTop;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const y = el.scrollTop;
        const delta = y - lastYRef.current;

        const nowAtTop = y < 16;
        setAtTop(nowAtTop);

        if (nowAtTop) {
          setNavVisible(true);
        } else if (delta > 8) {
          setNavVisible(false);
        } else if (delta < -8) {
          setNavVisible(true);
        }

        lastYRef.current = y;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const a = target.closest("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const raw = href.slice(1);
      if (!raw) return;

      e.preventDefault();
      const id = decodeURIComponent(raw);
      scrollToId(id);
    };

    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [scrollToId]);

  useEffect(() => {
    const fromHash = () => {
      const raw = window.location.hash?.slice(1);
      if (!raw) return;
      const id = decodeURIComponent(raw);
      scrollToId(id);
    };

    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [scrollToId]);

  return (
    <>
      <TopNav
        items={items}
        visible={navVisible}
        atTop={atTop}
        onNavigate={scrollToId}
      />

      <main
        ref={scrollRef}
        className={[
          "h-dvh w-full overflow-y-scroll scroll-smooth",
          "snap-y snap-mandatory",
          "no-scrollbar",
        ].join(" ")}
      >
        {children}
      </main>
    </>
  );
}


