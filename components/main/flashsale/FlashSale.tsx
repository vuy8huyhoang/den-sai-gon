// components/flashsale/FlashSale.drag-smooth.tsx
// ✅ Giữ nguyên giao diện/bo góc/kích thước như bản của bạn
// ✅ Thêm kéo chuột mượt ngang (drag-to-scroll) + wheel dọc → cuộn ngang
// ✅ Khi kéo: không bị "dính" ảnh/chữ (tắt click & native drag tạm thời)
// ✅ Không đổi API, chỉ thay logic trong track

'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ItemCard from '../shared/ItemCard'

/*** Kiểu dữ liệu (y như file gốc) ***/
export type FSProduct = {
    id: string | number
    title: string
    image: string
    price?: number
    priceMin?: number
    priceMax?: number
    compareAt?: number
    sold: number
    total: number
}

const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + 'đ'

/** Small hook: drag-to-scroll mượt & chặn click khi vừa kéo **/
function useDragScroll() {
    const ref = useRef<HTMLDivElement | null>(null)
    const dragging = useRef(false)
    const [isDragging, setIsDragging] = useState(false)
    const pos = useRef({ down: false, startX: 0, startLeft: 0, moved: false, lastX: 0, lastT: 0 })
    const justDragged = useRef(0)

    const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const el = ref.current
        if (!el) return
        pos.current.down = true
        pos.current.moved = false
        pos.current.startX = e.pageX
        pos.current.startLeft = el.scrollLeft
        pos.current.lastX = e.pageX
        pos.current.lastT = performance.now()
        dragging.current = true
        setIsDragging(true)
    }

    const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const el = ref.current
        if (!el || !pos.current.down) return
        e.preventDefault() // tránh select text / drag ảnh
        const dx = e.pageX - pos.current.startX
        if (!pos.current.moved && Math.abs(dx) > 3) pos.current.moved = true
        el.scrollLeft = pos.current.startLeft - dx
        pos.current.lastX = e.pageX
        pos.current.lastT = performance.now()
    }

    const end = () => {
        if (!pos.current.down) return
        pos.current.down = false
        // bật cờ justDragged để huỷ click ngay sau kéo (150ms)
        if (pos.current.moved) {
            justDragged.current = performance.now()
            // giữ pointer-events none trong 1 khung hình trước khi tắt
            requestAnimationFrame(() => setIsDragging(false))
        } else {
            setIsDragging(false)
        }
        dragging.current = false
    }

    // Wheel dọc → ngang (mượt PC)
    const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        const el = ref.current
        if (!el) return
        if (el.scrollWidth > el.clientWidth + 2) {
            el.scrollLeft += e.deltaY
            e.preventDefault()
        }
    }

    // Chặn native dragstart trên ảnh/link bên trong track
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const stopDrag = (ev: Event) => ev.preventDefault()
        el.addEventListener('dragstart', stopDrag, { passive: false })
        return () => el.removeEventListener('dragstart', stopDrag)
    }, [])

    // Huỷ click nếu vừa kéo (capture phase)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const onClickCapture = (ev: MouseEvent) => {
            if (performance.now() - justDragged.current < 180) {
                ev.stopPropagation(); ev.preventDefault()
            }
        }
        el.addEventListener('click', onClickCapture, true)
        return () => el.removeEventListener('click', onClickCapture, true)
    }, [])

    return {
        ref,
        isDragging,
        handlers: {
            onMouseDown,
            onMouseMove,
            onMouseLeave: end,
            onMouseUp: end,
            onWheel,
        },
    }
}

