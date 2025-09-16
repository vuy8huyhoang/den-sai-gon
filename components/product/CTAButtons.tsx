'use client'
import React from 'react'
import { BRAND } from './types'

/* =====================================================
   CTA Buttons — prettier + icons + loading/disabled states
   + NEW: buyIcon prop to pick icon for “Mua ngay”
===================================================== */

function CartIcon({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <circle cx="10" cy="20" r="1.75" /><circle cx="17" cy="20" r="1.75" />
            <path d="M3 4h2l2.5 12.5a1 1 0 0 0 1 .8H18a1 1 0 0 0 1-.8L21 8H7" />
        </svg>
    )
}

// --- Buy icons (choose one via buyIcon prop) ----------------
function BagIcon({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M7 9V7a5 5 0 0 1 10 0v2" />
            <path d="M5 9h14l-1 11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 9Z" />
        </svg>
    )
}
function CardIcon({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 9h18M7 15h5" />
        </svg>
    )
}
function WalletIcon({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H3V7Z" />
            <rect x="3" y="8" width="18" height="11" rx="2" />
            <circle cx="16" cy="14" r="1.5" />
        </svg>
    )
}
function BoltIcon({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
    )
}
function CheckIcon({ className = 'h-5 w-5' }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}

function Spinner({ className = 'h-5 w-5' }) {
    return (
        <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
        </svg>
    )
}

export type CTAButtonsProps = {
    onAdd?: () => void
    onBuy?: () => void
    addText?: string
    buyText?: string
    brandColor?: string
    loadingAdd?: boolean
    loadingBuy?: boolean
    disabled?: boolean
    stacked?: boolean // force 1 column
    note?: React.ReactNode // optional secure note below
    className?: string
    /** icon for Buy button */
    buyIcon?: 'bag' | 'card' | 'wallet' | 'bolt' | 'check'
}

export default function CTAButtons({
    onAdd,
    onBuy,
    addText = 'Thêm vào giỏ',
    buyText = 'Mua ngay',
    brandColor,
    loadingAdd = false,
    loadingBuy = false,
    disabled = false,
    stacked = false,
    note,
    className = '',
    buyIcon = 'bag', // default → Shopping Bag (phù hợp “Mua ngay”)
}: CTAButtonsProps) {
    const bgBrand = brandColor || BRAND
    const baseBtn = 'h-11 rounded-xl font-semibold transition relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'

    const renderBuyIcon = () => {
        switch (buyIcon) {
            case 'card':
                return <CardIcon />
            case 'wallet':
                return <WalletIcon />
            case 'bolt':
                return <BoltIcon />
            case 'check':
                return <CheckIcon />
            default:
                return <BagIcon />
        }
    }

    return (
        <div className={`mt-3 ${stacked ? 'grid grid-cols-1' : 'grid grid-cols-1 sm:grid-cols-2'} gap-3 ${className}`}>
            {/* Add to cart */}
            <button
                onClick={onAdd}
                disabled={disabled || loadingAdd}
                className={`${baseBtn} bg-slate-900 text-white hover:bg-black`}
                aria-busy={loadingAdd}
            >
                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10" />
                <div className="mx-auto flex items-center justify-center gap-2">
                    {loadingAdd ? <Spinner /> : <CartIcon />}
                    <span>{addText}</span>
                </div>
            </button>

            {/* Buy now */}
            <button
                onClick={onBuy}
                disabled={disabled || loadingBuy}
                className={`${baseBtn} text-white hover:brightness-95 shadow-[0_6px_18px_rgba(7,149,83,0.35)]`}
                style={{ background: bgBrand }}
                aria-busy={loadingBuy}
            >
                {/* soft radial highlight */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 opacity-0 hover:opacity-20 transition"
                    style={{ background: 'radial-gradient(120px 60px at 50% -20%, rgba(255,255,255,.65), transparent)' }}
                />
                <div className="mx-auto flex items-center justify-center gap-2">
                    {loadingBuy ? <Spinner /> : renderBuyIcon()}
                    <span>{buyText}</span>
                </div>
            </button>

            {/* Optional secure note spanning full width */}
            {note && (
                <div className="sm:col-span-2 flex items-center justify-center gap-2 text-[12px] text-slate-600">
                    {/* small shield */}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
                        <path d="M9 12l2 2 4-4" />
                    </svg>
                    {note}
                </div>
            )}
        </div>
    )
}

/* -----------------------------------------------------
USAGE

// Dùng icon túi mua (mặc định)
<CTAButtons onAdd={addToCart} onBuy={checkoutNow} />

// Đổi icon sang thẻ tín dụng
<CTAButtons onAdd={addToCart} onBuy={checkoutNow} buyIcon="card" />

// hoặc ví tiền
<CTAButtons onAdd={addToCart} onBuy={checkoutNow} buyIcon="wallet" />

// vẫn có thể dùng tia sét nếu muốn nhấn mạnh tốc độ
<CTAButtons onAdd={addToCart} onBuy={checkoutNow} buyIcon="bolt" />
----------------------------------------------------- */
