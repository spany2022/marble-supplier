"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { scrollToId } from "@/lib/scroll";

export type Prefill = { material?: string; product?: string; nonce: number };

type Ctx = {
  prefill: Prefill | null;
  /** Prefill the enquiry form and take the visitor to it (on this page, or the contact page). */
  requestQuote: (p?: { material?: string; product?: string }) => void;
};

const EnquiryCtx = createContext<Ctx | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const router = useRouter();

  const requestQuote = useCallback(
    (p: { material?: string; product?: string } = {}) => {
      if (document.getElementById("enquire")) {
        setPrefill({ ...p, nonce: Date.now() });
        scrollToId("enquire", "input[name=name]");
        return;
      }
      const qs = new URLSearchParams();
      if (p.material) qs.set("material", p.material);
      if (p.product) qs.set("product", p.product);
      const query = qs.toString();
      router.push(`/contact${query ? `?${query}` : ""}#enquire`);
    },
    [router]
  );

  const value = useMemo(() => ({ prefill, requestQuote }), [prefill, requestQuote]);
  return <EnquiryCtx.Provider value={value}>{children}</EnquiryCtx.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryCtx);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}
