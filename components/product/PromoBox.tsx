'use client'
import React from 'react'

/* =====================================================
   PromoBox — Modern promo banner (Next.js + Tailwind)
   - Fresh header with icon, optional gradients, outline mode
   - Multiple built‑in icons: gift, percent, tag, ticket, bolt,
     megaphone, sparkles, fire, truck
   - Keep simple API: title + children; customize via tone/icon
===================================================== */

// ---------- Icons (inline SVG, no deps) ----------
function GiftIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7h16Z" />
            <path d="M2 7h20v5H2z" />
            <path d="M12 7v14" />
            <path d="M12 7c-1.5 0-4-.7-4-2.5S10.5 2 12 5" />
            <path d="M12 7c1.5 0 4-.7 4-2.5S13.5 2 12 5" />
        </svg>
    )
}
function PercentIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M19 5 5 19" />
            <circle cx="7.5" cy="7.5" r="2" />
            <circle cx="16.5" cy="16.5" r="2" />
        </svg>
    )
}
function TagIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M20.59 13.41 12 22l-8-8 8-8 8.59 8.41Z" />
            <circle cx="7.5" cy="14.5" r="1.5" />
        </svg>
    )
}
function TicketIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3 8a3 3 0 0 0 0 6v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2Z" />
            <path d="M12 6v12" />
        </svg>
    )
}
function BoltIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
            <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
    )
}
function MegaphoneIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3 11h4l10-5v12l-10-5H3z" />
            <path d="M7 16v2a3 3 0 0 0 3 3h1" />
        </svg>
    )
}
function SparklesIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M12 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM5 14l.8 1.6L7.5 17l-1.7.4L5 19l-.8-1.6L2.5 17l1.7-.4L5 14z" />
        </svg>
    )
}
function FireIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M12 3s-2 2-2 5a4 4 0 0 0 8 0c0 5-3 9-8 9a6 6 0 0 1-6-6c0-3 2-6 6-8z" />
        </svg>
    )
}
function TruckIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3 7h12v8H3z" />
            <path d="M15 11h4l2 2v2h-6z" />
            <circle cx="7" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
        </svg>
    )
}

const ICONS = {
    gift: GiftIcon,
    percent: PercentIcon,
    tag: TagIcon,
    ticket: TicketIcon,
    bolt: BoltIcon,
    megaphone: MegaphoneIcon,
    sparkles: SparklesIcon,
    fire: FireIcon,
    truck: TruckIcon,
}

type Tone =
    | 'red'
    | 'emerald'
    | 'sky'
    | 'blue'
    | 'amber'
    | 'purple'
    | 'rose'
    | 'slate'
    | 'gradient-sunset'
    | 'gradient-ocean'

const toneHeader: Record<Tone, string> = {
    red: 'bg-[#c40b0b]',
    emerald: 'bg-emerald-600',
    sky: 'bg-sky-600',
    blue: 'bg-blue-600',
    amber: 'bg-amber-500 text-slate-900',
    purple: 'bg-purple-600',
    rose: 'bg-rose-600',
    slate: 'bg-slate-900',
    'gradient-sunset': 'bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500',
    'gradient-ocean': 'bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500',
}

const toneBorder: Record<Tone, string> = {
    red: 'border-red-200',
    emerald: 'border-emerald-200',
    sky: 'border-sky-200',
    blue: 'border-blue-200',
    amber: 'border-amber-200',
    purple: 'border-purple-200',
    rose: 'border-rose-200',
    slate: 'border-slate-200',
    'gradient-sunset': 'border-orange-200',
    'gradient-ocean': 'border-cyan-200',
}

export type PromoBoxProps = {
    title?: string
    icon?: keyof typeof ICONS
    tone?: Tone
    outline?: boolean // header outline instead of solid
    className?: string
    children?: React.ReactNode
    actions?: React.ReactNode // optional CTA row in footer
}

export default function PromoBox({
    title = 'Khuyến mại',
    icon = 'gift',
    tone = 'red',
    outline = false,
    className = '',
    children,
    actions,
}: PromoBoxProps) {
    const Icon = ICONS[icon] || GiftIcon
    const borderCls = toneBorder[tone]
    const headerBg = toneHeader[tone]

    return (
        <div className={`rounded-xl border ${borderCls} bg-white/60 backdrop-blur-sm ${className}`}>
            {/* Header */}
            <div
                className={`flex items-center gap-2 px-3 py-2 text-[13px] font-semibold ${outline ? 'text-slate-800' : 'text-white'} ${outline ? 'bg-white' : headerBg} rounded-t-xl border-b ${borderCls}`}
            >
                <div className={`grid h-6 w-6 place-items-center rounded-md ${outline ? 'bg-white border ' + borderCls : 'bg-white/10'} `}>
                    <Icon className={outline ? 'h-4 w-4 text-slate-700' : 'h-4 w-4'} />
                </div>
                <span className="tracking-wide">{title}</span>
                
            </div>

            {/* Body */}
            <div className="px-3 py-2 text-[13px] leading-6 text-slate-800">
                {children}
            </div>

            {/* Actions (optional) */}
            {actions && (
                <div className={`flex items-center justify-end gap-2 px-3 py-2 border-t ${borderCls}`}>
                    {actions}
                </div>
            )}
        </div>
    )
}

/* -----------------------------------------------------
USAGE

<PromoBox icon="percent" tone="gradient-sunset">
  <ul className="list-disc pl-5">
    <li>Giảm trực tiếp <b>10%</b> cho đơn từ 2.000.000đ</li>
    <li>Tặng <b>bóng LED dự phòng</b> cho combo 5 sản phẩm</li>
    <li>Miễn phí vận chuyển nội thành</li>
  </ul>
</PromoBox>

// Outline header + icon khác
<PromoBox title="Ưu đãi đặc biệt" icon="ticket" tone="purple" outline>
  <p>Nhập mã <b>MAXBEN10</b> tại bước thanh toán để giảm thêm 10%.</p>
</PromoBox>

// Với CTA
<PromoBox icon="megaphone" tone="emerald" actions={<button className="px-3 py-1.5 text-[12px] rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Xem chi tiết</button>}>Mua 3 tặng 1 cho dòng Spotlight.</PromoBox>
----------------------------------------------------- */
