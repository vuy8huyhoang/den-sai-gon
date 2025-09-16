'use client'
export default function StockTag({ text = 'Còn hàng' }: { text?: string }) {
    return <span className="ml-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] text-emerald-700">{text}</span>
}
