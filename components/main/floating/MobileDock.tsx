'use client'
import React from 'react'

/* =====================================================
   MobileDockSimple — always-visible bottom dock (mobile)
   - Minimal, modern, focuses visual emphasis on the center Hotline
   - Icons refined: nicer Chat (two bubbles + dots) & Zalo (rounded app tile + Z)
   - Hidden on ≥md screens; safe-area padding for iOS home indicator
===================================================== */

const BRAND = '#079553'

type Tab = 'home' | 'chat' | 'hotline' | 'zalo' | 'cart'

export type MobileDockSimpleProps = {
    phone?: string // tel number; default 0853892898
    cartCount?: number
    active?: Tab
    onHome?: () => void
    onChat?: () => void
    onZalo?: () => void
    onCart?: () => void
    className?: string
}

export default function MobileDockSimple({
    phone = '0853892898',
    cartCount = 0,
    active = 'hotline',
    onHome,
    onChat,
    onZalo,
    onCart,
    className = '',
}: MobileDockSimpleProps) {
    const Item = ({
        label,
        icon,
        onClick,
        isActive,
        aria,
    }: {
        label: string
        icon: React.ReactNode
        onClick?: () => void
        isActive?: boolean
        aria: string
    }) => (
        <button
            type="button"
            aria-label={aria}
            onClick={onClick}
            className={[
                'relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 active:scale-[0.97] transition',
                isActive ? 'text-slate-900' : 'text-slate-600',
            ].join(' ')}
        >
            <span className="grid place-items-center h-6 w-6">{icon}</span>
            <span className="text-[11px] leading-none font-medium select-none">{label}</span>
        </button>
    )

    return (
        <nav
            role="navigation"
            aria-label="Mobile dock"
            className={[
                'md:hidden fixed inset-x-0 bottom-0 z-50',
                'backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-t border-slate-200',
                'shadow-[0_-6px_24px_rgba(2,6,23,0.06)]',
                className,
            ].join(' ')}
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
            <div className="relative mx-auto max-w-screen-sm">
                {/* Grid for 4 side items */}
                <div className="grid grid-cols-5 items-end px-2 py-2">
                    {/* Home */}
                    <Item
                        aria="Trang chủ"
                        label="Trang chủ"
                        isActive={active === 'home'}
                        icon={<HomeIcon className="h-6 w-6" />}
                        onClick={onHome}
                    />

                    {/* Chat */}
                    <Item
                        aria="Chat"
                        label="Chat"
                        isActive={active === 'chat'}
                        icon={<ChatIcon className="h-6 w-6" />}
                        onClick={onChat}
                    />

                    {/* Spacer for the floating Hotline capsule */}
                    <div />

                    {/* Zalo */}
                    <Item
                        aria="Zalo"
                        label="Zalo"
                        isActive={active === 'zalo'}
                        icon={<ZaloIcon className="h-6 w-6" />}
                        onClick={onZalo}
                    />

                    {/* Cart */}
                    <div className="relative">
                        <Item
                            aria="Giỏ hàng"
                            label="Giỏ hàng"
                            isActive={active === 'cart'}
                            icon={<CartIcon className="h-6 w-6" />}
                            onClick={onCart}
                        />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 right-3 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-emerald-600 text-white text-[10px] font-semibold">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </div>
                </div>

                {/* Floating Hotline (center) */}
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6">
                    <a
                        href={`tel:${phone}`}
                        aria-label="Gọi Hotline"
                        className="pointer-events-auto group inline-flex items-center justify-center rounded-full shadow-lg ring-1 ring-emerald-700/15"
                        style={{ background: BRAND }}
                    >
                        <div className="relative grid place-items-center h-14 w-14 text-white">
                            <PhoneIcon className="h-[22px] w-[22px]" />
                            {/* subtle halo */}
                            <span className="absolute inset-0 rounded-full shadow-[0_0_0_6px_rgba(7,149,83,0.12)]" aria-hidden />
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    )
}

/* ---------------- Inline Icons (stroke 1.8) ---------------- */
function HomeIcon({ className = 'h-6 w-6' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <path d="M3 11.5l9-7 9 7" />
            <path d="M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" />
        </svg>
    )
}

// Refined chat icon: overlapping bubble + three dots
function ChatIcon({ className = 'h-6 w-6' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            {/* back bubble */}
            <path d="M14.5 5.5h-7A4.5 4.5 0 003 10v5.2a.9.9 0 001.5.7l2.6-2.2H9" />
            {/* front bubble */}
            <path d="M8.5 9.5h7A4.5 4.5 0 0120 14v2.8a.9.9 0 01-1.5.7l-2.7-2.1H12" />
            {/* typing dots */}
            <circle cx="10" cy="12.2" r="0.9" fill="currentColor" />
            <circle cx="12.75" cy="12.2" r="0.9" fill="currentColor" />
            <circle cx="15.5" cy="12.2" r="0.9" fill="currentColor" />
        </svg>
    )
}

// Refined Zalo icon: rounded app tile + stylised Z path
function ZaloIcon({ className = 'h-6 w-6' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
            {/* stylised Z */}
            <path d="M8 8h8l-8 8h8" />
        </svg>
    )
}

function CartIcon({ className = 'h-6 w-6' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <circle cx="9" cy="20" r="1.7" />
            <circle cx="17" cy="20" r="1.7" />
            <path d="M3 4h2l2.5 12.5a1 1 0 001 .8H18a1 1 0 001-.8L21 9H7" />
        </svg>
    )
}

function PhoneIcon({ className = 'h-6 w-6' }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <path d="M22 16.92v2a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.09 5.2 2 2 0 014.11 3h2a2 2 0 012 1.72c.12.9.34 1.77.66 2.6a2 2 0 01-.45 2.11L7.09 10.5a16 16 0 006.41 6.41l1.07-1.23a2 2 0 012.11-.45c.83.32 1.7.54 2.6.66A2 2 0 0122 16.92z" />
        </svg>
    )
}
