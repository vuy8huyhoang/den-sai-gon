'use client'
import Image from 'next/image'
import { FeatureIcon } from './types'
export default function FeatureBadges({ icons = [] as FeatureIcon[] }) {
    const list = icons.length ? icons : [
        { src: '/den-sai-gon/icons/icon_Artboard 18.png', label: 'CRI>97' },
        { src: '/den-sai-gon/icons/icon-12.png', label: 'Bảo hành 3 năm' },
        { src: '/den-sai-gon/icons/icon-13.png', label: 'Chính hãng' },
        { src: '/den-sai-gon/icons/icon-17.png', label: 'Chống chói' },
    ]
    return (
        <div className="mt-4 flex flex-wrap items-center gap-4">
            {list.map((i) => (
                <div key={i.label} className="flex items-center gap-4 text-[12px] text-slate-700">
                    <Image src={i.src} alt={i.label} width={48} height={48} className="object-contain" />
                    
                </div>
            ))}
        </div>
    )
}
