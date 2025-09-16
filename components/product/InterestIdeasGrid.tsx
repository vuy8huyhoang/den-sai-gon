"use client"
import React from "react"

/* =====================================================
   InterestIdeasGrid — gợi ý nhanh các nhóm sản phẩm
   - Hiển thị giống các "thẻ"/nút hiện đại (chip card)
   - Tùy biến: tiêu đề, màu nhấn, danh sách item, variant
   - Hỗ trợ link (href) hoặc onSelect callback
   - Next.js + TailwindCSS
===================================================== */

export type IdeaItem = {
    label: string
    href?: string
    icon?: React.ReactNode
    color?: string // màu nhấn riêng cho item (mặc định dùng brand)
    id?: string | number
}

export type InterestIdeasGridProps = {
    title?: string
    subtitle?: string
    items: IdeaItem[]
    brandColor?: string
    variant?: "card" | "pill" // card = ô bo góc, pill = viên thuốc
    onSelect?: (item: IdeaItem) => void
    className?: string
}

const DEFAULT_BRAND = "#079553"

function SparkleIcon({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M12 2l1.6 3.7L17 7.3l-3.4 1.6L12 12l-1.6-3.1L7 7.3l3.4-1.6L12 2z" />
            <path d=
                "M20 12l1 2.3 2.3 1L21 16l-1 2.3L19 16l-2.3-.7 2.3-1zM4 12l.8 1.9L7 14l-2.2.7L4 17l-.8-2.3L1 14l2.2-.1z" />
        </svg>
    )
}

function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
    )
}

export default function InterestIdeasGrid({
    title = "Bạn đang quan tâm dòng sản phẩm nào?",
    subtitle,
    items,
    brandColor = DEFAULT_BRAND,
    variant = "card",
    onSelect,
    className = "",
}: InterestIdeasGridProps) {
    return (
        <section className={`w-full container-x mb-4 ${className}`}>
            {/* Header */}
            <div className="mb-3 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] text-slate-600">
                    <span className="inline-grid h-4 w-4 place-items-center rounded-full bg-emerald-50 text-emerald-700">
                        <SparkleIcon className="h-3 w-3" />
                    </span>
                    Gợi ý nhanh
                </div>
                <h2 className="mt-2 text-[18px] md:text-[20px] font-extrabold tracking-tight text-slate-900">
                    {title}
                </h2>
                {subtitle && <p className="mt-1 text-[13px] text-slate-600">{subtitle}</p>}
            </div>

            {/* Grid (auto-fit) */}
            <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
            >
                {items.map((it, idx) => {
                    const color = it.color || brandColor
                    const common =
                        "group relative w-full select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition"

                    const content = (
                        <div
                            className={
                                variant === "pill"
                                    ? "flex items-center justify-between gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[13px] text-slate-800 hover:border-emerald-300 hover:bg-emerald-50"
                                    : "flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-800 shadow-[0_1px_0_rgba(0,0,0,0.02)] hover:shadow-md hover:border-emerald-300"
                            }
                        >
                            <span className="flex items-center gap-2">
                                {/* left accent dot */}
                                <span
                                    className="inline-block h-2.5 w-2.5 rounded-full"
                                    style={{ background: color }}
                                />
                                {/* optional icon */}
                                {it.icon && <span className="text-slate-700">{it.icon}</span>}
                                <span className="font-semibold line-clamp-1">{it.label}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />

                            {/* subtle radial highlight */}
                            <span
                                aria-hidden
                                className="pointer-events-none absolute -inset-1 rounded-[inherit] opacity-0 group-hover:opacity-100"
                                style={{ background: "radial-gradient(120px 60px at 50% -30%, rgba(16,185,129,.12), transparent)" }}
                            />
                        </div>
                    )

                    if (it.href) {
                        return (
                            <a
                                key={it.id ?? idx}
                                href={it.href}
                                className={common}
                                onClick={(e) => {
                                    if (onSelect) {
                                        onSelect(it)
                                    }
                                }}
                            >
                                {content}
                            </a>
                        )
                    }

                    return (
                        <button
                            key={it.id ?? idx}
                            type="button"
                            className={common}
                            onClick={() => onSelect?.(it)}
                        >
                            {content}
                        </button>
                    )
                })}
            </div>
        </section>
    )
}

/* -----------------------------------------------------
USAGE

<InterestIdeasGrid
  items={[
    { label: 'ĐÈN LED ÂM TRẦN MAXBEN', href: '/den-am-tran-maxben' },
    { label: 'Đèn led âm trần 9W, 10W', href: '/den-am-tran?power=9-10' },
    { label: 'Đèn trần', href: '/den-tran' },
    { label: 'Đèn LED MAXBEN', href: '/maxben' },
    { label: 'Đèn LED âm trần 3 màu', href: '/den-am-tran-3-mau' },
    { label: 'Đèn LED âm trần', href: '/den-am-tran' },
  ]}
  variant="card" // hoặc "pill"
/>
----------------------------------------------------- */
