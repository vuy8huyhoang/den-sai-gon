// -----------------------------------------------------------------------------
// components/pdp/ProductGallery.tsx — supports YouTube and picks video first
'use client'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import type { Media } from './types'

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
        m.thumb || (m as any).poster || ((m as any).youtubeId ? `https://img.youtube.com/vi/${(m as any).youtubeId}/hqdefault.jpg` : undefined)

    return (
        <div className="grid grid-cols-[76px,1fr] gap-4 sm:grid-cols-[86px,1fr]">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
                {media.map((m, i) => {
                    const activeCls = active === i ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-slate-200 hover:border-slate-300'
                    return (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            aria-pressed={active === i}
                            className={`relative aspect-square w-[76px] sm:w-[86px] rounded-md border bg-white ${activeCls}`}
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

            {/* Main viewer */}
            <div className="relative min-h-[360px] sm:min-h-[520px] rounded-lg border border-slate-200 bg-white overflow-hidden">
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
        </div>
    )
}

/* -----------------------------------------------------------------------------
USAGE EXAMPLE

<ProductGallery
  media={[
    { type: 'video', youtubeId: 'dQw4w9WgXcQ', src: '', label: 'Video giới thiệu' },
    { type: 'image', src: '/images/products/downlight-main.png', thumb: '/images/products/downlight-main.png', label: 'Ảnh 1' },
    { type: 'image', src: '/images/products/downlight-2.png', label: 'Ảnh 2' },
  ]}
/>

- Mặc định sẽ chọn video (nếu có) làm slide đầu và autoplays (mute) theo `autoPlayFirstVideo`.
- Nếu không dùng YouTube, truyền `{ type:'video', videoUrl:'https://your.cdn/embed.mp4', poster:'/poster.jpg' }` + `thumb`.
---------------------------------------------------------------------------- */
