"use client"
import { useEffect } from "react"
import Link from "next/link"
import { X, Home, Grid3X3, Phone, User } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const menuItems = [
    { icon: Home, label: "Trang chủ", href: "/" },
    { icon: Grid3X3, label: "Danh mục sản phẩm", href: "/danh-muc" },
    { icon: Phone, label: "Liên hệ", href: "/lien-he" },
    { icon: User, label: "Tài khoản", href: "/tai-khoan" },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Menu</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Đóng menu"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-slate-600" />
                  <span className="font-medium text-slate-900">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
