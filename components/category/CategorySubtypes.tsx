'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export type SubtypeItem = {
    title: string;
    image: string;   // 320x320 (khuyến nghị)
    href?: string;
    swatches?: string[]; // mảng mã màu hex để hiện 3 chấm màu nhỏ
};

export default function CategorySubtypes({
    items = [],
    title = 'Danh mục nhỏ',
}: {
    items: SubtypeItem[];
    title?: string;
}) {
    const railRef = useRef<HTMLDivElement | null>(null);

    const scrollBy = (d: number) => {
        const el = railRef.current;
        if (!el) return;
        el.scrollBy({ left: d * (el.clientWidth * 0.8), behavior: 'smooth' });
    };

    return (
        <section className="relative">
            

            <div className="relative">
                {/* edge gradients */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />

                <div
                    ref={railRef}
                    className="overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    <div className="grid grid-flow-col auto-cols-[130px] gap-4 md:auto-cols-[150px]">
                        {items.map((it, idx) => (
                            <Link
                                key={idx}
                                href={it.href || '#'}
                                className="group relative rounded-xl border border-slate-200/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-slate-50">
                                    <Image
                                        src={it.image}
                                        alt={it.title}
                                        fill
                                        sizes="200px"
                                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                                    />
                                </div>

                                {/* swatches */}
                                {!!it.swatches?.length && (
                                    <div className="absolute left-2 top-2 flex gap-1">
                                        {it.swatches.slice(0, 3).map((c, i) => (
                                            <span
                                                key={i}
                                                className="h-3 w-3 rounded-full ring-1 ring-black/10"
                                                style={{ background: c }}
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className="px-3 py-2 text-center">
                                    <p className="line-clamp-2 text-[13px] font-medium text-slate-800">
                                        {it.title}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
