'use client'
import React from 'react'
import { BRAND, type Hotline } from './types'

/* =====================================================
   Hotline + Install Cost CTAs — COLOR VARIANTS
   - Match CTAButtons (height, radius, weight, focus)
   - New props: calcVariant, callVariant, calcBg, callBg, calcClass, callClass
   - Built-in solid/gradient palettes; or pass custom CSS color in calcBg/callBg
===================================================== */

type Variant =
    | 'brand'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'rose'
    | 'amber'
    | 'orange'
    | 'slate'
    | 'black'
    | 'gradient-emerald'
    | 'gradient-sunset'
    | 'gradient-ocean'

function BoltIcon({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
    )
}
function PhoneIcon({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.2 1 .4 2.2.6 3.4.6.5 0 1 .5 1 1V20a1 1 0 0 1-1 1C10 21 3 14 3 5a1 1 0 0 1 1-1h3.4c.5 0 1 .4 1 1 0 1.2.2 2.4.6 3.4.2.4.1.9-.2 1.2l-2.2 2.2Z" />
        </svg>
    )
}
function ShieldIcon({ className = 'h-4 w-4' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    )
}
function Spinner({ className = 'h-5 w-5' }) {
    return (
        <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
        </svg>
    )
}

export type HotlineRowProps = {
    calculatorHref?: string
    onOpenCalculator?: () => void
    calcText?: string
    callText?: string
    hotlines?: Hotline[]
    loadingCalc?: boolean
    disabled?: boolean
    stacked?: boolean
    className?: string
    note?: React.ReactNode
    // NEW color controls
    calcVariant?: Variant
    callVariant?: Variant
    /** Custom CSS background (e.g. '#0ea5e9' or 'linear-gradient(...)') */
    calcBg?: string
    callBg?: string
    /** Extra class hooks to override styles via Tailwind */
    calcClass?: string
    callClass?: string
}

const baseBtn =
    'h-11 rounded-xl font-semibold transition relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed grid place-items-center text-white'

function variantClass(v: Variant): string {
    switch (v) {
        case 'emerald':
            return 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_6px_18px_rgba(5,150,105,0.35)]'
        case 'teal':
            return 'bg-teal-600 hover:bg-teal-700 shadow-[0_6px_18px_rgba(13,148,136,0.35)]'
        case 'cyan':
            return 'bg-cyan-600 hover:bg-cyan-700 shadow-[0_6px_18px_rgba(8,145,178,0.35)]'
        case 'sky':
            return 'bg-sky-600 hover:bg-sky-700 shadow-[0_6px_18px_rgba(2,132,199,0.35)]'
        case 'blue':
            return 'bg-blue-600 hover:bg-blue-700 shadow-[0_6px_18px_rgba(37,99,235,0.35)]'
        case 'purple':
            return 'bg-purple-600 hover:bg-purple-700 shadow-[0_6px_18px_rgba(147,51,234,0.35)]'
        case 'pink':
            return 'bg-pink-600 hover:bg-pink-700 shadow-[0_6px_18px_rgba(236,72,153,0.35)]'
        case 'rose':
            return 'bg-rose-600 hover:bg-rose-700 shadow-[0_6px_18px_rgba(225,29,72,0.35)]'
        case 'amber':
            return 'bg-amber-500 hover:bg-amber-600 text-[#1f2937] shadow-[0_6px_18px_rgba(245,158,11,0.35)]'
        case 'orange':
            return 'bg-orange-600 hover:bg-orange-700 shadow-[0_6px_18px_rgba(234,88,12,0.35)]'
        case 'slate':
            return 'bg-slate-900 hover:bg-black'
        case 'black':
            return 'bg-black hover:brightness-90'
        case 'gradient-emerald':
            return 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-[0_6px_18px_rgba(5,150,105,0.35)]'
        case 'gradient-sunset':
            return 'bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 hover:via-orange-600 shadow-[0_6px_18px_rgba(245,158,11,0.35)]'
        case 'gradient-ocean':
            return 'bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 shadow-[0_6px_18px_rgba(2,132,199,0.35)]'
        case 'brand':
        default:
            return '' // handled by inline style using BRAND
    }
}

