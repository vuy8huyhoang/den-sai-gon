'use client';
import {
    SlidersHorizontal,
    ChevronDown,
    Tag,
    Layers,
    Zap,
    Palette,
    DollarSign,
    Package,
    Globe2,
    Ruler,
    Shapes,
    Star,
    Clock,
    ArrowUpWideNarrow,
    ArrowDownWideNarrow,
    ChevronRight,
    type LucideIcon,
} from 'lucide-react';

type Menu = {
    label: string;
    items?: string[];
    icon?: LucideIcon; // có thể truyền icon thủ công; nếu bỏ trống sẽ tự đoán theo label
};

function pickIconByLabel(label: string): LucideIcon {
    const l = label.toLowerCase();

    if (l.includes('thương hiệu') || l.includes('hãng') || l.includes('brand')) return Tag;
    if (l.includes('loại') || l.includes('dòng') || l.includes('category')) return Layers;
    if (l.includes('công suất') || l.includes('watt') || /\bw\b/.test(l)) return Zap;
    if (l.includes('màu') || l.includes('nhiệt')) return Palette;
    if (l.includes('giá') || l.includes('price')) return DollarSign;
    if (l.includes('kích thước') || l.includes('đường kính') || l.includes('size')) return Ruler;
    if (l.includes('xuất xứ') || l.includes('nước')) return Globe2;
    if (l.includes('chất liệu') || l.includes('vật liệu')) return Shapes;
    if (l.includes('tồn kho') || l.includes('tình trạng') || l.includes('stock')) return Package;

    return Shapes;
}

export default function FilterBar({
    menus = [],
    sortLabel = 'Xếp theo',
    sortValue = 'Nổi bật',
}: {
    menus: Menu[];
    sortLabel?: string;
    sortValue?: string;
}) {
    return (
        <section className="mt-4 flex flex-wrap items-center gap-2">
            {/* Filter button (open modal/sheet later) */}
            <button
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm hover:border-emerald-400 hover:bg-emerald-50/60"
                aria-label="Mở bộ lọc"
            >
                <SlidersHorizontal size={16} className="text-emerald-600" />
                Bộ lọc
            </button>

            {menus.map((m, idx) => {
                const Icon: LucideIcon = m.icon ?? pickIconByLabel(m.label);
                return (
                    <details
                        key={idx}
                        className="group relative rounded-full border border-slate-200 bg-white [&[open]]:ring-emerald-300/40 [&[open]]:ring-2"
                    >
                        <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700">
                            <Icon size={16} className="text-emerald-600" />
                            {m.label}
                            <ChevronDown
                                size={16}
                                className="transition group-open:rotate-180 text-slate-500"
                            />
                        </summary>

                        {!!m.items?.length && (
                            <div className="absolute left-0 z-20 mt-1 min-w-[200px] rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                                {m.items.map((it) => (
                                    <button
                                        key={it}
                                        className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-slate-700 hover:bg-emerald-50/70 inline-flex items-center gap-2"
                                    >
                                        <ChevronRight size={14} className="text-emerald-600" />
                                        <span>{it}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </details>
                );
            })}

            {/* Sort (right align on wide) */}
            <div className="ml-auto">
                <details className="group relative rounded-full border border-slate-200 bg-white [&[open]]:ring-emerald-300/40 [&[open]]:ring-2">
                    <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium text-slate-700">
                        {sortLabel}: {sortValue}
                        <ChevronDown size={16} className="transition group-open:rotate-180 text-slate-500" />
                    </summary>

                    <div className="absolute right-0 z-20 mt-1 min-w-[200px] rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                        {[
                            { label: 'Nổi bật', icon: Star },
                            { label: 'Mới nhất', icon: Clock },
                            { label: 'Giá tăng dần', icon: ArrowUpWideNarrow },
                            { label: 'Giá giảm dần', icon: ArrowDownWideNarrow },
                        ].map(({ label, icon: Ico }) => (
                            <button
                                key={label}
                                className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-slate-700 hover:bg-emerald-50/70 inline-flex items-center gap-2"
                            >
                                <Ico size={14} className="text-emerald-600" />
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </details>
            </div>
        </section>
    );
}
