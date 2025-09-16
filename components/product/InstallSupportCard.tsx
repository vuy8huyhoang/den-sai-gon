'use client'
import React from 'react'


/* =====================================================
   Dynamic Install Support Card (Next.js + Tailwind)
   - Fully configurable content via props
   - Inline SVG icon set (no dependency)
   - Two CTAs: open calculator (callback or href) & call hotline
===================================================== */

const BRAND = '#079553'

// --- Types -------------------------------------------------
export type City = { name: string; areas?: string[] }
export type Hotline = { city: string; phone: string }
export type Perk = {
    icon?: 'wrench' | 'truck' | 'shield' | 'clock' | 'check' | 'bolt' | 'map' | 'leaf'
    text: string
}
export type Plan = {
    label: string
    priceFrom?: number
    unit?: string // ví dụ: 'đ/điểm', 'đ/bộ'
    note?: string
    href?: string // link tới bảng giá chi tiết (nếu có)
}

export type InstallSupportCardProps = {
    title?: string
    subtitle?: string
    coverage?: City[]
    perks?: Perk[]
    plans?: Plan[]
    calculatorHref?: string
    onOpenCalculator?: () => void
    hotlines?: Hotline[]
    className?: string
}

// --- Helpers ----------------------------------------------
const fmtVND = (n?: number) =>
    typeof n === 'number' ? new Intl.NumberFormat('vi-VN').format(n) + 'đ' : undefined

function Icon({ name, className = 'h-5 w-5' }: { name: Perk['icon']; className?: string }) {
    switch (name) {
        case 'wrench':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14.7 6.3a5 5 0 0 0-6.9 6.9l-4.2 4.2a2 2 0 1 0 2.8 2.8l4.2-4.2a5 5 0 0 0 6.9-6.9l-2.1 2.1-2.8-2.8 2.1-2.1Z" />
                </svg>
            )
        case 'truck':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7V10z" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" />
                </svg>
            )
        case 'shield':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
                </svg>
            )
        case 'clock':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
            )
        case 'bolt':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
            )
        case 'map':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M9 7l6-3 6 3v10l-6 3-6-3-6 3V10l6-3v10" />
                </svg>
            )
        case 'leaf':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M20 3c-7 0-13 6-13 13 0 3 2 5 5 5 7 0 13-6 13-13 0-3-2-5-5-5Z" /><path d="M14 7c-2 4-5 7-9 9" />
                </svg>
            )
        default:
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 13l4 4L19 7" />
                </svg>
            )
    }
}

// --- Component --------------------------------------------
export default function InstallSupportCard({
    title = 'HỖ TRỢ LẮP ĐẶT CÓ TÍNH PHÍ',
    subtitle = 'Nhanh – chuẩn – gọn, bảo hành tại nhà.',
    coverage = [
        { name: 'Nội thành TP.Hồ Chí Minh' }
    ],
    perks = [
        { icon: 'wrench', text: 'Kỹ thuật kinh nghiệm, làm sạch sau thi công' },
        { icon: 'shield', text: 'Bảo hành tại nhà 1–1' },
        { icon: 'clock', text: 'Hẹn giờ chính xác, lắp nhanh trong ngày' },
    ],
    plans = [
        { label: 'Đèn âm trần', priceFrom: 30000, unit: 'cái khi lấy số lượng lớn' },
        { label: 'Đèn âm trần', priceFrom: 120000, unit: 'cái dành cho bán lẻ' },
    ],
    calculatorHref,
    onOpenCalculator,
    hotlines = [
        { city: 'Hà Nội', phone: '0902035326' },
        { city: 'Hải Phòng', phone: '0902035326' },
        { city: 'Đà Nẵng', phone: '0901709043' },
    ],
    className = '',
}: InstallSupportCardProps) {
    return (
        <section className={`mt-4 rounded-xl border border-slate-200 bg-white p-4 ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="inline-grid h-8 w-8 place-items-center rounded-md text-white" style={{ background: BRAND }}>
                            <Icon name="wrench" className="h-4 w-4" />
                        </span>
                        <h3 className="text-[14px] font-bold text-slate-900">{title}</h3>
                    </div>
                    {subtitle && <p className="mt-1 text-[12px] text-slate-600">{subtitle}</p>}
                </div>
            </div>

            {/* Coverage + Perks */}
            <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                    <div className="text-[12px] font-semibold text-slate-700">Khu vực áp dụng</div>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {coverage.map((c) => (
                            <span key={c.name} className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[12px] text-emerald-700">{c.name}</span>
                        ))}
                    </div>
                    {perks.length > 0 && (
                        <ul className="mt-3 space-y-2">
                            {perks.map((p, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-[13px] text-slate-700">
                                    <span className="text-emerald-600"><Icon name={p.icon || 'check'} /></span>
                                    <span>{p.text}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Plans */}
                <div className="rounded-md border border-slate-200 p-3">
                    <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-slate-700">
                        <Icon name="map" />
                        Bảng giá tham khảo
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {plans.map((p) => (
                            <div key={p.label} className="rounded-md bg-slate-50 p-2">
                                <div className="text-[13px] font-semibold text-slate-800">{p.label}</div>
                                <div className="text-[12px] text-slate-600">Từ {fmtVND(p.priceFrom)}{ p.unit ? `/${p.unit}` : ''}</div>
                                {p.note && <div className="text-[11px] text-slate-500">{p.note}</div>}
                                {p.href && (
                                    <a href={p.href} className="text-[12px] text-emerald-700 hover:underline">Xem chi tiết</a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            
            
            {/* Hotlines list */}
        </section>
        
    )
}

/* =====================================================
USAGE

<InstallSupportCard
  subtitle="Áp dụng theo lịch kỹ thuật — có xuất hoá đơn VAT."
  coverage={[{name:'Hà Nội'}, {name:'Hải Phòng'}, {name:'Đà Nẵng'}, {name:'HCMC'}]}
  perks={[
    {icon:'wrench', text:'Kỹ thuật kinh nghiệm, làm sạch sau thi công'},
    {icon:'shield', text:'Bảo hành tại nhà 1–1'},
    {icon:'clock', text:'Hẹn giờ chính xác, lắp nhanh trong ngày'},
  ]}
  plans={[
    {label:'Đèn âm trần', priceFrom:30000, unit:'đ/điểm'},
    {label:'Đèn chùm', priceFrom:120000, unit:'đ/bộ', note:'Tuỳ chiều cao trần'},
  ]}
  calculatorHref="#tinh-phi"
  onOpenCalculator={() => setOpenCalculator(true)}
  hotlines={[
    {city:'Hà Nội', phone:'0902035326'},
    {city:'Hải Phòng', phone:'0902035326'},
    {city:'Đà Nẵng', phone:'0901709043'},
  ]}
/>
===================================================== */
