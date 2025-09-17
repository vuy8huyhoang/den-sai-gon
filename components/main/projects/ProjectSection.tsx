'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export type ProjectItem = {
    image: string
    title: string
    href?: string
}

export default function ProjectsSection({
    title = 'CÔNG TRÌNH',
    items = [],
    className = '',
    /** số cột ở breakpoint lớn (>=1024px) */
    lgCols = 4,
    /** tỉ lệ ảnh card (ví dụ: '16/10', '4/3') */
    ratio = '16/10',
}: {
    title?: string
    items: ProjectItem[]
    className?: string
    lgCols?: 3 | 4 | 5
    ratio?: `${number}/${number}`
}) {
    const data = items.length ? items : DEFAULT_ITEMS

    // chuyển số cột thành lớp Tailwind
    const lgColsClass = `lg:grid-cols-${lgCols}` as const

    // hook kéo mượt + chặn click sau khi kéo (mobile)
    const { ref: trackRef, isDragging, handlers } = useDragScroll()

    return (
        <section className={`my-8 ${className}`}>
            <div className="container-x ">
                {/* Vỏ khung xanh đồng bộ với ProductCarousel */}
                <div className="rounded-[14px] bg-[#079553] p-2">
                    {/* Header xanh */}
                    <div className="bg-[#079553] h-12 flex items-center px-6 rounded-t-[14px]">
                        <h2 className="text-white font-bold text-[20px] tracking-wide">{title}</h2>
                    </div>

                    {/* Thân */}
                    <div className="px-6 py-3">
                        {/* MOBILE: ẩn grid, hiển thị 1 dòng slide ngang (kéo bằng chuột/ngón tay) */}
                        <div className="md:hidden relative">
                            <div
                                ref={trackRef}
                                {...handlers}
                                data-dragging={isDragging ? 'true' : 'false'}
                                className={[
                                    'flex gap-3 overflow-x-auto pb-2',
                                    'snap-x snap-mandatory',
                                    '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
                                    isDragging ? 'cursor-grabbing select-none' : 'cursor-grab',
                                    'touch-pan-y',
                                ].join(' ')}
                            >
                                {data.map((it, i) => (
                                    <div key={i} className="snap-start shrink-0 w-[78vw] xs:w-[68vw] sm:w-[58vw]">
                                        <Card item={it} ratio={ratio} />
                                    </div>
                                ))}
                            </div>
                            {/* viền mờ 2 bên để nhấn mạnh cuộn */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white/90 to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white/90 to-transparent" />
                        </div>

                        {/* DESKTOP/TABLET: grid như cũ */}
                        <div className={`hidden md:grid grid-cols-2 ${lgColsClass} gap-4 md:gap-5`}>
                            {data.map((it, i) => (
                                <Card key={i} item={it} ratio={ratio} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Card({ item, ratio = '16/10' }: { item: ProjectItem; ratio?: `${number}/${number}` }) {
    const Wrapper: any = item.href ? Link : 'div'
    const wrapperProps = item.href ? { href: item.href } : {}

    return (
        <Wrapper
            {...wrapperProps}
            className="group block h-full rounded-xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition-shadow"
        >
            <div className={`relative aspect-[${ratio}]`}>
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={false}
                />
            </div>
            <div className="p-4">
                <h3 className="text-[15px] leading-5 text-slate-800 line-clamp-2">{item.title}</h3>
            </div>
        </Wrapper>
    )
}

/**
 * Kéo mượt ngang + wheel dọc → ngang + chặn click khi vừa kéo
 */
function useDragScroll() {
    const ref = useRef<HTMLDivElement | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const pos = useRef({ down: false, startX: 0, startLeft: 0, moved: false })
    const justDragged = useRef(0)

    const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const el = ref.current
        if (!el) return
        pos.current.down = true
        pos.current.moved = false
        pos.current.startX = e.pageX
        pos.current.startLeft = el.scrollLeft
        setIsDragging(true)
    }

    const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const el = ref.current
        if (!el || !pos.current.down) return
        e.preventDefault()
        const dx = e.pageX - pos.current.startX
        if (!pos.current.moved && Math.abs(dx) > 3) pos.current.moved = true
        el.scrollLeft = pos.current.startLeft - dx
    }

    const end = () => {
        if (!pos.current.down) return
        pos.current.down = false
        if (pos.current.moved) justDragged.current = performance.now()
        setIsDragging(false)
    }

    const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        const el = ref.current
        if (!el) return
        if (el.scrollWidth > el.clientWidth + 2) {
            el.scrollLeft += e.deltaY
            e.preventDefault()
        }
    }

    // chặn native drag ảnh/link
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const stop = (ev: Event) => ev.preventDefault()
        el.addEventListener('dragstart', stop, { passive: false })
        return () => el.removeEventListener('dragstart', stop)
    }, [])

    // huỷ click ngay sau khi kéo (capture)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const onClickCapture = (ev: MouseEvent) => {
            if (performance.now() - justDragged.current < 180) {
                ev.preventDefault(); ev.stopPropagation()
            }
        }
        el.addEventListener('click', onClickCapture, true)
        return () => el.removeEventListener('click', onClickCapture, true)
    }, [])

    return {
        ref,
        isDragging,
        handlers: { onMouseDown, onMouseMove, onMouseLeave: end, onMouseUp: end, onWheel },
    }
}

// --- Demo fallback (có thể xoá) ---
const DEFAULT_ITEMS: ProjectItem[] = [
    {
        image: '/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-1.jpeg',
        title: 'Cung cấp đèn LED cho Biệt thự song lập Camelia Eco Garden Huế',
    },
    {
        image: '/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-2.jpeg',
        title: 'Cung cấp đèn LED cho Khách sạn 5 sao Wyndham Legend Hạ Long',
    },
    {
        image: '/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-3.jpeg',
        title: 'Cung cấp đèn LED chiếu sáng cho hệ thống Showroom xe Mazda',
    },
    {
        image: '/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-4.jpeg',
        title: 'Cung cấp đèn LED cho chung cư Imperia Sky Garden - 423 Minh Khai',
    },
]