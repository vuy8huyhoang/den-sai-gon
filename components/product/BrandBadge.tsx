'use client'
import Image from 'next/image'
import { BRAND, Brand } from './types'
export default function BrandBadge({ brand }: { brand: Brand }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-[11px] font-semibold text-white" style={{ background: BRAND }}>
            {brand.logo ? <Image src={brand.logo} alt={brand.name} width={18} height={18} className="object-contain" /> : <span className="font-extrabold">{brand.name.split(' ')[0]}</span>}
            <span className="uppercase tracking-wide">{brand.name.split(' ').slice(1).join(' ') || brand.name}</span>
        </div>
    )
}
