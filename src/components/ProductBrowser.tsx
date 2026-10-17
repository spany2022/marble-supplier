"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  applications,
  categories,
  colours,
  products,
  type CategoryKey,
  type Product,
} from "@/content/catalogue";
import ProductCard from "@/components/ProductCard";

type Filters = { category: CategoryKey | "all"; q: string; colour: string; finish: string; application: string; style: string };

type Props = {
  initialCategory?: CategoryKey | "all";
  /** Hide the category tabs (used on single-collection pages). */
  lockCategory?: boolean;
  /** Show N products first, then "Show more". */
  pageSize?: number;
  /** Mirror filters into the URL query (?category=&q=…) so results are shareable. */
  syncUrl?: boolean;
  /** Show tile-style filter (Tile Showroom). */
  showTileStyle?: boolean;
};

const finishes = Array.from(new Set(products.map((p) => p.finish).filter((f): f is string => Boolean(f)))).sort();
const tileStyles = Array.from(new Set(products.map((p) => p.tileStyle).filter((s): s is NonNullable<Product["tileStyle"]> => Boolean(s))));

const isCategory = (v: string | null): v is CategoryKey => categories.some((c) => c.key === v);

function matches(p: Product, f: Filters) {
  if (f.category !== "all" && p.category !== f.category) return false;
  if (f.colour && p.colour !== f.colour) return false;
  if (f.finish && p.finish !== f.finish) return false;
  if (f.application && !p.applications.includes(f.application as Product["applications"][number])) return false;
  if (f.style && p.tileStyle !== f.style) return false;
  if (f.q) {
    const hay = `${p.name} ${p.summary} ${p.description} ${p.colour} ${p.finish ?? ""} ${p.category.replace("-", " ")} ${p.applications.join(" ")} ${p.tileStyle ?? ""}`.toLowerCase();
    return f.q
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .every((term) => hay.includes(term));
  }
  return true;
}

