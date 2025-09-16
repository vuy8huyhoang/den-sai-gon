'use client'
import Image from 'next/image'


type ChipProps = {
    imgSrc: string
    label: string
    size?: number
    active?: boolean
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}


export default function Chip({ imgSrc, label, size = 48, active = false, onMouseEnter, onMouseLeave }: ChipProps) {
    return (
        <button
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={[
                'group flex flex-col items-center justify-between gap-1 min-w-[78px] h-[70px] pt-1',
                active ? 'text-emerald-700' : 'text-slate-700',
            ].join(' ')}
            aria-current={active ? 'true' : 'false'}
        >
            <span
                className={[
                    'w-11 h-11 rounded-full border flex items-center justify-center transition-all',
                    active
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                        : 'bg-white border-slate-200 group-hover:border-emerald-400',
                ].join(' ')}
                style={{ width: size, height: size }}
            >
                <Image src={imgSrc} alt={label} width={size - 16} height={size - 16} className="object-contain" />
            </span>
            <span className="text-[13px] leading-none font-bold whitespace-nowrap">{label}</span>
        </button>
    )
}
