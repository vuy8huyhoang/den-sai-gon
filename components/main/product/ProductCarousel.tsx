"use client"
import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
// ⚠️ Chỉnh path theo project của bạn (đường dẫn tới ItemCard hiện đang dùng)
import ItemCard, { type Variant as ItemVariant } from "../shared/ItemCard"

export type Product = {
  id: string | number
  title: string
  image: string
  priceMin: number
  priceMax?: number
  discount?: number
  variants?: ItemVariant[]
  isDownlight?: boolean
  // OPTIONAL: chỉ truyền khi có
  attributes?: Array<{
    key: string
    label: string
    type?: "chip" | "color"
    values: Array<{ label: string; value?: string; color?: string; note?: string }>
    defaultIndex?: number
    scroll?: boolean
  }>
}

const innerX = "px-6 md:px-8 xl:px-8"

/* -----------------------------------------------
   Hook kéo ngang được cải thiện với smooth scrolling
----------------------------------------------- */
function useDragScroll(ref: React.RefObject<HTMLDivElement>) {
  const [dragging, setDragging] = useState(false)
  const state = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    moved: false,
    lastMoveTime: 0,
  })

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const el = ref.current
    if (!el) return
    state.current.down = true
    state.current.moved = false
    state.current.startX = e.pageX
    state.current.startLeft = el.scrollLeft
    setDragging(true)
    e.preventDefault()
  }, [])

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const el = ref.current
    if (!el || !state.current.down) return

    const now = Date.now()
    if (now - state.current.lastMoveTime < 16) return // ~60fps
    state.current.lastMoveTime = now

    e.preventDefault()
    const dx = e.pageX - state.current.startX
    if (Math.abs(dx) > 3) state.current.moved = true

    requestAnimationFrame(() => {
      if (el) {
        el.scrollLeft = state.current.startLeft - dx
      }
    })
  }, [])

  const end = useCallback(() => {
    if (!state.current.down) return
    state.current.down = false
    setTimeout(() => setDragging(false), 50)
  }, [])

  const onWheel: React.WheelEventHandler<HTMLDivElement> = useCallback((e) => {
    const el = ref.current
    if (!el) return

    // Chỉ xử lý horizontal scroll khi có thể scroll ngang
    if (el.scrollWidth > el.clientWidth + 2) {
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY)

      if (isHorizontalScroll) {
        el.scrollLeft += e.deltaX
        e.preventDefault()
      } else {
        const canScrollVertically = document.documentElement.scrollHeight > window.innerHeight

        if (e.shiftKey || !canScrollVertically) {
          el.scrollLeft += e.deltaY * 0.5 // Giảm tốc độ scroll để mượt hơn
          e.preventDefault()
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!dragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (state.current.down) {
        e.preventDefault()
      }
    }

    const handleGlobalMouseUp = () => {
      end()
    }

    document.addEventListener("mousemove", handleGlobalMouseMove, { passive: false })
    document.addEventListener("mouseup", handleGlobalMouseUp)
    document.body.style.userSelect = "none"
    document.body.style.cursor = "grabbing"

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
      document.body.style.userSelect = ""
      document.body.style.cursor = ""
    }
  }, [dragging, end])

  return {
    dragging,
    handlers: {

      onMouseMove,
      onMouseLeave: end,
      onMouseUp: end,
      onWheel,
    },
  }
}

export default function ProductCarouselAligned({
  title = "ĐÈN LED CHIẾU SÁNG",
  tabs = ["Đèn LED âm trần downlight", "Đèn LED ốp trần", "Đèn LED panel", "Đèn LED tuýp"],
  products = [],
}: {
  title?: string
  tabs?: string[]
  products?: Product[]
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { dragging, handlers } = useDragScroll(scrollerRef)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollBy = useCallback((direction: number) => {
    const el = scrollerRef.current
    if (!el) return
    const containerWidth = el.clientWidth
    const scrollAmount = containerWidth * 0.8 // Giảm từ 0.9 xuống 0.8 để mượt hơn

    el.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    })
  }, [])

  const updateScrollButtons = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return

    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollButtons()
          ticking = false
        })
        ticking = true
      }
    }

    el.addEventListener("scroll", handleScroll, { passive: true })
    updateScrollButtons() // Initial check

    return () => el.removeEventListener("scroll", handleScroll)
  }, [updateScrollButtons])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const resizeObserver = new ResizeObserver(() => {
      updateScrollButtons()
    })

    resizeObserver.observe(el)
    return () => resizeObserver.disconnect()
  }, [updateScrollButtons])

  return (
    <section className="my-8 container-x">
      <div className="rounded-[14px] bg-[#079553] py-2">
        {/* Header */}
        <div className={`bg-[#079553] rounded-[14px] h-12 flex items-center ${innerX}`}>
          <h2 className="text-white font-bold text-[20px] tracking-wide">{title}</h2>
          <div className="ml-auto flex gap-8 text-white/95 text-[14px]">
            {tabs.map((t, i) => (
              <button key={i} className="hover:underline/50 whitespace-nowrap transition-all duration-200">
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className={`relative pt-3 pb-4 ${innerX}`}>
          <button
            onClick={() => scrollBy(-1)}
            className={`absolute left-2 md:left-5 top-[250px] z-20 w-11 h-11 rounded-full bg-white border shadow-md text-slate-700 transition-all duration-200 ${canScrollLeft ? "hover:bg-slate-50 hover:shadow-lg opacity-100" : "opacity-50 cursor-not-allowed"
              }`}
            disabled={!canScrollLeft}
            aria-label="Previous"
          >
            <ChevronLeft size={20} className="mx-auto" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className={`absolute right-2 md:right-5 top-[250px] z-20 w-11 h-11 rounded-full bg-white border shadow-md text-slate-700 transition-all duration-200 ${canScrollRight ? "hover:bg-slate-50 hover:shadow-lg opacity-100" : "opacity-50 cursor-not-allowed"
              }`}
            disabled={!canScrollRight}
            aria-label="Next"
          >
            <ChevronRight size={20} className="mx-auto" />
          </button>

          {/* Track */}
          <div className="relative overflow-hidden bg-white">
            <div
              ref={scrollerRef}
              {...handlers}
              className={[
                "overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                "touch-pan-x",
                dragging ? "cursor-grabbing select-none" : "cursor-grab",
                "will-change-scroll",
              ].join(" ")}
              style={{
                scrollBehavior: dragging ? "auto" : "smooth",
              }}
            >
              <div
                className={[
                  "grid grid-flow-col auto-cols-[300px] gap-4 px-2",
                  dragging ? "pointer-events-none" : "pointer-events-auto",
                  "transform-gpu",
                ].join(" ")}
              >
                {products.map((p) => {
                  const baseProps = {
                    title: p.title,
                    image: p.image,
                    priceMin: p.priceMin,
                    priceMax: p.priceMax,
                    discount: p.discount,
                    variants: p.variants,
                    featureMode: p.isDownlight ? ("downlight" as const) : ("custom" as const),
                    featureKeys: p.isDownlight ? (["antiglare", "cri97", "warranty3y", "genuine"] as const) : undefined,
                    warrantyMode: p.isDownlight ? ("downlightImg" as const) : ("auto" as const),
                    progress: null as any,
                  }
                  // Tương thích ItemCard cũ: chỉ thêm attributes nếu có (ép any để khỏi lỗi TS khi ItemCardProps chưa có)
                  const extra: any = {}
                  if (p.attributes) extra.attributes = p.attributes

                  return <ItemCard key={p.id} {...baseProps} {...extra} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