export default function ProductBrowser({
  initialCategory = "all",
  lockCategory = false,
  pageSize = 12,
  syncUrl = false,
  showTileStyle = false,
}: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [filters, setFilters] = useState<Filters>(() => {
    const fromUrl = syncUrl ? params.get("category") : null;
    return {
      category: isCategory(fromUrl) ? fromUrl : initialCategory,
      q: (syncUrl && params.get("q")) || "",
      colour: (syncUrl && params.get("colour")) || "",
      finish: (syncUrl && params.get("finish")) || "",
      application: (syncUrl && params.get("application")) || "",
      style: (syncUrl && params.get("style")) || "",
    };
  });
  const [query, setQuery] = useState(filters.q);
  const [visible, setVisible] = useState(pageSize);
  const [showFilters, setShowFilters] = useState(false);

  const update = (patch: Partial<Filters>) =>
    startTransition(() => {
      setFilters((f) => ({ ...f, ...patch }));
      setVisible(pageSize);
    });

  // Debounce the free-text search.
  useEffect(() => {
    if (query === filters.q) return;
    const t = window.setTimeout(() => update({ q: query.trim() }), 220);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Follow external URL changes (style links, back/forward) when synced.
  const paramsKey = params.toString();
  const [seenParams, setSeenParams] = useState(paramsKey);
  if (syncUrl && paramsKey !== seenParams) {
    setSeenParams(paramsKey);
    const cat = params.get("category");
    const next: Filters = {
      category: lockCategory ? filters.category : isCategory(cat) ? cat : "all",
      q: params.get("q") ?? "",
      colour: params.get("colour") ?? "",
      finish: params.get("finish") ?? "",
      application: params.get("application") ?? "",
      style: params.get("style") ?? "",
    };
    if ((Object.keys(next) as (keyof Filters)[]).some((k) => next[k] !== filters[k])) {
      setFilters(next);
      setQuery(next.q);
    }
  }

  useEffect(() => {
    if (!syncUrl) return;
    const qs = new URLSearchParams();
    if (filters.category !== "all" && !lockCategory) qs.set("category", filters.category);
    (["q", "colour", "finish", "application", "style"] as const).forEach((k) => filters[k] && qs.set(k, filters[k]));
    const next = qs.toString();
    if (next !== params.toString()) router.replace(`${pathname}${next ? `?${next}` : ""}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, syncUrl]);

  const results = useMemo(() => products.filter((p) => matches(p, filters)), [filters]);
  const counts = useMemo(() => {
    const base = { ...filters, category: "all" as const };
    const all = products.filter((p) => matches(p, base));
    return Object.fromEntries([["all", all.length], ...categories.map((c) => [c.key, all.filter((p) => p.category === c.key).length])]);
  }, [filters]);

  const activeExtras = (["colour", "finish", "application", "style"] as const).filter((k) => filters[k]).length + (filters.q ? 1 : 0);

  const reset = () => {
    setQuery("");
    update({ q: "", colour: "", finish: "", application: "", style: "", ...(lockCategory ? {} : { category: "all" }) });
  };

  const selectCls =
    "select-arrow min-h-12 w-full border-2 border-line bg-marble px-4 text-[0.85rem] font-bold text-charcoal transition-colors hover:border-charcoal focus:border-charcoal focus:outline-none";

  return (
    <div>
      {!lockCategory && (
        <div className="no-scrollbar -mx-[clamp(1rem,4vw,3.5rem)] overflow-x-auto px-[clamp(1rem,4vw,3.5rem)]">
          <div role="group" aria-label="Filter by material" className="flex w-max gap-2 border-b-2 border-charcoal pb-4">
            {[{ key: "all" as const, label: "All Products" }, ...categories].map((c) => {
              const active = filters.category === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update({ category: c.key })}
                  className={`inline-flex min-h-12 items-center gap-2 px-5 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] transition-colors ${
                    active ? "bg-charcoal text-ivory" : "text-charcoal hover:bg-charcoal/5"
                  }`}
                >
                  {c.label}
                  <span className={`text-[0.68rem] ${active ? "text-brass" : "text-slate-ink"}`}>{counts[c.key]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search materials</span>
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-ink" strokeWidth={2.5} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, colour, finish or use — e.g. “white flooring”"
            className="min-h-12 w-full border-2 border-line bg-marble pl-11 pr-4 text-[0.95rem] font-semibold placeholder:text-slate-ink/80 hover:border-charcoal focus:border-charcoal focus:outline-none"
          />
        </label>
        <button
          type="button"
          aria-expanded={showFilters}
          aria-controls="more-filters"
          onClick={() => setShowFilters((s) => !s)}
          className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-charcoal px-5 text-[0.78rem] font-extrabold uppercase tracking-[0.14em] transition-colors hover:bg-charcoal hover:text-ivory md:hidden"
        >
          <SlidersHorizontal aria-hidden className="size-4" /> Filters {activeExtras > 0 && `(${activeExtras})`}
        </button>
      </div>

      <div
        id="more-filters"
        className={`mt-3 grid gap-3 sm:grid-cols-2 md:grid ${showTileStyle ? "md:grid-cols-4" : "md:grid-cols-3"} ${showFilters ? "grid" : "hidden"}`}
      >
        <label>
          <span className="sr-only">Colour</span>
          <select value={filters.colour} onChange={(e) => update({ colour: e.target.value })} className={selectCls}>
            <option value="">Any colour</option>
            {colours.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Finish</span>
          <select value={filters.finish} onChange={(e) => update({ finish: e.target.value })} className={selectCls}>
            <option value="">Any finish</option>
            {finishes.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Application</span>
          <select value={filters.application} onChange={(e) => update({ application: e.target.value })} className={selectCls}>
            <option value="">Any application</option>
            {applications.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        {showTileStyle && (
          <label>
            <span className="sr-only">Tile style</span>
            <select value={filters.style} onChange={(e) => update({ style: e.target.value })} className={selectCls}>
              <option value="">Any tile style</option>
              {tileStyles.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-[0.8rem] font-extrabold uppercase tracking-[0.16em]">
          {isPending ? "Updating…" : `${results.length} ${results.length === 1 ? "material" : "materials"}`}
        </p>
        {activeExtras > 0 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-extrabold uppercase tracking-[0.14em] text-brass-deep hover:text-charcoal"
          >
            <X aria-hidden className="size-3.5" strokeWidth={3} /> Clear filters
          </button>
        )}
      </div>

      <div aria-busy={isPending} className={`mt-5 transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>
        {results.length > 0 ? (
          <>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.slice(0, visible).map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
            {visible < results.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + pageSize)}
                  className="inline-flex min-h-14 items-center gap-3 border-2 border-charcoal px-8 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] transition-colors hover:bg-charcoal hover:text-ivory"
                >
                  Show more <span className="text-brass-deep">({results.length - visible})</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center border-2 border-dashed border-line px-6 py-20 text-center">
            <p className="display-sm">No materials match.</p>
            <p className="mt-4 max-w-md text-slate-ink">
              Try a broader search or fewer filters — or tell us what you have in mind and we&apos;ll suggest options.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex min-h-12 items-center bg-charcoal px-6 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-ivory hover:bg-brass-deep"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductBrowserFallback() {
  return (
    <div aria-hidden>
      <div className="skeleton h-14 w-full" />
      <div className="skeleton mt-6 h-12 w-full" />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="border border-line bg-marble">
            <div className="skeleton aspect-[4/3.4]" />
            <div className="space-y-3 p-6">
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
