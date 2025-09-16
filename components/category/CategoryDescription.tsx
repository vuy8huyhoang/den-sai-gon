// components/category/CategoryDescriptionFull.tsx — v4
// - Fix: expand button not showing when content ~ clamp
// - New: expandControl = 'auto' | 'always' | 'hidden'
//   • 'auto'   → chỉ hiện khi nội dung vượt clamp (mặc định)
//   • 'always' → luôn hiện nút (kể cả nội dung ngắn)
//   • 'hidden' → ẩn hoàn toàn (nếu muốn tự kiểm soát ở ngoài)
// - Safe overflow check + image load observer

'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { RelatedPanel } from './RelatedPanel';

const BRAND = '#079553'

const ChevronDown = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export type CatBlock = { heading: string; body: React.ReactNode }
export type FeaturedImage = { src: string; alt?: string; caption?: React.ReactNode; credit?: React.ReactNode }
export type RelatedLink = { label: string; href?: string }

export function CategoryDescriptionFull({
    title,
    sectionLabel = 'Mô tả danh mục',
    intro,
    blocks,
    featured,
    relatedLinks = [],
    className = '',
    clamp = 900,
    relatedDefaultCollapsed = false,
    expandControl = 'auto', // <— NEW
}: {
    title: string
    sectionLabel?: string
    intro?: React.ReactNode
    blocks: CatBlock[]
    featured?: FeaturedImage
    relatedLinks?: RelatedLink[]
    className?: string
    clamp?: number
    relatedDefaultCollapsed?: boolean
    expandControl?: 'auto' | 'always' | 'hidden'
}) {
    const [expanded, setExpanded] = useState(false)
    const showClamp = useMemo(() => !expanded, [expanded])
    const clipRef = useRef<HTMLDivElement | null>(null)
    const [expandable, setExpandable] = useState(false)

    // Related panel toggle
    const [relatedCollapsed, setRelatedCollapsed] = useState(relatedDefaultCollapsed)
    const relatedLimit = 8

    // Detect if content overflows clamp height (robust: also watch image loads)
    useEffect(() => {
        const el = clipRef.current
        if (!el) return
        const check = () => setExpandable(el.scrollHeight > (clamp + 4))
        check()
        const ro = new ResizeObserver(check)
        ro.observe(el)
        // also watch images inside
        const imgs = Array.from(el.querySelectorAll('img'))
        imgs.forEach((img) => {
            if (!img.complete) img.addEventListener('load', check, { once: true })
        })
        window.addEventListener('resize', check)
        const t = setTimeout(check, 0)
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', check)
            clearTimeout(t)
        }
    }, [blocks, intro, clamp, featured])

    const shouldShowExpand = expandControl === 'always' || (expandControl === 'auto' && expandable)

    return (
        <section className={`w-full ${className}`}>
            {/* Label */}
            <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/70 text-emerald-700 text-[12px] px-2.5 py-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand)]" style={{ ['--brand' as any]: BRAND }} />
                    {sectionLabel}
                </span>
            </div>

            {/* Intro */}
            {intro && (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 text-[14px] leading-7 text-slate-700 p-4">
                    {intro}
                </div>
            )}

            {/* Title */}
            <h2 className="mt-4 mb-2 text-center text-[22px] md:text-[24px] font-extrabold tracking-wide text-slate-900">
                {title}
            </h2>

            {/* Decorative underline */}
            <div className="mx-auto mb-4 flex h-[6px] w-[280px] overflow-hidden rounded-full">
                <div className="w-1/2 bg-slate-900" />
                <div className="w-1/2 bg-[var(--brand)]" style={{ ['--brand' as any]: BRAND }} />
            </div>

            {/* Content card (clamped) */}
            <div
                ref={clipRef}
                className={`relative rounded-xl border border-slate-200 bg-white p-5 md:p-6 ${showClamp ? 'max-h-[--clamp] overflow-hidden' : ''}`}
                style={{ ['--clamp' as any]: `${clamp}px` }}
            >
                {showClamp && shouldShowExpand && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                )}

                {/* Blocks */}
                <div className="space-y-5">
                    {blocks.map((b, i) => (
                        <section key={i}>
                            <h3 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
                                <span className="inline-block h-[3px] w-6 rounded-full bg-[var(--brand)]" style={{ ['--brand' as any]: BRAND }} />
                                {i + 1}. {b.heading}
                            </h3>
                            <div className="mt-1 text-[14px] leading-7 text-slate-800">{b.body}</div>
                        </section>
                    ))}
                </div>

                {/* Featured image */}
                {featured && (
                    <figure className="mt-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={featured.src} alt={featured.alt || ''} className="w-full h-auto object-cover max-h-[520px]" />
                        {(featured.caption || featured.credit) && (
                            <figcaption className="px-4 py-3 text-[12px] text-slate-600 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
                                <span className="font-medium text-slate-700">{featured.caption}</span>
                                {featured.credit && <span className="italic">{featured.credit}</span>}
                            </figcaption>
                        )}
                    </figure>
                )}
            </div>

            {/* Expand button — OUTSIDE the card */}
            {expandControl !== 'hidden' && shouldShowExpand && (
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => setExpanded(v => !v)}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] text-white px-4 py-2 text-[13px] shadow-md hover:shadow-lg hover:-translate-y-[1px] transition"
                        aria-expanded={!showClamp}
                        style={{ ['--brand' as any]: BRAND }}
                    >
                        {showClamp ? 'Xem thêm' : 'Thu gọn'}
                        <ChevronDown className={`transition-transform ${showClamp ? '' : 'rotate-180'}`} />
                    </button>
                </div>
            )}

            {/* Related Links Panel — OUTSIDE (never clamped) */}
            {relatedLinks.length > 0 && (
                <RelatedPanel links={relatedLinks} defaultCollapsed={relatedDefaultCollapsed} />
            )}
        </section>
    )
}

/* ----------------------
   Related panel subview
----------------------- */
