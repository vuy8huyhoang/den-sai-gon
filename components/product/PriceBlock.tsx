'use client'
import { Price, fmtVND } from './types'
export default function PriceBlock({ price }: { price: Price }) {
    const percent = price.original ? Math.round(100 - (price.current / price.original) * 100) : 0
    return (
        <div className="mt-3 flex items-end gap-3">
            <div className="text-[28px] font-bold text-[#d32f2f]">{fmtVND(price.current)}</div>
            {price.original && <div className="text-[15px] text-slate-500 line-through">{fmtVND(price.original)}</div>}
            {price.original && <div className="text-[13px] text-slate-600">(-{percent}%)</div>}
            {price.vatIncluded && <div className="ml-auto text-[12px] italic text-emerald-700">Đã bao gồm VAT</div>}
        </div>
    )
}
