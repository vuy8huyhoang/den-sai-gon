'use client'
import React, { useMemo, useState } from 'react'
import { FaqAccordion } from '../category/FaqAccordion';

export type SpecRow = { key: string; label: string; values: (string | React.ReactNode)[] }

export type ProductSpecsProps = {
    title: string
    subTitle?: string
    columns?: string[]      // ← cho optional
    rows?: SpecRow[]        // ← cho optional
    clampRows?: number
    brandColor?: string
    className?: string
}

const ChevronDown = ({ className = 'h-4 w-4' }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default function ProductSpecs({
    title,
    subTitle = 'Bảng thông số kỹ thuật chi tiết',
    columns = [],           // ← default []
    rows = [],              // ← default []
    clampRows = 2,
    brandColor = '#079553',
    className = '',
}: ProductSpecsProps) {
    const [expanded, setExpanded] = useState(false)

    // dùng biến “safe” để chắc chắn là mảng
    const safeRows = Array.isArray(rows) ? rows : []
    const safeCols = Array.isArray(columns) ? columns : []

    const visibleRows = useMemo(
        () => (expanded ? safeRows : safeRows.slice(0, clampRows)),
        [expanded, safeRows, clampRows]
    )
    const showToggle = safeRows.length > clampRows

    return (
        <section className={`w-full mt-4 ${className}`}>
            <h3 className="text-[18px] font-bold text-slate-900 mb-2">{title}</h3>

            {/* Desktop table */}
            <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div className="border-b bg-slate-100 text-center text-[14px] font-semibold text-slate-800 py-2">
                    {subTitle}
                </div>

                <div className="grid grid-cols-[240px_1fr]">
                    <div className="border-r border-slate-200 bg-white" />
                    <div className="grid" style={{ gridTemplateColumns: `repeat(${safeCols.length}, minmax(120px, 1fr))` }}>
                        {safeCols.map((c) => (
                            <div key={c} className="px-3 py-2 text-[13px] font-semibold text-slate-700 border-r last:border-r-0 border-slate-200 bg-white">
                                {c}
                            </div>
                        ))}
                    </div>
                </div>

                {visibleRows.map((r) => (
                    <div key={r.key} className="grid grid-cols-[240px_1fr] border-t border-slate-200">
                        <div className="px-3 py-3 bg-slate-50 text-[14px] font-semibold text-slate-800 border-r border-slate-200">
                            {r.label}
                        </div>
                        <div className="grid" style={{ gridTemplateColumns: `repeat(${safeCols.length}, minmax(120px, 1fr))` }}>
                            {r.values.map((v, i) => (
                                <div key={i} className="px-3 py-3 text-[14px] text-slate-800 border-r last:border-r-0 border-slate-200">
                                    {v}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
            </div>

            {/* Mobile stacked */}
            <div className="md:hidden overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div className="border-b bg-slate-100 text-center text-[14px] font-semibold text-slate-800 py-2">{subTitle}</div>
                <div className="grid grid-cols-3 text-[13px] font-semibold text-slate-700">
                    {safeCols.map((c) => (
                        <div key={c} className="px-2 py-2 text-center border-r last:border-r-0 border-slate-200 bg-white">
                            {c}
                        </div>
                    ))}
                </div>
                {visibleRows.map((r) => (
                    <div key={r.key} className="border-t border-slate-200">
                        <div className="px-3 py-2 bg-slate-50 text-[13px] font-semibold text-slate-800">{r.label}</div>
                        <div className="grid grid-cols-3">
                            {r.values.map((v, i) => (
                                <div key={i} className="px-2 py-2 text-[13px] text-slate-800 border-r last:border-r-0 border-slate-200">
                                    {v}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {showToggle && (
                <div className="mt-3 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setExpanded((s) => !s)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-[14px] font-medium text-slate-700 hover:bg-slate-50"
                    >
                        {expanded ? 'Thu gọn' : 'Xem thêm'}
                        <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            )}

        </section>
    )
}

/* =====================================================
   Ví dụ dữ liệu — copy vào nơi dùng component
===================================================== */
export const EXAMPLE_SPECS = {
    title: '1. Thông số kỹ thuật Đèn LED âm trần Prolux‑T ánh sáng đổi màu – Maxben',
    columns: ['9W', '10W', '12W'],
    rows: [
        { key: 'power', label: 'Công suất', values: ['9W', '10W', '12W'] },
        { key: 'lumen', label: 'Quang thông(Lm)', values: ['765', '850', '1020'] },
        { key: 'size', label: 'Kích thước (mm)', values: ['D100*H44', 'D122*H44', 'D122*H44'] },
        { key: 'cutout', label: 'Khoét lỗ (mm)', values: ['Ø75-90', 'Ø90-110', 'Ø90-110'] },
        { key: 'cri', label: 'Chỉ số hoàn màu', values: ['CRI97', 'CRI97', 'CRI97'] },
        { key: 'eff', label: 'Hiệu suất', values: ['>85Lm/W', '>85Lm/W', '>85Lm/W'] },
        { key: 'ip', label: 'Độ kín', values: ['IP20', 'IP20', 'IP20'] },
        { key: 'ring', label: 'Màu choá', values: ['Vàng/Trắng/Đen', 'Vàng/Trắng/Đen', 'Vàng/Trắng/Đen'] },
        { key: 'voltage', label: 'Điện áp', values: ['AC170-240V', 'AC170-240V', 'AC170-240V'] },
        { key: 'ugr', label: 'Độ chống chói', values: ['UGR<10', 'UGR<10', 'UGR<10'] },
        { key: 'beam', label: 'Góc chiếu', values: ['90 độ', '90 độ', '90 độ'] },
        { key: 'chip', label: 'Chip', values: ['RG1 giảm ánh sáng xanh', 'RG1 giảm ánh sáng xanh', 'RG1 giảm ánh sáng xanh'] },
        { key: 'cct', label: 'Màu ánh sáng (K)', values: ['6500K/4000K/3000K/ Đổi màu', '6500K/4000K/3000K/ Đổi màu', '6500K/4000K/3000K/ Đổi màu'] },
        { key: 'warranty', label: 'Bảo hành', values: ['3 năm', '3 năm', '3 năm'] },
        { key: 'material', label: 'Chất liệu', values: ['Nhôm đúc', 'Nhôm đúc', 'Nhôm đúc'] },
    ],
}

/* =====================================================
USAGE

<ProductSpecs
  title={EXAMPLE_SPECS.title}
  columns={EXAMPLE_SPECS.columns}
  rows={EXAMPLE_SPECS.rows}
  clampRows={2} // giống hình: ban đầu chỉ hiển thị 2 dòng
/>
===================================================== */
