'use client'
import { useState } from 'react'
import { AttrGroup } from './types'
export default function AttributeBlocks({ groups, onChange }: { groups: AttrGroup[]; onChange?: (s: Record<string, number>) => void }) {
    const [sel, setSel] = useState<Record<string, number>>(Object.fromEntries(groups.map(g => [g.key, g.defaultIndex ?? 0])))
    const update = (k: string, i: number) => { const next = { ...sel, [k]: i }; setSel(next); onChange?.(next) }
    return (
        <div className="space-y-3">
            {groups.map(g => (
                <div key={g.key}>
                    <div className="mb-1 flex items-center gap-2"><span className="text-[13px] text-slate-700 font-medium">{g.label}</span>{g.tooltip && <span className="text-[11px] text-slate-500">{g.tooltip}</span>}</div>
                    {g.type === 'color' ? (
                        <div className={g.scroll ? 'flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 [scrollbar-width:none]' : 'flex flex-wrap gap-2'}>
                            {g.values.map((v, i) => (
                                <button key={i} onClick={() => update(g.key, i)} aria-pressed={sel[g.key] === i} title={v.label}
                                    className={['relative h-8 w-8 rounded-full border transition', sel[g.key] === i ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-slate-300 hover:border-slate-400',].join(' ')}>
                                    <span className="absolute inset-0 rounded-full" style={{ backgroundColor: v.color || '#e5e7eb' }} />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className={g.scroll ? 'flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 [scrollbar-width:none]' : 'flex flex-wrap gap-2'}>
                            {g.values.map((v, i) => (
                                <button key={i} onClick={() => update(g.key, i)} aria-pressed={sel[g.key] === i}
                                    className={['px-3 h-8 rounded-md border text-[13px] whitespace-nowrap transition', sel[g.key] === i ? 'border-emerald-600 text-emerald-700 bg-emerald-50' : 'border-slate-300 text-slate-700 hover:bg-slate-50',].join(' ')} title={v.note || v.label}>
                                    {v.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
