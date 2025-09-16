// components/ui/PaginationSkins.tsx
// ✅ UI-only, no JS logic. Pure Tailwind markup so it renders in **Server Components** too.
// Copy this file into your project (Next.js + Tailwind) and import any skin you like.

import React from 'react'

/* ------------------------------------------------------------------
   Small inline icons (no external deps)
------------------------------------------------------------------- */
function IconChevronLeft({ size = 16, className = '' }: { size?: number; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    )
}
function IconChevronRight({ size = 16, className = '' }: { size?: number; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    )
}
function IconChevronsLeft({ size = 16, className = '' }: { size?: number; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
            <path d="M11 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M20 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    )
}
function IconChevronsRight({ size = 16, className = '' }: { size?: number; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
            <path d="M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M4 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    )
}
function IconDots({ size = 16, className = '' }: { size?: number; className?: string }) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
            <circle cx="5" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="19" cy="12" r="2" fill="currentColor" />
        </svg>
    )
}

/* ------------------------------------------------------------------
   Common helpers
------------------------------------------------------------------- */
export type PaginationSkinProps = {
    current?: number
    total?: number
    className?: string
    brandColor?: string // hex or tailwind arbitrary eg. '#079553'
}

const NUMBERS = [1, 2, 3, 'dots', 7] as const

function useColors(brandColor?: string) {
    // Tailwind arbitrary values for brand color
    const brandBg = brandColor ? `bg-[${brandColor}]` : 'bg-[#079553]'
    const brandBorder = brandColor ? `border-[${brandColor}]` : 'border-[#079553]'
    return { brandBg, brandBorder }
}

/* ------------------------------------------------------------------
   1) Classic Square (giống ảnh)
------------------------------------------------------------------- */
export function PaginationSquare({ className = '', brandColor }: PaginationSkinProps) {
    const { brandBg, brandBorder } = useColors(brandColor)
    return (
        <nav aria-label="Pagination" className={`w-full container-x flex justify-center ${className} pb-8`}>
            <div className="flex gap-2">
                <a className="w-9 h-9 inline-flex items-center justify-center rounded-[4px] border border-slate-300 bg-white hover:bg-slate-50" href="#"><IconChevronLeft /></a>
                <span className={`w-9 h-9 inline-flex items-center justify-center rounded-[4px] text-white ${brandBg} ${brandBorder}`}>1</span>
                <a className="w-9 h-9 inline-flex items-center justify-center rounded-[4px] border border-slate-300 bg-white hover:bg-slate-50" href="#">2</a>
                <a className="w-9 h-9 inline-flex items-center justify-center rounded-[4px] border border-slate-300 bg-white hover:bg-slate-50" href="#">3</a>
                <span className="w-9 h-9 inline-flex items-center justify-center rounded-[4px] border border-slate-300 bg-white text-slate-600"><IconDots /></span>
                <a className="w-9 h-9 inline-flex items-center justify-center rounded-[4px] border border-slate-300 bg-white hover:bg-slate-50" href="#">7</a>
                <a className="w-9 h-9 inline-flex items-center justify-center rounded-[4px] border border-slate-300 bg-white hover:bg-slate-50" href="#"><IconChevronRight /></a>
            </div>
        </nav>
    )
}
