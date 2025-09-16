"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Chip from "../nav/Chip";
import { CATEGORY_ITEMS } from "../../../lib/data";

// ========================= Types =========================
interface Item { label: string; href?: string }
interface Group { title: string; items: Item[] }
interface MegaMap { [label: string]: Group[] }

// ========================= Data =========================
// Full mega for "Tất cả SP"
const MEGA_CONTENT: MegaMap = {
  "Tất cả SP": [
    {
      title: "Đèn trần", items: [
        { label: "Đèn LED âm trần" },
        { label: "Đèn LED ốp trần" },
        { label: "Đèn LED panel" },
        { label: "Đèn LED ống bơ" },
        { label: "Đèn thả văn phòng" },
      ]
    },
    {
      title: "Đèn trang trí", items: [
        { label: "Đèn chùm" }, { label: "Đèn thả" }, { label: "Đèn cây, Đèn sàn" }, { label: "Đèn bàn" }, { label: "Đèn mâm ốp trần" },
      ]
    },
    {
      title: "Đèn tường", items: [
        { label: "Đèn hắt tường" }, { label: "Đèn gương" }, { label: "Đèn tranh" }, { label: "Đèn âm tường - chân cầu thang" }, { label: "Đèn tường ngoài trời" },
      ]
    },
    {
      title: "Đèn ngoài trời", items: [
        { label: "Đèn Pha LED" }, { label: "Đèn sân vườn" }, { label: "Đèn LED âm đất" }, { label: "Đèn LED âm nước" }, { label: "Đèn trụ cổng" }, { label: "Đèn NLMT" },
      ]
    },
    {
      title: "Đèn led rọi ray", items: [
        { label: "Đèn rọi nam châm" }, { label: "Thanh ray nam châm" }, { label: "Nguồn ray nam châm" }, { label: "Phụ kiện ray nam châm" }, { label: "Đèn rọi ray T2/T3" }, { label: "Thanh ray đèn LED" },
      ]
    },
    {
      title: "Đèn tuýp LED", items: [
        { label: "Đèn tuýp LED bán nguyệt" }, { label: "Đèn tuýp LED T5" }, { label: "Đèn tuýp LED T8" },
      ]
    },
    {
      title: "Bóng đèn LED", items: [
        { label: "Bóng đèn LED tròn" }, { label: "Bóng đèn LED trụ" }, { label: "Bóng đèn LED nến" }, { label: "Bóng LED chân cắm" }, { label: "Bóng LED filament" },
      ]
    },
    {
      title: "Đèn LED dây", items: [
        { label: "Đèn LED dây 220V" }, { label: "Đèn LED dây dán 12V-24V" }, { label: "Phụ kiện đèn LED dây" },
      ]
    },
    {
      title: "Đèn chuyên dụng", items: [
        { label: "Đèn đường" }, { label: "Đèn xưởng" }, { label: "Đèn Exit" }, { label: "Đèn sự cố" }, { label: "Đèn chống ẩm" }, { label: "Đèn chống cháy nổ" },
      ]
    },
    {
      title: "Nguồn - Linh kiện - Máng đèn", items: [
        { label: "Máng đèn" }, { label: "Thanh nhôm đèn LED" }, { label: "Driver - Nguồn LED" },
      ]
    },
    {
      title: "Quạt trần", items: [
        { label: "Quạt trần 5 cánh" }, { label: "Quạt trần 3 cánh" }, { label: "Quạt trần giấu cánh / cánh cụp xòe" },
      ]
    },
    { title: "Thiết bị điện", items: [{ label: "Công tắc - Ổ cắm" }, { label: "Aptomat" }, { label: "Cảm biến" }] },
  ],
};

// Simple list for each chip (like screenshot #2)
const SIMPLE_ITEMS: { [label: string]: string[] } = {
  "Đèn âm trần": [
    "Đèn LED âm trần 3 màu",
    "Đèn LED âm trần rọi",
    "Đèn LED âm trần siêu mỏng",
    "Đèn LED âm trần vuông",
    "Đèn LED âm trần dimmer",
    "Đèn LED âm trần tán quang",
    "Đèn LED âm trần chống chói",
  ],
  "Đèn chùm": ["Đèn chùm pha lê", "Đèn chùm hiện đại", "Đèn chùm tân cổ điển", "Đèn chùm quạt"],
  "Quạt trần": ["Quạt trần 5 cánh", "Quạt trần 3 cánh", "Cánh cụp xoè", "Giấu cánh"],
  "Đèn thả": ["Thả bàn ăn", "Thả ly / thủy tinh", "Thả ống bơ", "Thả vintage"],
  "Đèn tường": ["Hắt tường", "Đèn gương", "Đèn cầu thang", "Ngoài trời"],
  "Đèn rọi ray": ["Rọi ray T2/T3", "Rọi ray nam châm", "Nguồn ray", "Phụ kiện ray"],
  "Đèn LED panel": ["Panel 300x600", "Panel 600x600", "Panel thả", "Panel tấm mỏng"],
  "Đèn bàn, Đèn cây": ["Đèn bàn học", "Đèn bàn làm việc"],
  "Đèn LED pha": ["Đèn Pha LED 100W", "Đèn Pha LED 150W"],
  "Đèn ngoài trời": ["Pha LED", "Trụ cổng", "Sân vườn", "Âm đất", "Âm nước"],
};

