"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchBarProps {
  placeholder?: string
  className?: string
  autoFocus?: boolean
  onClose?: () => void
}

const POPULAR_SEARCHES = [
  "Đèn LED âm trần",
  "Đèn chùm pha lê",
  "Quạt trần 5 cánh",
  "Đèn thả bàn ăn",
  "Đèn LED panel",
  "Đèn rọi ray",
]

const RECENT_SEARCHES = ["Đèn LED âm trần 9W", "Đèn chùm hiện đại", "Quạt trần giấu cánh"]

export default function SearchBar({
  placeholder = "Tìm kiếm sản phẩm...",
  className = "",
  autoFocus = false,
  onClose,
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>(RECENT_SEARCHES)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recent-searches")
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Save to recent searches
    const newRecent = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
    setRecentSearches(newRecent)
    localStorage.setItem("recent-searches", JSON.stringify(newRecent))

    // Navigate to search results
    router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery)}`)
    setIsOpen(false)
    onClose?.()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem("recent-searches")
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          )}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {query ? (
              // Search suggestions based on query
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Tìm kiếm cho "{query}"</span>
                </div>
                <button
                  onClick={() => handleSearch(query)}
                  className="w-full text-left p-2 hover:bg-slate-50 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm">{query}</span>
                  </div>
                </button>
              </div>
            ) : (
              // Default suggestions
              <div className="p-4 space-y-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">Tìm kiếm gần đây</span>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="w-full text-left p-2 hover:bg-slate-50 rounded-md transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span className="text-sm text-slate-600">{search}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Tìm kiếm phổ biến</span>
                  </div>
                  <div className="space-y-1">
                    {POPULAR_SEARCHES.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-md transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-emerald-500" />
                          <span className="text-sm text-slate-600">{search}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
