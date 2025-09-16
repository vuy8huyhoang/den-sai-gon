'use client'
import { SpecRow } from './types'
export default function SpecsQuick({ rows, onExpand }: { rows: SpecRow[]; onExpand?: () => void }) {
    return (
        <div className="divide-y divide-slate-200 text-[14px]">
            {rows.map((r, i) => (
                <div key={i} className="flex items-start py-2">
                    <div className="w-40 text-slate-600">{r.label}</div>
                    <div className="flex-1 font-medium text-slate-800">{r.value}</div>
                </div>
            ))}
            {onExpand && <button onClick={onExpand} className="text-[13px] text-emerald-700 hover:underline">Xem chi tiết thông số ↗</button>}
        </div>
    )
}
