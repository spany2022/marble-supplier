"use client";

import Button from "@/components/ui/Button";
import { useEnquiry } from "@/components/EnquiryContext";

/** Request-a-quote trigger usable from server components. */
export default function QuoteButton({
  material,
  product,
  label = "Request a Quote",
  variant = "dark",
  magnetic = false,
  className,
}: {
  material?: string;
  product?: string;
  label?: string;
  variant?: "dark" | "light" | "brass" | "outline-light" | "outline-dark";
  magnetic?: boolean;
  className?: string;
}) {
  const { requestQuote } = useEnquiry();
  return (
    <Button variant={variant} magnetic={magnetic} className={className} onClick={() => requestQuote({ material, product })}>
      {label}
    </Button>
  );
}
