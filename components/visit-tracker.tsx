"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

function getVisitorId() {
  try {
    const existing = window.localStorage.getItem("zigo-visitor-id");

    if (existing) {
      return existing;
    }

    const nextId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    window.localStorage.setItem("zigo-visitor-id", nextId);
    return nextId;
  } catch {
    return `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    const path = `${pathname}${window.location.search || ""}`;
    const sessionKey = `zigo-visit:${path}`;

    try {
      if (window.sessionStorage.getItem(sessionKey)) {
        return;
      }

      window.sessionStorage.setItem(sessionKey, "1");
    } catch {
      // Tracking can still continue if sessionStorage is unavailable.
    }

    const sendVisit = () => {
      const payload = JSON.stringify({
        visitorId: getVisitorId(),
        path,
        title: document.title,
        referrer: document.referrer,
      });

      if ("sendBeacon" in navigator) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/visit", blob);
        return;
      }

      fetch("/api/analytics/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
        keepalive: true,
      }).catch(() => undefined);
    };

    const idleWindow = window as IdleWindow;

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(sendVisit, { timeout: 1800 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(sendVisit, 900);
    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
