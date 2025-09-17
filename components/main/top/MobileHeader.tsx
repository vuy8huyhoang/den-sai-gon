'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MobileMenu from '../floating/MobileMenu'

/*
 * MobileHeader — phiên bản giống ảnh mẫu (logo trái, ô tìm kiếm giữa, MENU phải)
 * - Luôn sticky trên mobile (ẩn trên ≥ md)
 * - Ô tìm kiếm giữa có icon kính lúp ở trong
 * - Nút MENU bên phải có chữ “MENU” nhỏ bên dưới
 * - Giữ API đơn giản, điều hướng sang /search?q=...
 */

export default function MobileHeader({ cartCount = 0 }: { cartCount?: number }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [q, setQ] = useState('')
  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const t = q.trim()
    if (t) router.push(`/search?q=${encodeURIComponent(t)}`)
  }

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 px-3 py-2">
          {/* Logo trái */}
          <Link href="/" className="shrink-0 inline-flex items-center">
            <Image src="/logo.svg" width={120} height={28} alt="LEDXANH" priority />
          </Link>

          {/* Ô tìm kiếm giữa */}
          <form onSubmit={onSubmit} className="relative flex-1 min-w-0">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Tìm kiếm"
              placeholder="Tìm kiếm..."
              className="w-full h-9 rounded-md bg-white border border-slate-300 pl-3 pr-9 text-[13px] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
            />
            <button
              type="submit"
              aria-label="Tìm"
              className="absolute right-2 top-1.5 grid place-items-center h-6 w-6 rounded-md text-slate-600 hover:text-emerald-700"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
          </form>

          {/* Nút MENU phải */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="shrink-0 grid place-items-center px-2 py-1 rounded-lg active:scale-[0.98]"
            aria-label="Mở menu"
          >
            <span className="flex flex-col items-center leading-none">
              <Menu className="h-6 w-6 text-slate-900" />
              <span className="mt-[2px] text-[10px] font-semibold tracking-wide text-slate-700">MENU</span>
            </span>
          </button>
        </div>
      </header>

      {/* Off-canvas menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}
