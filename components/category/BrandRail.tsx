'use client';
import Image from 'next/image';
import Link from 'next/link';

export type BrandItem = { name: string; logo: string; href?: string };
export type KeywordItem = { label: string; href?: string };

export default function BrandRail({
    popularTitle = 'Tìm kiếm nhiều:',
    brands = [],
    keywords = [],
}: {
    popularTitle?: string;
    brands: BrandItem[];
    keywords: KeywordItem[];
}) {
    return (
        <section className="mt-4 space-y-3">
            {/* row 1: brands */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-semibold text-slate-700">{popularTitle}</span>

                <div className="relative -mx-1 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="ml-1 flex items-center gap-2">
                        {brands.map((b, i) => (
                            <Link
                                key={i}
                                href={b.href || '#'}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 shadow-sm hover:border-emerald-400 hover:bg-emerald-50/60"
                            >
                                <div className="relative h-6 w-16">
                                    <Image
                                        src={b.logo}
                                        alt={b.name}
                                        fill
                                        sizes="64px"
                                        className="object-contain"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* row 2: keyword chips */}
            <div className="flex flex-wrap items-center gap-2">
                {keywords.map((k, i) => (
                    <Link
                        key={i}
                        href={k.href || '#'}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700 shadow-sm hover:border-emerald-400 hover:bg-emerald-50/60"
                    >
                        {k.label}
                    </Link>
                ))}
            </div>
        </section>
    );
}