// Right-side square preview image for simple dropdowns
const PREVIEW: { [label: string]: string } = {
  "Đèn âm trần": "/den-sai-gon/hinh-anh/am_tran.png",
  "Đèn chùm": "/den-sai-gon/hinh-anh/den_chum.png",
  "Quạt trần": "/den-sai-gon/hinh-anh/quat-tran-5canh.jpg",
  "Đèn thả": "/den-sai-gon/hinh-anh/den_tha.png",
  "Đèn tường": "/den-sai-gon/hinh-anh/den-tuong.jpg",
  "Đèn rọi ray": "/den-sai-gon/hinh-anh/den_roi_ray.png",
  "Đèn LED panel": "/den-sai-gon/hinh-anh/pane.png",
  "Đèn bàn, Đèn cây": "/den-sai-gon/hinh-anh/den_ban.png",
  "Đèn LED pha": '/den-sai-gon/hinh-anh/den_pha_led.png',
  "Đèn ngoài trời": "/den-sai-gon/hinh-anh/den_san_vuon.png",

};

// Width of the simple dropdown panel (used to anchor under chip)
const SIMPLE_PANEL_WIDTH = 560; // widened to host a square preview nicely

export default function HeaderWithCategories() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<"mega" | "simple">("mega");
  const [simpleLeft, setSimpleLeft] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLLIElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (headerRef.current?.contains(t)) return;
      setOpen(false);
      setActive(null);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setActive(null);
    }, 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const openFor = (label: string, index: number) => {
    cancelClose();
    setActive(label);

    if (label === "Tất cả SP") {
      setKind("mega");
      setOpen(true);
      return;
    }

    // compute left for simple dropdown (anchored under hovered chip)
    const chipEl = chipRefs.current[index];
    const headRect = headerRef.current?.getBoundingClientRect();
    const rect = chipEl?.getBoundingClientRect();
    if (headRect && rect) {
      let left = rect.left - headRect.left + rect.width / 2 - SIMPLE_PANEL_WIDTH / 2;
      const min = 12;
      const max = headRect.width - SIMPLE_PANEL_WIDTH - 12;
      left = Math.max(min, Math.min(max, left));
      setSimpleLeft(left);
    }
    setKind("simple");
    setOpen(true);
  };

  const groups: Group[] = MEGA_CONTENT["Tất cả SP"];
  const simpleItems = active ? SIMPLE_ITEMS[active] || [] : [];
  const simplePreview = active ? PREVIEW[active] : undefined;

  return (
    <header
      ref={headerRef}
      className="relative hidden md:block w-full bg-white sticky top-0 z-40 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] py-2 pb-2"
    >
      {/* top bar */}
      <div
        className="h-[72px] container-x grid items-center gap-3"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <div className="shrink-0">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.svg" width={150} height={32} alt="LEDXANH" priority />
          </Link>
        </div>

        {/* Chips row */}
        <nav className="min-w-0">
          <ul className="flex justify-end items-center gap-3">
            {CATEGORY_ITEMS.map((c, i) => (
              <li
                key={i}
                ref={(el) => { chipRefs.current[i] = el; }}
                onMouseEnter={() => openFor(c.label, i)}
                onMouseLeave={scheduleClose}
              >
                <Chip imgSrc={c.img} label={c.label} size={48} active={open && active === c.label} />
              </li>
            ))}
            {/* Search chip remains simple */}
            <li onMouseEnter={scheduleClose}>
              <Chip imgSrc="/den-sai-gon/icons/icon-22.png" label="Tìm kiếm" size={48} />
            </li>
          </ul>
        </nav>
      </div>

      {/* MEGA panel for "Tất cả SP" */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className={[
          "absolute container-x left-0 right-0 top-full origin-top transition-[opacity,transform] duration-150 ease-out",
          open && kind === "mega" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none",
        ].join(" ")}
        aria-hidden={!(open && kind === "mega")}
      >
        <div className="">
          <div className="relative mx-auto rounded-b-2xl border border-t-0 border-slate-200/80 bg-white/95 backdrop-blur shadow-xl">
            <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groups.map((g, idx) => (
                <div key={idx} className="min-w-[220px]">
                  <h4 className="mb-2 text-[15px] font-extrabold tracking-wide text-slate-900">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{g.title}</span>
                  </h4>
                  <ul className="space-y-2">
                    {g.items.map((it, i2) => (
                      <li key={i2}>
                        <Link
                          href={it.href || "#"}
                          className="group inline-flex items-center gap-2 text-[14px] text-slate-700 hover:text-emerald-700"
                        >
                          <span className="text-emerald-600">›</span>
                          <span className="leading-5">{it.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SIMPLE panel (list + square preview) */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        className={[
          "absolute top-full origin-top transition-[opacity,transform] duration-150 ease-out",
          open && kind === "simple" ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none",
        ].join(" ")}
        style={{ left: simpleLeft, width: SIMPLE_PANEL_WIDTH }}
        aria-hidden={!(open && kind === "simple")}
      >
        <div className="rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur shadow-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_220px] gap-0">
            {/* Left: links list */}
            <ul className="p-3 divide-y divide-slate-100">
              {simpleItems.map((t, i) => (
                <li key={i} className="py-2">
                  <Link
                    href="#"
                    className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-[14px] text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-700"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="text-emerald-600">•</span>
                      {t}
                    </span>
                    <span className="opacity-0 translate-x-[-4px] text-emerald-600 group-hover:opacity-100 group-hover:translate-x-0 transition">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: square preview card */}
            <div className="p-3 ">
              <div className="relative aspect-square w-full rounded-xl ring-1 ring-emerald-600/15 shadow-md overflow-hidden">
                {simplePreview ? (
                  <Image
                    src={simplePreview}
                    alt={active || "preview"}
                    fill
                    sizes="220px"
                    className="object-cover"
                    priority={false}
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-slate-400">No preview</div>
                )}
                {/* overlay gradient & caption */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                  <span className="max-w-[70%] truncate text-[12px] font-semibold text-white/95 drop-shadow">{active}</span>
                  <Link
                    href="#"
                    className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-600/20 hover:bg-white"
                  >
                    Xem tất cả
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
