// =============================================
// components/product/RecentlyView.tsx
// =============================================
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ItemCard, type Variant, type ItemCardProps } from '../category/ProductCard'

export type RVProduct = {
    id: string | number
    title: string
    image: string
    priceMin: number
    priceMax?: number
    discount?: number
    variants?: Variant[]
    attributes?: ItemCardProps['attributes']
    featureKeys?: string[]
} & Partial<ItemCardProps>

function RVHeader({ title }: { title: string }) {
    return (
        <header className="mb-3">
            <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-tight text-slate-900">{title}</h2>
        </header>
    )
}

function RVRow({ products, cardWidth = 276 }: { products: RVProduct[]; cardWidth?: number }) {
    const ref = useRef<HTMLDivElement | null>(null)
    const pos = useRef({ isDown: false, startX: 0, startLeft: 0, dragged: false })
    const [dragging, setDragging] = useState(false)
    const [canLeft, setCanLeft] = useState(false)
    const [canRight, setCanRight] = useState(false)

    const handleDown = (e: React.MouseEvent) => {
        if (!ref.current) return
        pos.current.isDown = true
        pos.current.dragged = false
        pos.current.startX = e.pageX
        pos.current.startLeft = ref.current.scrollLeft
        setDragging(true)
    }
    const handleMove = (e: React.MouseEvent) => {
        if (!ref.current || !pos.current.isDown) return
        e.preventDefault()
        const walk = (e.pageX - pos.current.startX) * 1.1
        if (Math.abs(walk) > 3) pos.current.dragged = true
        ref.current.scrollLeft = pos.current.startLeft - walk
    }
    const end = () => {
        pos.current.isDown = false
        requestAnimationFrame(() => setDragging(false))
    }

    const onDragStartCapture: React.DragEventHandler<HTMLDivElement> = (e) => {
        if (dragging) e.preventDefault()
    }
    const onClickCapture: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (pos.current.dragged) {
            e.preventDefault()
            e.stopPropagation()
            pos.current.dragged = false
        }
    }

    const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        const el = ref.current
        if (!el) return
        if (Math.abs(el.scrollWidth - el.clientWidth) > 2) {
            el.scrollLeft += e.deltaY
            e.preventDefault()
        }
    }

    const check = () => {
        const el = ref.current
        if (!el) return
        setCanLeft(el.scrollLeft > 2)
        setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2)
    }

    useEffect(() => {
        const el = ref.current
        if (!el) return
        check()
        el.addEventListener('scroll', check, { passive: true })
        window.addEventListener('resize', check)
        return () => {
            el.removeEventListener('scroll', check)
            window.removeEventListener('resize', check)
        }
    }, [])

    const scrollBy = (dir: 1 | -1) => {
        const el = ref.current
        if (!el) return
        const amount = Math.max(cardWidth * 1.25, el.clientWidth * 0.85)
        el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    }

    return (
        <div className="relative">
            <div
                ref={ref}
                onMouseDown={handleDown}
                onMouseMove={handleMove}
                onMouseLeave={end}
                onMouseUp={end}
                onWheel={onWheel}
                onDragStartCapture={onDragStartCapture}
                onClickCapture={onClickCapture}
                className={[
                    'group/track flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
                    dragging ? 'select-none cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory',
                    'touch-pan-y'
                ].join(' ')}
            >
                {products.map((p) => (
                    <div key={p.id} className="snap-start shrink-0" style={{ width: cardWidth }}>
                        <ItemCard
                            title={p.title}
                            image={p.image}
                            priceMin={p.priceMin}
                            priceMax={p.priceMax}
                            discount={p.discount}
                            variants={p.variants}
                            featureMode={p.featureMode || 'downlight'}
                            featureKeys={p.featureKeys || ['antiglare', 'warranty3y', 'genuine', 'cri97']}
                            warrantyMode={p.warrantyMode || 'downlightImg'}
                            attributes={p.attributes}
                            progress={p.progress ?? null}
                        />
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={!canLeft}
                aria-label="Scroll left"
                className="absolute left-0 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white/95 shadow-md ring-1 ring-slate-200 disabled:opacity-0 disabled:invisible hover:bg-white"
            >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={!canRight}
                aria-label="Scroll right"
                className="absolute right-0 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white/95 shadow-md ring-1 ring-slate-200 disabled:opacity-0 disabled:invisible hover:bg-white"
            >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 6l6 6-6 6" /></svg>
            </button>
        </div>
    )
}

export default function RecentlyView({
    title = 'SẢN PHẨM BẠN ĐÃ XEM',
    products = [],
    cardWidth = 276,
    className = 'container-x my-8',
}: {
    title?: string
    products?: RVProduct[]
    cardWidth?: number
    className?: string
}) {
    if (!products.length) return null
    return (
        <section className={className}>
            <RVHeader title={title} />
            <RVRow products={products} cardWidth={cardWidth} />
        </section>
    )
}
