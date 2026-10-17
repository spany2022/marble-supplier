"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useEnquiry } from "@/components/EnquiryContext";
import { getLenis } from "@/lib/scroll";
import { business, telHref } from "@/content/business";

const nav = [
  { href: "/collections", label: "Collections" },
  { href: "/#discover", label: "Materials" },
  { href: "/#inspiration", label: "Inspiration" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { requestQuote } = useEnquiry();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      menuRef.current?.querySelector<HTMLElement>("a")?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          toggleRef.current?.focus();
        }
        if (e.key === "Tab" && menuRef.current) {
          const f = menuRef.current.querySelectorAll<HTMLElement>("a, button");
          const first = f[0];
          const lastEl = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        lenis?.start();
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const light = !solid && !open;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 bg-charcoal px-4 py-3 text-sm font-bold text-ivory focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid && !open ? "bg-ivory/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="site-x mx-auto flex h-[4.5rem] max-w-site items-center justify-between gap-6 lg:h-20">
          <Link href="/" aria-label={`${business.name} — home`} className="relative z-10">
            <Logo tone={light || open ? "light" : "dark"} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => {
                const active = item.href === pathname || (item.href === "/collections" && pathname.startsWith("/collections"));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative py-2 text-[0.78rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                        light ? "text-ivory/85 hover:text-ivory" : "text-charcoal/75 hover:text-charcoal"
                      } ${active ? (light ? "!text-ivory" : "!text-charcoal") : ""}`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-brass transition-transform duration-500 ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => requestQuote()}
              className={`hidden min-h-11 items-center px-5 text-[0.74rem] font-extrabold uppercase tracking-[0.16em] transition-colors sm:inline-flex ${
                light ? "bg-ivory text-charcoal hover:bg-brass" : "bg-charcoal text-ivory hover:bg-brass-deep"
              }`}
            >
              Request a Quote
            </button>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
              className={`relative z-10 grid size-11 place-items-center lg:hidden ${light || open ? "text-ivory" : "text-charcoal"}`}
            >
              {open ? <X className="size-6" strokeWidth={2.25} /> : <Menu className="size-6" strokeWidth={2.25} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col bg-charcoal pt-24 text-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="site-x flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-line-light">
                <Link href={item.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4">
                  <span className="text-xs font-bold text-brass">0{i + 1}</span>
                  <span className="display-md">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-x space-y-3 pb-8 pt-6">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              requestQuote();
            }}
            className="flex min-h-14 w-full items-center justify-center bg-brass text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-charcoal"
          >
            Request a Quote
          </button>
          {business.phone && (
            <a
              href={telHref(business.phone)}
              className="flex min-h-14 w-full items-center justify-center border-2 border-ivory/30 text-[0.8rem] font-extrabold uppercase tracking-[0.16em]"
            >
              Call {business.phone}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
