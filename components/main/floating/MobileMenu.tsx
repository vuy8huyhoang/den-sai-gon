"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, ChevronRight, Home, Search, Phone, MessageCircle } from "lucide-react"
import { CATEGORY_ITEMS } from "../../../lib/data"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categorySubItems: { [key: string]: string[] } = {
    "Đèn âm trần": [
      "Đèn LED âm trần 3 màu",
      "Đèn LED âm trần rọi",
      "Đèn LED âm trần siêu mỏng",
      "Đèn LED âm trần vuông",
      "Đèn LED âm trần dimmer",
    ],
    "Đèn chùm": ["Đèn chùm pha lê", "Đèn chùm hiện đại", "Đèn chùm tân cổ điển", "Đèn chùm quạt"],
    "Quạt trần": ["Quạt trần 5 cánh", "Quạt trần 3 cánh", "Cánh cụp xoè", "Giấu cánh"],
    "Đèn thả": ["Thả bàn ăn", "Thả ly / thủy tinh", "Thả ống bơ", "Thả vintage"],
    "Đèn tường": ["Hắt tường", "Đèn gương", "Đèn cầu thang", "Ngoài trời"],
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <Link href="/" onClick={onClose}>
              <Image src="/logo.svg" width={120} height={24} alt="ĐÈN SÀI GÒN" priority />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Đóng menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-slate-200">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">Trang chủ</span>
              </Link>
              <Link
                href="/tim-kiem"
                onClick={onClose}
                className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span className="text-sm font-medium">Tìm kiếm</span>
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Danh mục sản phẩm</h3>
              <div className="space-y-1">
                {CATEGORY_ITEMS.slice(0, -1).map((category, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setActiveCategory(activeCategory === category.label ? null : category.label)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Image
                            src={category.img || "/placeholder.svg"}
                            width={20}
                            height={20}
                            alt={category.label}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{category.label}</span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          activeCategory === category.label ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {/* Subcategories */}
                    {activeCategory === category.label && categorySubItems[category.label] && (
                      <div className="ml-11 mt-2 space-y-1">
                        {categorySubItems[category.label].map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={`/danh-muc/${category.label.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={onClose}
                            className="block p-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          >
                            {subItem}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="space-y-3">
              <a
                href="tel:0853892898"
                className="flex items-center gap-3 p-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <div>
                  <div className="text-sm font-medium">Hotline</div>
                  <div className="text-xs opacity-90">0853.892.898</div>
                </div>
              </a>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">Chat Zalo</div>
                  <div className="text-xs opacity-90">Tư vấn miễn phí</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
