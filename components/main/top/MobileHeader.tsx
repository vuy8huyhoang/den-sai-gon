"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, ShoppingCart } from "lucide-react"
import MobileMenu from "../floating/MobileMenu"
import SearchModal from "../search/SearchModal"

interface MobileHeaderProps {
  cartCount?: number
}

export default function MobileHeader({ cartCount = 0 }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Menu Button - Enhanced with better touch target */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-10 h-10 -ml-1 rounded-xl hover:bg-slate-100/80 active:bg-slate-200/80 transition-all duration-200 touch-manipulation"
            aria-label="Mở menu"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>

          {/* Logo - Centered with better proportions */}
          <Link href="/" className="flex-1 flex justify-center px-4">
            <Image src="/logo.svg" width={140} height={28} alt="ĐÈN SÀI GÒN" priority className="h-7 w-auto" />
          </Link>

          {/* Right Actions - Enhanced with better spacing and styling */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100/80 active:bg-slate-200/80 transition-all duration-200 touch-manipulation"
              aria-label="Tìm kiếm"
            >
              <Search className="h-5 w-5 text-slate-700" />
            </button>
            <Link
              href="/gio-hang"
              className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100/80 active:bg-slate-200/80 transition-all duration-200 touch-manipulation"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="h-5 w-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1.5 flex items-center justify-center rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