/*** Component chính: FLASH SALE ***/
export default function FlashSaleDenChum({
    title = 'FLASH SALE HỌC SINH - SINH VIÊN',
    windowLabel = '9h - 11h 09/09',
    nextWindowLabel = '9h - 11h 10/09',
    startInSeconds = 3665,
    products = [],
}: {
    title?: string
    windowLabel?: string
    nextWindowLabel?: string
    startInSeconds?: number
    products: FSProduct[]
}) {
    /** countdown HH:MM:SS **/
    const [left, setLeft] = useState(startInSeconds)
    useEffect(() => {
        const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
        return () => clearInterval(t)
    }, [])
    const { hh, mm, ss } = useMemo(() => {
        const h = Math.floor(left / 3600)
        const m = Math.floor((left % 3600) / 60)
        const s = left % 60
        const pad = (v: number) => v.toString().padStart(2, '0')
        return { hh: pad(h), mm: pad(m), ss: pad(s) }
    }, [left])

    /** slider: drag mượt, không dính ảnh/chữ **/
    const { ref: trackRef, handlers, isDragging } = useDragScroll()

    const scrollBy = (d: number) => {
        const el = trackRef.current
        if (!el) return
        const step = el.clientWidth * 0.9
        el.scrollBy({ left: d * step, behavior: 'smooth' })
    }

    return (
        <section className="w-full container-x pt-4">
            <div className="relative mx-auto  rounded-[12px] bg-[linear-gradient(180deg,#ffd6d6_0%,#ffe1e1_35%,#ffd7d7_60%,#ffcaca_100%)] shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                <div className="relative rounded-[14px] m-[10px] bg-white/0">
                    {/* Ribbon tiêu đề (nguyên vẹn) */}
                    <div className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 -top-7 z-10">
                        <div className="relative w-[620px] h-[56px]">
                            <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,#f74343_0%,#ff3d3d_50%,#f02727_100%)] shadow-[0_8px_0_#d42727,0_16px_24px_rgba(240,39,39,0.35)]" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-white font-extrabold tracking-wide text-[22px] drop-shadow-[0_2px_0_rgba(0,0,0,0.2)]">{title}</h2>
                            </div>
                            <div className="absolute -left-5 top-[10px] w-5 h-5 rotate-45 bg-[#d42727]" />
                            <div className="absolute -right-5 top-[10px] w-5 h-5 -rotate-45 bg-[#d42727]" />
                        </div>
                    </div>

                    {/* Tabs & countdown (nguyên vẹn) */}
                    <div className="pt-10 px-6">
                        <div className="relative flex items-center gap-4">
                            <GiftIcon className="hidden md:block" />
                            <div className="flex items-center gap-4">
                                <Tab label={windowLabel} active />
                                <Tab label={nextWindowLabel} />
                            </div>
                            <div className="flex-1" />
                            <div className="flex items-center gap-3 text-[#b71d1d]">
                                <span className="font-bold text-[16px]">BẮT ĐẦU SAU:</span>
                                <CountdownBox value={hh} />
                                <span className="font-bold text-[16px]">:</span>
                                <CountdownBox value={mm} />
                                <span className="font-bold text-[16px]">:</span>
                                <CountdownBox value={ss} />
                            </div>
                            <GiftIconRight className="hidden md:block" />
                        </div>
                    </div>

                    {/* Slider sản phẩm (giữ layout, thêm drag handlers) */}
                    <div className="relative px-6 pb-6 pt-2">
                        <button
                            onClick={() => scrollBy(-1)}
                            aria-label="prev"
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border hover:bg-slate-50"
                        >
                            <ChevronLeft className="mx-auto" size={20} />
                        </button>
                        <button
                            onClick={() => scrollBy(1)}
                            aria-label="next"
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-md border hover:bg-slate-50"
                        >
                            <ChevronRight className="mx-auto" size={20} />
                        </button>

                        <div className="relative overflow-hidden bg-white">
                            <div
                                ref={trackRef}
                                {...handlers}
                                data-dragging={isDragging ? 'true' : 'false'}
                                className={[
                                    'overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
                                    // UX: kéo thấy tay nắm và khoá select khi kéo
                                    isDragging ? 'cursor-grabbing select-none' : 'cursor-grab',
                                    // Cho phép cuộn dọc trên mobile, tránh chặn pan-y
                                    'touch-pan-y',
                                ].join(' ')}
                            >
                                {/* Khi đang kéo: tắt pointer events bên trong để không click nhầm */}
                                <div className={[
                                    'grid grid-flow-col auto-cols-[320px] md:auto-cols-[300px] gap-4 px-2',
                                    isDragging ? 'pointer-events-none select-none' : '',
                                ].join(' ')}>
                                    {products.map((p) => {
                                        const min = typeof p.priceMin === 'number' ? p.priceMin : p.price
                                        if (typeof min !== 'number') return null
                                        const max = typeof p.priceMax === 'number' ? p.priceMax : undefined
                                        const discount = p.compareAt && p.compareAt > min ? Math.round((1 - min / p.compareAt) * 100) : undefined

                                        return (
                                            <ItemCard
                                                title="Đèn chùm pha lê K9"
                                                image="/den-sai-gon/anh-sp/den-chum-dong (1).png"
                                                priceMin={3200000}
                                                priceMax={5600000}
                                                discount={discount}
                                                featureMode="chandelier"
                                                featureKeys={['size', 'led3mau', 'dong', 'inox201', 'phaleK9']} // chỉ hiện 3 icon này                                                // Hoặc dùng ảnh bảo hành riêng:
                                                warrantyMode="chandelierImg"
                                                warrantyImgChandelier="/den-sai-gon/icons/icon_Artboard 19.svg"
                                                variants={[
                                                    { image: '/den-sai-gon/anh-sp/den-chum-dong (1).png', label: '3 tay' },

                                                    { image: '/den-sai-gon/anh-sp/den-chum-dong (2).png', label: '6 tay' },
                                                    { image: '/den-sai-gon/anh-sp/den-chum-dong (3).png', label: '8 tay' },
                                                ]}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/*** Sub components (nguyên vẹn) ***/
function Tab({ label, active = false }: { label: string; active?: boolean }) {
    return (
        <button
            className={[
                'h-[44px] px-5 rounded-[24px] text-[14px] font-semibold',
                'shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)]',
                active ? 'bg-white text-[#b71d1d] border border-white' : 'bg-white/70 text-[#7a1b1b] border border-white/70',
            ].join(' ')}
        >
            {label}
        </button>
    )
}

function CountdownBox({ value }: { value: string }) {
    return (
        <div className="w-[40px] h-[32px] rounded-[6px] bg-white text-[#b71d1d] flex items-center justify-center font-extrabold tracking-wider shadow-[0_2px_0_rgba(0,0,0,0.1)]">
            {value}
        </div>
    )
}

function GiftIcon({ className = '' }: { className?: string }) {
    return (
        <div className={`relative w-[56px] h-[56px] ${className}`}>
            <div className="absolute inset-0 bg-[url('/den-sai-gon/flash/boxt.png')] bg-contain bg-no-repeat" />
        </div>
    )
}
function GiftIconRight({ className = '' }: { className?: string }) {
    return (
        <div className={`relative w-[56px] h-[56px] ${className}`}>
            <div className="absolute inset-0 bg-[url('/den-sai-gon/flash/boxp.png')] bg-contain bg-no-repeat" />
        </div>
    )
}

/*** Demo data (tuỳ chọn) ***/
export const DEMO_PRODUCTS: FSProduct[] = [
    { id: 1, title: 'Đèn chùm pha lê 12 tay cao cấp', image: '/den-sai-gon/anh-sp/den-chum.png', priceMin: 11241000, priceMax: 13990000, compareAt: 14990000, sold: 5, total: 5 },
    { id: 2, title: 'Đèn chùm hiện đại 10 tay', image: '/den-sai-gon/anh-sp/den-chum.png', priceMin: 8900000, priceMax: 12500000, compareAt: 13900000, sold: 0, total: 20 },
    { id: 3, title: 'Đèn chùm phong cách Bắc Âu', image: '/den-sai-gon/anh-sp/den-chum.png', priceMin: 4990000, priceMax: 9500000, compareAt: 10500000, sold: 0, total: 50 },
    { id: 4, title: 'Đèn chùm pha lê cao cấp', image: '/den-sai-gon/anh-sp/den-chum.png', priceMin: 2390000, priceMax: 3990000, compareAt: 4500000, sold: 0, total: 20 },
    { id: 5, title: 'Đèn chùm tân cổ điển', image: '/den-sai-gon/anh-sp/den-chum.png', price: 2190000, compareAt: 2800000, sold: 0, total: 20 },
]
