"use client"
import React from "react"
import Image from "next/image"

/* =====================================================
   MobileDockSimpleImages v3 — cân đối & tinh tế hơn
   - Thanh dưới "glassy" (blur + viền mảnh), bóng đổ nhẹ
   - Center Hotline nổi dạng capsule tròn + viền 2 lớp + glow mềm
   - Icon 2 bên nhạt khi inactive, rõ khi active; chữ có thể ẩn
   - Dùng HÌNH PNG/SVG bạn cung cấp; responsive; ẩn ≥md
===================================================== */

type Tab = "home" | "chat" | "hotline" | "zalo" | "cart"

export type MobileDockImageProps = {
    phone?: string
    cartCount?: number
    active?: Tab
    onHome?: () => void
    onChat?: () => void
    onZalo?: () => void
    onCart?: () => void
    className?: string
    brandColor?: string // đổi màu hotline
    hideLabels?: boolean // ẩn chữ dưới icon nếu muốn
    icons?: {
        home?: string
        chat?: string
        zalo?: string
        cart?: string
        phone?: string
    }
}

const DEFAULT_ICONS = {
    home: "/den-sai-gon/icons/icon-3 (1).svg",
    chat: "/den-sai-gon/icons/icon-3 (3).svg",
    zalo: "/den-sai-gon/icons/icon-3 (4).svg",
    cart: "/den-sai-gon/icons/icon-3 (2).svg",
    phone: "/den-sai-gon/icons/icon-3 (5).svg",
}

export default function MobileDockSimpleImages({
    phone = "0853892898",
    cartCount = 0,
    active = "hotline",
    onHome,
    onChat,
    onZalo,
    onCart,
    className = "",
    brandColor = "#079553",
    hideLabels = false,
    icons = {},
}: MobileDockImageProps) {
    const ic = { ...DEFAULT_ICONS, ...icons }

    const Item = ({
        label,
        src,
        onClick,
        isActive,
        aria,
    }: {
        label: string
        src: string
        onClick?: () => void
        isActive?: boolean
        aria: string
    }) => (
        <button
            type="button"
            aria-label={aria}
            onClick={onClick}
            className={[
                "relative flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 active:scale-[0.98] transition",
                isActive ? "text-slate-900" : "text-slate-600",
            ].join(" ")}
        >
            <span className="grid place-items-center h-6 w-6">
                <Image
                    src={src}
                    alt={label}
                    width={24}
                    height={24}
                    className={`h-6 w-6 object-contain ${isActive ? "opacity-100" : "opacity-70"} transition-opacity`}
                    priority={false}
                />
            </span>
            {!hideLabels && (
                <span className="text-[11px] leading-none font-medium select-none">{label}</span>
            )}
        </button>
    )

    return (
        <nav
            role="navigation"
            aria-label="Mobile dock"
            className={[
                "md:hidden fixed inset-x-0 bottom-0 z-50",
                // glassy bar
                "supports-[backdrop-filter]:backdrop-blur bg-white/88 border-t border-slate-200",
                "shadow-[0_-10px_24px_rgba(2,6,23,0.06)]",
                className,
            ].join(" ")}
            style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
            <div className="relative mx-auto max-w-screen-sm">
                {/* grid 2 bên + chừa chỗ giữa */}
                <div className="grid grid-cols-5 items-end px-3 py-2">
                    <Item aria="Trang chủ" label="Trang chủ" isActive={active === "home"} src={ic.home} onClick={onHome} />
                    <Item aria="Chat" label="Chat" isActive={active === "chat"} src={ic.chat} onClick={onChat} />
                    <div />
                    <Item aria="Zalo" label="Zalo" isActive={active === "zalo"} src={ic.zalo} onClick={onZalo} />
                    <div className="relative">
                        <Item aria="Giỏ hàng" label="Giỏ hàng" isActive={active === "cart"} src={ic.cart} onClick={onCart} />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 right-3 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-emerald-600 text-white text-[10px] font-semibold">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </div>
                </div>

                {/* Center Hotline — capsule tròn nổi, viền 2 lớp + glow mềm */}
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-7">
                    <a
                        href={`tel:${phone}`}
                        aria-label="Gọi Hotline"
                        className="pointer-events-auto group inline-grid place-items-center rounded-full"
                        style={{
                            // viền 2 lớp bằng box-shadow để luôn mềm và đều
                            boxShadow:
                                "0 8px 20px rgba(2,6,23,.18), 0 0 0 6px rgba(7,149,83,.12), inset 0 1px 0 rgba(255,255,255,.35)",
                            background: `radial-gradient(120px 120px at 50% 30%, rgba(255,255,255,.18), transparent 55%), ${brandColor}`,
                        }}
                    >
                        <div className="relative h-16 w-16 rounded-full grid place-items-center">
                            {/* vòng ánh sáng mờ phía sau */}
                            <span
                                className="absolute -inset-2 rounded-full blur-md opacity-60"
                                style={{ background: brandColor }}
                                aria-hidden
                            />
                            {/* icon phone */}
                            <span className="relative block h-7 w-7">
                                <Image src={ic.phone} alt="Hotline" fill sizes="28px" className="object-contain" />
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    )
}

/* -----------------------------------------------------
USAGE

<MobileDockSimpleImages
  phone="0853892898"
  cartCount={2}
  brandColor="#079553" // hoặc đổi #0ea5e9 cho xanh dương
  hideLabels={false}
  icons={{
    home: "/den-sai-gon/icons/icon-3 (1).svg",
    chat: "/den-sai-gon/icons/icon-3 (3).svg",
    zalo: "/den-sai-gon/icons/icon-3 (4).svg",
    cart: "/den-sai-gon/icons/icon-3 (2).svg",
    phone: "/den-sai-gon/icons/icon-3 (5).svg",
  }}
/>
----------------------------------------------------- */