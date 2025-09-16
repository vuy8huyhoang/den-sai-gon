'use client'
export default function QuantityStep({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    return (
        <div className="inline-flex items-center rounded-md border border-slate-300">
            <button className="h-9 w-9 text-slate-700 hover:bg-slate-50" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Giảm">−</button>
            <div className="w-10 text-center text-[14px]">{value}</div>
            <button className="h-9 w-9 text-slate-700 hover:bg-slate-50" onClick={() => onChange(value + 1)} aria-label="Tăng">＋</button>
        </div>
    )
}
