'use client'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import type { Media } from './types'

/**
 * ProductGallery — mobile thumbnails BELOW main image
 * - Mobile: stack (main viewer first, thumbs as a horizontal row underneath)
 * - ≥sm: original two-column layout (thumbs left, main right)
 */
export default function ProductGallery({
    media,
    autoPlayFirstVideo = true,
}: {
    media: Media[]
    /** Autoplay when the first item is a video */
    autoPlayFirstVideo?: boolean
}) {
    // Prefer a video as the initial slide if available
    const firstVideoIdx = useMemo(() => media.findIndex((m) => m.type === 'video'), [media])
    const [active, setActive] = useState(Math.max(0, firstVideoIdx))

    const main = media[active]
    const isVideo = main.type === 'video'

    // Build YouTube embed url if a youtubeId is provided
    const youtubeSrc = (m: Media) =>
        (m as any).youtubeId
            ? `https://www.youtube.com/embed/${(m as any).youtubeId}?rel=0&modestbranding=1&autoplay=${autoPlayFirstVideo && isVideo && media[active] === m ? 1 : 0
            }&mute=1`
            : undefined

    const mainEmbed = youtubeSrc(main) || (main as any).videoUrl

    // Helper: pick a thumbnail for video (YouTube or custom poster)
    const videoThumb = (m: Media) =>
        m.thumb ||
        (m as any).poster ||
        ((m as any).youtubeId ? `https://img.youtube.com/vi/${(m as any).youtubeId}/hqdefault.jpg` : undefined)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[86px,1fr] gap-3 sm:gap-4">
            {/* Main viewer (first on mobile) */}
            <div className="order-1 sm:order-2 relative min-h-[300px] sm:min-h-[600px] rounded-lg border border-slate-200 bg-white overflow-hidden">
                {isVideo ? (
                    mainEmbed ? (
                        <iframe
                            className="absolute inset-0 h-full w-full"
                            src={mainEmbed}
                            title={main.label || 'product video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    ) : (
                        <div className="absolute inset-0 grid place-items-center text-slate-700">
                            <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm">Không tìm thấy nguồn video</div>
                        </div>
                    )
                ) : main.type === 'image' ? (
                    <Image src={main.src} alt={main.label || 'image'} fill sizes="760px" className="object-contain" />
                ) : (
                    <div className="absolute inset-0 grid place-items-center text-slate-700">
                        <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm">
                            {main.type === 'spec' ? 'Bảng thông số kỹ thuật' : 'Mô hình 3D'}
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnails (second on mobile, left column on ≥sm) */}
            <div className="order-2 sm:order-1 -mx-1 sm:mx-0 px-1 flex flex-row sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x">
                {media.map((m, i) => {
                    const activeCls =
                        active === i ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-slate-300'
                    return (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            aria-pressed={active === i}
                            className={`relative aspect-square h-[64px] w-[64px] sm:w-[86px] sm:h-[86px] rounded-md border bg-white ${activeCls}`}
                            title={m.label || (m.type === 'video' ? 'Video' : 'Hình ảnh')}
                        >
                            {m.type === 'image' ? (
                                <Image src={m.thumb || m.src} alt={m.label || 'thumb'} fill sizes="86px" className="object-contain" />
                            ) : (
                                <>
                                    {/* Use plain <img> for YouTube thumbs unless your Next config allows that domain */}
                                    {videoThumb(m) ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={videoThumb(m)!} alt={m.label || 'video'} className="absolute inset-0 h-full w-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 grid place-items-center text-slate-600 text-[12px]">Video</div>
                                    )}
                                    {/* Play icon overlay */}
                                    <div className="pointer-events-none absolute inset-0 grid place-items-center">
                                        <svg width="28" height="28" viewBox="0 0 48 48" className="drop-shadow">
                                            <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,.45)" />
                                            <path d="M20 16l14 8-14 8z" fill="#fff" />
                                        </svg>
                                    </div>
                                </>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
