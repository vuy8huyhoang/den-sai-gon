// components/floating/ContactFab.tsx
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Phone, ChevronUp } from 'lucide-react'

/**
 * Nút liên hệ nổi góc phải dưới: Zalo, Gọi, Lên đầu trang.
 * - Zalo: dùng PNG để giống bản gốc (đặt tại /public/icons/zalo.png)
 * - Gọi: có thể mở tel: hoặc popup danh sách số
 * - Lên đầu trang: mượt (behavior: 'smooth')
 */
export default function ContactFab() {
    const [showTop, setShowTop] = useState(false)

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300)
        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <div className="fixed hidden md:flex right-4 bottom-24 z-[60] flex flex-col items-center gap-3">
            {/* Zalo */}
            <a
                href="https://zalo.me/0853892898"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:scale-[1.03] transition-transform"
                aria-label="Chat Zalo"
                title="Chat Zalo"
            >
                <Image src="/den-sai-gon/icons/zalo.png" alt="Zalo" width={48} height={48} className="rounded-full" />
            </a>

            {/* Gọi điện */}
            <a
                href="tel:0853892898"
                className="inline-flex items-center phone-ripple phone-wiggle phone-wiggle-paused justify-center w-12 h-12 rounded-full bg-red-500 text-white shadow-lg ring-1 ring-red-400/40 hover:bg-red-600"
                aria-label="Gọi điện"
                title="Gọi điện"
            >
                <Phone size={22} />
            </a>

            {/* Lên đầu trang */}
            {showTop && (
                <button
                    onClick={handleTop}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800 text-white shadow-lg hover:bg-neutral-700"
                    aria-label="Lên đầu trang"
                    title="Lên đầu trang"
                >
                    <ChevronUp size={20} />
                </button>
            )}
        </div>
    )
}

/* ==================
CÁCH DÙNG
================== */
// 1) Thêm file PNG Zalo vào: public/icons/zalo.png
// 2) Import và render component này 1 lần trong layout hoặc page:
//    import ContactFab from '@/components/floating/ContactFab'
//    ...
//    <ContactFab />
//
// Mẹo:
// - Muốn đổi số điện thoại: sửa href="tel:..."
// - Muốn thêm nút Facebook/Map…: thêm button/a tương tự trong stack
// - Nếu muốn tránh đè footer: thêm bottom-20 khi cần
