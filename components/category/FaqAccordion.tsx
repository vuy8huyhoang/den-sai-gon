// components/category/FaqAccordion.tsx & CategoryDescription.tsx
// Next.js + TailwindCSS — UI đẹp, nổi bật, tối ưu accessibility
// Copy file này và tách ra 2 file nếu muốn.

'use client'
import React, { useMemo, useState } from 'react'

/* ======================================================
   Common: icons inline (không cần thư viện ngoài)
====================================================== */
const BRAND = '#079553'

const ChevronDown = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const QuestionIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 9.5a2.5 2.5 0 114.4 1.6c-.6.7-1.4 1-1.9 1.6-.3.4-.5.8-.5 1.3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
)

/* ======================================================
   1) FAQ ACCORDION
====================================================== */
export type FaqItem = { id?: string; question: string; answer: React.ReactNode }

export function FaqAccordion({
    items,
    title = 'Câu hỏi thường gặp',
    singleOpen = false,
    className = '',
}: {
    items: FaqItem[]
    title?: string
    singleOpen?: boolean // true: 1 câu mở tại 1 thời điểm
    className?: string
}) {
    const [open, setOpen] = useState<Record<number, boolean>>({})
    const anyOpen = Object.values(open).some(Boolean)

    const toggle = (i: number) =>
        setOpen(prev => {
            const next = { ...prev, [i]: !prev[i] }
            if (singleOpen) {
                Object.keys(next).forEach(k => { if (Number(k) !== i) next[Number(k)] = false })
            }
            return next
        })

    return (
        <section className={`w-full ${className}`}>
            {/* Header */}
            <div className="mb-3 flex items-center gap-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-700">
                    <QuestionIcon size={16} />
                </div>
                <h2 className="text-[18px] font-semibold text-slate-800 tracking-wide">{title}</h2>
                <span className="ml-auto text-[12px] text-slate-500">{items.length} câu hỏi</span>
            </div>

            {/* Card */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                {items.map((it, i) => {
                    const isOpen = !!open[i]
                    const ctlId = `faq-${i}`
                    return (
                        <div key={i} className={`relative ${i > 0 ? 'border-t border-slate-200' : ''}`}>
                            {/* Button */}
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                aria-controls={`${ctlId}-panel`}
                                onClick={() => toggle(i)}
                                className="w-full group flex items-center gap-3 py-3 px-3 text-left hover:bg-slate-50 focus:outline-none"
                            >
                                <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border text-[11px] font-semibold ${isOpen ? 'border-[var(--brand)] text-[var(--brand)]' : 'border-slate-300 text-slate-500'}`} style={{ ['--brand' as any]: BRAND }}>
                                    {i + 1}
                                </span>
                                <span className="flex-1 text-[14px] text-slate-800">{it.question}</span>
                                <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180 text-[var(--brand)]' : 'text-slate-500'}`} />
                            </button>

                            {/* Panel */}
                            <div id={`${ctlId}-panel`} role="region" aria-labelledby={ctlId}
                                className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} bg-white`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-10 pb-4 text-[14px] leading-7 text-slate-700">
                                        {it.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Footer CTA (expand all) */}
            <div className="mt-3 flex items-center justify-end gap-3">
                <button
                    type="button"
                    className="text-[12px] text-slate-600 underline-offset-4 hover:underline"
                    onClick={() => setOpen({})}
                >Đóng tất cả</button>
                <button
                    type="button"
                    className="text-[12px] text-white px-3 py-1.5 rounded-md shadow bg-[var(--brand)] hover:opacity-95"
                    style={{ ['--brand' as any]: BRAND }}
                    onClick={() => setOpen(Object.fromEntries(items.map((_, i) => [i, true])))}
                >Mở tất cả</button>
            </div>
        </section>
    )
}