export default function HotlineRow({
    calculatorHref,
    onOpenCalculator,
    calcText = 'Tính chi phí lắp đặt',
    callText = 'Tư vấn',
    hotlines = [],
    loadingCalc = false,
    disabled = false,
    stacked = false,
    className = '',
    note,
    // color controls
    calcVariant = 'brand',
    callVariant = 'slate',
    calcBg,
    callBg,
    calcClass = '',
    callClass = '',
}: HotlineRowProps) {
    const primaryPhone = hotlines[0]?.phone || '0902035326'

    // Build backgrounds
    const calcIsBrand = calcVariant === 'brand' && !calcBg
    const calcStyle = calcIsBrand ? { background: BRAND } : calcBg ? { background: calcBg } : undefined
    const callIsBrand = callVariant === 'brand' && !callBg
    const callStyle = callIsBrand ? { background: BRAND } : callBg ? { background: callBg } : undefined

    return (
        <div className={`mt-3 ${stacked ? 'grid grid-cols-1' : 'grid grid-cols-1 sm:grid-cols-2'} gap-3 ${className}`}>
            {/* CALCULATOR */}
            <a
                href={calculatorHref || '#'}
                onClick={(e) => {
                    if (onOpenCalculator) {
                        e.preventDefault()
                        if (!disabled && !loadingCalc) onOpenCalculator()
                    }
                }}
                aria-busy={loadingCalc}
                className={`${baseBtn} ${calcVariant !== 'brand' || calcBg ? variantClass(calcVariant) : ''} ${calcClass}`}
                style={calcStyle}
            >
                {/* soft radial highlight for filled bg */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 opacity-0 hover:opacity-20 transition"
                    style={{ background: 'radial-gradient(120px 60px at 50% -20%, rgba(255,255,255,.65), transparent)' }}
                />
                <div className="flex items-center gap-2">
                    {loadingCalc ? <Spinner /> : <BoltIcon />}
                    <span>{calcText}</span>
                </div>
            </a>

            {/* HOTLINE */}
            <a
                href={`tel:${primaryPhone}`}
                className={`${baseBtn} ${callVariant !== 'brand' || callBg ? variantClass(callVariant) : 'bg-slate-900 hover:bg-black'} ${callClass}`}
                style={callStyle}
            >
                <div className="flex items-center gap-2">
                    <PhoneIcon />
                    <span>
                        {callText}: {primaryPhone}
                    </span>
                </div>
            </a>

            {note && (
                <div className="sm:col-span-2 flex items-center justify-center gap-2 text-[12px] text-slate-600">
                    <ShieldIcon />
                    {note}
                </div>
            )}
        </div>
    )
}

/* -----------------------------------------------------
   Optional: city pills
----------------------------------------------------- */
export function HotlineGrid({ list }: { list?: Hotline[] }) {
    const items: Hotline[] =
        list && list.length
            ? list
            : [
                { label: 'TP.Hồ Chí Minh', phone: '0853892898' },
            ]

    return (
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {items.map((h) => (
                <a
                    key={h.label}
                    href={`tel:${h.phone}`}
                    className="group flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-[6px] text-[12px] text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                >
                    <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[11px] font-medium text-slate-700 group-hover:bg-emerald-100">
                        {h.label}
                    </span>
                    <span className="font-semibold">{h.phone}</span>
                </a>
            ))}
        </div>
    )
}

/* -----------------------------------------------------
USAGE EXAMPLES

// 1) Brand green for calculator + black hotline (default)
<HotlineRow hotlines={[{label:'TP.Hồ Chí Minh', phone:'0853892898'}]} />

// 2) Đa dạng màu: calculator xanh dương, hotline gradient hoàng hôn
<HotlineRow
  calcVariant="blue"
  callVariant="gradient-sunset"
  hotlines={[{label:'TP.Hồ Chí Minh', phone:'0853892898'}]}
/>

// 3) Tự đặt màu CSS (không cần safelist Tailwind)
<HotlineRow
  calcBg="#0ea5e9" // sky-500
  callBg="linear-gradient(90deg,#9333ea,#f43f5e)"
  hotlines={[{label:'TP.Hồ Chí Minh', phone:'0853892898'}]}
/>

// 4) Tuỳ chỉnh thêm class Tailwind
<HotlineRow
  calcVariant="emerald"
  calcClass="shadow-lg"
  callVariant="slate"
  callClass="ring-1 ring-white/10"
  hotlines={[{label:'TP.Hồ Chí Minh', phone:'0853892898'}]}
/>
----------------------------------------------------- */
