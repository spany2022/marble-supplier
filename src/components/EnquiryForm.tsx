"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AlertCircle, ArrowUpRight, Check, Loader2, MessageCircle, X } from "lucide-react";
import { useEnquiry } from "@/components/EnquiryContext";
import { business, whatsappHref } from "@/content/business";
import {
  emptyEnquiry,
  enquirySummary,
  materialOptions,
  normalise,
  projectTypes,
  validate,
  type EnquiryInput,
  type FieldErrors,
} from "@/lib/enquiry";

type Status = "idle" | "submitting" | "success" | "error";

export default function EnquiryForm({ initial }: { initial?: { material?: string; product?: string } }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const { prefill } = useEnquiry();
  const [values, setValues] = useState<EnquiryInput>(() => ({
    ...emptyEnquiry,
    material: materialOptions.some((m) => m.value === initial?.material) ? initial!.material! : "",
    product: initial?.product?.slice(0, 120) ?? "",
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState<EnquiryInput | null>(null);

  // A "Request Price" click elsewhere on the page prefills material + product.
  useEffect(() => {
    if (!prefill) return;
    setStatus((s) => (s === "success" ? "idle" : s));
    setValues((v) => ({
      ...v,
      material: prefill.material && materialOptions.some((m) => m.value === prefill.material) ? prefill.material : v.material,
      product: prefill.product ?? "",
    }));
  }, [prefill]);

  const set = (key: keyof EnquiryInput, value: string) => {
    setValues((v) => {
      const next = { ...v, [key]: value };
      if (touched[key]) setErrors(validate(normalise(next)));
      return next;
    });
  };

  const blur = (key: keyof EnquiryInput) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(normalise(values)));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalise(values);
    const errs = validate(clean);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(emptyEnquiry).map((k) => [k, true])));
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors; message?: string };
      if (res.ok && data.ok) {
        setSent(clean);
        setStatus("success");
        setValues(emptyEnquiry);
        setTouched({});
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.message ?? "We couldn't send your enquiry. Please check the form and try again.");
      setStatus("error");
    } catch {
      setServerError("Network problem — your enquiry wasn't sent. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success" && sent) {
    return (
      <div role="status" className="flex h-full flex-col justify-center bg-marble p-8 md:p-12">
        <span className="grid size-16 place-items-center bg-charcoal text-brass">
          <Check className="size-8" strokeWidth={2.5} />
        </span>
        <h3 className="display-md mt-8">Enquiry received.</h3>
        <p className="lede mt-5 max-w-lg text-slate-ink">
          Thank you, {sent.name.split(" ")[0]}. We&apos;ll be in touch on <strong className="text-charcoal">{sent.phone}</strong>
          {sent.email ? <> or at <strong className="text-charcoal">{sent.email}</strong></> : null} to discuss your project.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="inline-flex min-h-14 items-center border-2 border-charcoal px-6 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] hover:bg-charcoal hover:text-ivory"
          >
            Send another enquiry
          </button>
          {business.whatsapp && (
            <a
              href={whatsappHref(business.whatsapp, enquirySummary(sent))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center gap-2 bg-charcoal px-6 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-ivory hover:bg-brass-deep"
            >
              <MessageCircle aria-hidden className="size-4" /> Continue on WhatsApp
            </a>
          )}
        </div>
      </div>
    );
  }

  const field = (key: keyof EnquiryInput) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    "aria-invalid": touched[key] && errors[key] ? true : undefined,
    "aria-describedby": touched[key] && errors[key] ? `${uid}-${key}-err` : undefined,
    onBlur: () => blur(key),
  });

  const inputCls = (key: keyof EnquiryInput) =>
    `mt-2 block min-h-14 w-full border-2 bg-marble px-4 text-[1rem] font-semibold text-charcoal placeholder:font-medium placeholder:text-slate-ink/70 transition-colors focus:outline-none ${
      touched[key] && errors[key] ? "border-red-700" : "border-line hover:border-charcoal/50 focus:border-charcoal"
    }`;

  const label = (k: keyof EnquiryInput, children: React.ReactNode, optional = false) => (
    <label htmlFor={`${uid}-${k}`} className="flex items-baseline justify-between gap-3 text-[0.74rem] font-extrabold uppercase tracking-[0.14em]">
      <span>
        {children}
        {!optional && <span aria-hidden className="text-brass-deep"> *</span>}
      </span>
      {optional && <span className="text-[0.66rem] font-bold tracking-[0.1em] text-slate-ink">Optional</span>}
    </label>
  );

  const err = (k: keyof EnquiryInput) =>
    touched[k] && errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 flex items-start gap-1.5 text-[0.85rem] font-semibold text-red-700">
        <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" /> {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={submit} noValidate aria-label="Enquiry form" className="relative bg-marble p-6 sm:p-8 md:p-12">
      {values.product && (
        <p className="mb-8 flex items-center justify-between gap-3 border-l-4 border-brass-deep bg-ivory px-4 py-3 text-[0.9rem] font-semibold">
          <span>
            Enquiring about <strong className="font-extrabold">{values.product}</strong>
          </span>
          <button type="button" onClick={() => set("product", "")} aria-label="Remove selected product" className="grid size-9 place-items-center hover:bg-charcoal/5">
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          {label("name", "Full name")}
          <input {...field("name")} type="text" autoComplete="name" required onChange={(e) => set("name", e.target.value)} className={inputCls("name")} />
          {err("name")}
        </div>
        <div>
          {label("phone", "Phone number")}
          <input
            {...field("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+91 …"
            onChange={(e) => set("phone", e.target.value)}
            className={inputCls("phone")}
          />
          {err("phone")}
        </div>
        <div>
          {label("email", "Email address", true)}
          <input {...field("email")} type="email" autoComplete="email" onChange={(e) => set("email", e.target.value)} className={inputCls("email")} />
          {err("email")}
        </div>
        <div>
          {label("material", "Interested material")}
          <select {...field("material")} required onChange={(e) => set("material", e.target.value)} className={`select-arrow ${inputCls("material")}`}>
            <option value="">Select a material</option>
            {materialOptions.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          {err("material")}
        </div>
        <div>
          {label("projectType", "Project type")}
          <select {...field("projectType")} required onChange={(e) => set("projectType", e.target.value)} className={`select-arrow ${inputCls("projectType")}`}>
            <option value="">Select a project type</option>
            {projectTypes.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          {err("projectType")}
        </div>
        <div>
          {label("quantity", "Approximate quantity", true)}
          <input {...field("quantity")} type="text" placeholder="e.g. 1,200 sq ft" onChange={(e) => set("quantity", e.target.value)} className={inputCls("quantity")} />
        </div>
        <div className="sm:col-span-2">
          {label("location", "Project location", true)}
          <input {...field("location")} type="text" autoComplete="address-level2" placeholder="City or area" onChange={(e) => set("location", e.target.value)} className={inputCls("location")} />
        </div>
        <div className="sm:col-span-2">
          {label("requirements", "Project requirements")}
          <textarea
            {...field("requirements")}
            rows={5}
            required
            placeholder="Rooms, surfaces, preferred colours or finishes, timeline…"
            onChange={(e) => set("requirements", e.target.value)}
            className={`${inputCls("requirements")} resize-y py-3`}
          />
          {err("requirements")}
        </div>
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>

      {status === "error" && serverError && (
        <p role="alert" className="mt-8 flex items-start gap-2 border-l-4 border-red-700 bg-red-50 px-4 py-3 text-[0.9rem] font-semibold text-red-800">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" /> {serverError}
        </p>
      )}

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.8rem] leading-relaxed text-slate-ink">
          We use your details only to respond to this enquiry. See our{" "}
          <Link href="/privacy" className="font-bold text-charcoal underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex min-h-[3.75rem] shrink-0 items-center justify-center gap-3 bg-charcoal px-8 text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-brass-deep disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Submit Enquiry
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
