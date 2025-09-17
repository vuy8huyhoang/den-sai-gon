// components/category/CategoryGrid.tsx — mobile‑optimized
'use client'
import Image from 'next/image'
import React from 'react'

export type CatItem = {
    title: string
    image: string
    href?: string
}

export type CategoryGridProps = {
    items: CatItem[]
    /** Default: 'grid'. If set to 'scroll', mobile turns into a horizontal scroller (snap). */
    variant?: 'grid' | 'scroll'
    /** Mobile columns for grid variant (2 | 3 | 4). Default: 3 */
    mobileCols?: 2 | 3 | 4
    /** Card aspect ratio. Default: 'square' */
    aspect?: 'square' | 'rect' // rect ~ 4/3
    className?: string
}

const cls = (...s: (string | false | null | undefined)[]) => s.filter(Boolean).join(' ')

export default function CategoryGrid({
    items,
    variant = 'grid',
    mobileCols = 4,
    aspect = 'square',
    className = '',
}: CategoryGridProps) {
    // responsive column classes (mobile first)
    const baseCols = mobileCols === 4 ? 'grid-cols-4' : mobileCols === 2 ? 'grid-cols-2' : 'grid-cols-3'
    const aspectClass = aspect === 'rect' ? 'aspect-[4/3]' : 'aspect-square'

    // Shared card styles — tighter on mobile, bigger on desktop
    const Card = ({ it, i }: { it: CatItem; i: number }) => (
        <a
            key={i}
            href={it.href ?? '#'}
            aria-label={it.title}
            className={cls(
                'group block rounded-xl border border-slate-200/90 bg-white/95',
                'hover:shadow-sm active:translate-y-[1px] transition',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60'
            )}
        >
            <div className="flex flex-col items-center p-1 md:p-2">
                {/* Image frame with fixed ratio to avoid layout shift on mobile */}
                <div className={cls('relative w-full', aspectClass, 'overflow-hidden rounded-lg bg-slate-50')}
                    style={{ maxWidth: 164 }}>
                    <Image
                        src={it.image}
                        alt={it.title}
                        fill
                        loading={i > 5 ? 'lazy' : 'eager'}
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width:1024px) 12vw, (min-width:768px) 18vw, 30vw"
                        priority={i < 3}
                    />
                </div>
                {/* Title */}
                <div className="mt-2 text-center text-[11.5px] md:text-[14px] font-medium text-slate-800 leading-snug line-clamp-2">
                    {it.title}
                </div>
            </div>
        </a>
    )

    if (variant === 'scroll') {
        // Mobile: horizontal scroll with snap; Desktop: grid as usual
        return (
            <div className={cls('md:grid md:gap-3', baseCols, 'md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8', className)}>
                {/* mobile track */}
                <div className="-mx-3 px-3 md:mx-0 md:px-0 md:contents">
                    <div className="flex gap-2 overflow-x-auto md:block [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:overflow-visible">
                        {items.map((it, i) => (
                            <div key={i} className="snap-start shrink-0 w-[44%] sm:w-[38%] md:w-auto md:shrink md:snap-none">
                                <Card it={it} i={i} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    // Default: responsive grid (denser on mobile)
    return (
        <div className={cls('grid gap-1 md:gap-2', baseCols, 'sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9', className)}>
            {items.map((it, i) => (
                <Card it={it} i={i} key={i} />
            ))}
        </div>
    )
}

/* ---------------------------------------------
USAGE

<CategoryGrid items={cats} />

// Horizontal scroll on mobile, grid on desktop
<CategoryGrid items={cats} variant="scroll" />

// 4 columns on mobile, rectangular thumbnails
<CategoryGrid items={cats} mobileCols={4} aspect="rect" />
---------------------------------------------- */
