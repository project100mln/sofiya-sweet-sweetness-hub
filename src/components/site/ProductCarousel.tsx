import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/catalog";

export function ProductCarousel({ items, title, subtitle, action }: {
  items: Product[]; title: string; subtitle?: string; action?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };
  return (
    <section className="container-page py-14 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
          {subtitle && <p className="mt-2 text-muted-foreground max-w-xl">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <button onClick={() => scroll(-1)} aria-label="Назад" className="hidden md:grid h-11 w-11 place-items-center rounded-full border border-border hover:border-primary hover:text-primary">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Далее" className="hidden md:grid h-11 w-11 place-items-center rounded-full border border-border hover:border-primary hover:text-primary">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {items.map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-[78%] sm:w-[46%] md:w-[32%] lg:w-[24%]">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
