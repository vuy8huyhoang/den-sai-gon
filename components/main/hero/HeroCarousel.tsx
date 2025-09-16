"use client"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import HeroArrow from "./HeroArrow"

export type Banner = { src: string; alt?: string; href?: string }

/**
 * HeroCarousel — drag mượt + loop vô hạn (giữ nguyên bo góc & class cũ)
 * - KHÔNG thay đổi className hiện tại (giữ rounded trên slide & ảnh)
 * - Sửa bug kéo: bỏ CSS snap cứng → dùng logic snap theo ngưỡng & vận tốc
 * - Đến cuối quay vòng về đầu (clone 2 đầu)
 */
export default function HeroCarousel({
  images = [],
  heightClass = "h-[300px] md:h-[500px]",
  autoPlayMs = 0, // 0 = off
}: {
  images?: Banner[]
  heightClass?: string
  autoPlayMs?: number
}) {
  const realSlides: Banner[] = images.length ? images : DEFAULT_BANNERS
  // [last, ...real, first] để loop mượt
  const slides =
    realSlides.length > 1 ? [realSlides[realSlides.length - 1], ...realSlides, realSlides[0]] : [...realSlides]

  const trackRef = useRef<HTMLDivElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [canLeft, setCanLeft] = useState(true)
  const [canRight, setCanRight] = useState(true)

  const S = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    startTime: 0,
    width: 0,
    index: Math.min(1, slides.length - 1), // begin at first real slide
    scrollTimer: 0 as unknown as number,
    autoTimer: 0 as unknown as number,
  })

  // Init vị trí + chiều rộng slide
  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el) return
    S.current.width = el.clientWidth
    if (slides.length > 1) {
      el.scrollLeft = S.current.width * 1 // index 1 (slide thật đầu tiên)
      S.current.index = 1
    } else {
      el.scrollLeft = 0
      S.current.index = 0
    }
  }, [slides.length])

  // Resize → giữ đúng slide hiện tại
  useEffect(() => {
    const onResize = () => {
      const el = trackRef.current
      if (!el) return
      S.current.width = el.clientWidth
      el.scrollTo({ left: S.current.index * S.current.width, behavior: "instant" as ScrollBehavior })
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Auto play
  useEffect(() => {
    if (!autoPlayMs || slides.length <= 1) return
    const tick = () => goToIndex(nearestIndex() + 1, true)
    S.current.autoTimer = window.setInterval(tick, autoPlayMs)
    return () => window.clearInterval(S.current.autoTimer)
  }, [autoPlayMs, slides.length])

  const nearestIndex = () => {
    const el = trackRef.current!
    return Math.round(el.scrollLeft / S.current.width)
  }

  const normalizeLoop = () => {
    const el = trackRef.current!
    const len = slides.length
    if (len <= 1) return
    if (S.current.index === 0) {
      S.current.index = len - 2 // last real
      el.scrollTo({ left: S.current.index * S.current.width, behavior: "instant" as ScrollBehavior })
    } else if (S.current.index === len - 1) {
      S.current.index = 1 // first real
      el.scrollTo({ left: S.current.index * S.current.width, behavior: "instant" as ScrollBehavior })
    }
  }

  const goToIndex = (i: number, smooth: boolean) => {
    const el = trackRef.current!
    if (!el || slides.length === 0) return
    S.current.index = i
    el.scrollTo({ left: i * S.current.width, behavior: smooth ? "smooth" : ("instant" as ScrollBehavior) })
    if (S.current.scrollTimer) window.clearTimeout(S.current.scrollTimer)
    S.current.scrollTimer = window.setTimeout(
      () => {
        normalizeLoop()
        updateArrows()
      },
      smooth ? 360 : 0,
    )
  }

  const updateArrows = () => {
    if (slides.length <= 1) {
      setCanLeft(false)
      setCanRight(false)
      return
    }
    setCanLeft(true)
    setCanRight(true)
  }

  const goBy = (d: 1 | -1) => goToIndex(nearestIndex() + d, true)

  // ----- Drag (PC) với ngưỡng + vận tốc -----
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = trackRef.current
    if (!el) return
    S.current.down = true
    S.current.startX = e.pageX
    S.current.startLeft = el.scrollLeft
    S.current.startTime = performance.now()
    setDragging(true)
  }

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = trackRef.current
    if (!el || !S.current.down) return
    e.preventDefault()
    const dx = e.pageX - S.current.startX
    el.scrollLeft = S.current.startLeft - dx
  }

  const endDrag = () => {
    if (!S.current.down) return
    S.current.down = false
    setDragging(false)

    const el = trackRef.current!
    const dt = Math.max(1, performance.now() - S.current.startTime)
    const delta = el.scrollLeft - S.current.startLeft // >0 kéo sang phải (next)
    const v = Math.abs(delta) / dt // px/ms
    const i = nearestIndex()

    const threshold = S.current.width * 0.22
    const fast = v > 0.55 // vuốt nhanh → nảy qua slide

    if (Math.abs(delta) > threshold || fast) {
      goToIndex(i + (delta > 0 ? 1 : -1), true)
    } else {
      goToIndex(i, true)
    }
  }

  // Wheel dọc → ngang + snap lại sau khi dừng
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const el = trackRef.current
    if (!el) return
    if (el.scrollWidth > el.clientWidth + 2) {
      el.scrollLeft += e.deltaY
      e.preventDefault()
      if (S.current.scrollTimer) window.clearTimeout(S.current.scrollTimer)
      S.current.scrollTimer = window.setTimeout(() => goToIndex(nearestIndex(), true), 140)
    }
  }

  // Khoá select khi kéo
  useEffect(() => {
    if (!dragging) return
    const prev = document.body.style.userSelect
    document.body.style.userSelect = "none"
    return () => {
      document.body.style.userSelect = prev
    }
  }, [dragging])

  return (
    <div className="relative overflow-hidden">
      {/* giữ nguyên wrapper */}
      {/* Track: bỏ snap-mandatory để tránh xung đột, dùng logic snap tay */}
      <div
        ref={trackRef}
        className={[
          "flex w-full",
          dragging ? "cursor-grabbing select-none" : "cursor-grab",
          "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          "touch-pan-y",
        ].join(" ")}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onWheel={onWheel}
        onScroll={() => {
          const el = trackRef.current
          if (!el) return
          S.current.index = Math.round(el.scrollLeft / S.current.width)
        }}
      >
        {slides.map((b, i) => (
          <section key={i} className={`relative shrink-0 w-full rounded-[12px] ${heightClass}`}>
            <Image
              src={b.src || "/placeholder.svg"}
              alt={b.alt || ""}
              fill
              sizes="100vw"
              priority={i === 1}
              loading={i === 1 ? undefined : "lazy"}
              className="object-cover select-none [-webkit-user-drag:none] rounded-[14px]"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
            {b.href && (
              <Link
                href={b.href}
                aria-label={b.alt || "banner"}
                className={`absolute inset-0 ${dragging ? "pointer-events-none" : "pointer-events-auto"}`}
              />
            )}
          </section>
        ))}
      </div>

      {/* Arrows: giữ kích thước/position cũ */}
      <HeroArrow dir="left" onClick={() => goBy(-1)} disabled={!canLeft} />
      <HeroArrow dir="right" onClick={() => goBy(1)} disabled={!canRight} />
    </div>
  )
}

// ======== Fallback banners =========

const DEFAULT_BANNERS: Banner[] = [
  { src: "data:image/svg+xml;utf8," + encodeURIComponent(svgGradient("#065f46", "#10b981")) },
  { src: "data:image/svg+xml;utf8," + encodeURIComponent(svgGradient("#047857", "#34d399")) },
  { src: "data:image/svg+xml;utf8," + encodeURIComponent(svgGradient("#059669", "#6ee7b7")) },
]

function svgGradient(a: string, b: string) {
  return `\
  <svg xmlns='http://www.w3.org/2000/svg' width='1600' height='600'>\
    <defs>\
      <linearGradient id='g' x1='0' y1='1' x2='1' y2='0'>\
        <stop offset='0' stopColor='${a}'/>\\
        <stop offset='1' stopColor='${b}'/>\\
      </linearGradient>\\
    </defs>\\
    <rect width='100%' height='100%' fill='url(#g)'/>\\
  </svg>`
}
