import { useState } from "react";
import { RelatedLink } from "./CategoryDescription";

export function RelatedPanel({ links, defaultCollapsed }: { links: RelatedLink[]; defaultCollapsed: boolean }) {
    const [collapsed, setCollapsed] = useState(defaultCollapsed)
    const limit = 3
    const list = collapsed ? links.slice(0, limit) : links
    return (
        <section className="mt-6">
            <div className="text-[13px] font-semibold text-slate-800 mb-2">CÁC NỘI DUNG LIÊN QUAN</div>
            <div className="rounded-xl border border-dashed border-emerald-400/60 p-3">
                <div className="text-[16px] font-extrabold text-slate-900 mb-2">BẢNG GIÁ ĐÈN LED ÂM TRẦN</div>
                <ul className="divide-y divide-slate-200">
                    {list.map((lnk, idx) => (
                        <li key={idx} className="py-2">
                            <a href={lnk.href || '#'} className="text-[14px] text-emerald-700 hover:underline">
                                {lnk.label}
                            </a>
                        </li>
                    ))}
                </ul>
                {links.length > limit && (
                    <div className="mt-2 text-center">
                        <button type="button" onClick={() => setCollapsed(v => !v)} className="text-[12px] text-slate-600 hover:text-slate-800">
                            {collapsed ? 'Xem thêm ▼' : 'Ẩn bớt ▲'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
