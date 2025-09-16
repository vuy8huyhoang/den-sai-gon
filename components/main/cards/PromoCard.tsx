import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

export type PromoCardProps = {
    /** Bắt buộc: ảnh hiển thị cho card (đặt trong /public hoặc static import) */
    image: string | StaticImageData
    alt?: string
    /** Nếu có href, toàn bộ card sẽ click được */
    href?: string
    /** Chiều cao card (Tailwind class) */
    heightClass?: string
    /** Bo góc (Tailwind class) */
    roundedClass?: string
    /** object-fit của ảnh */
    fit?: 'cover' | 'contain'
    /** Ưu tiên tải ảnh đầu tiên nếu cần */
    priority?: boolean
}

export default function PromoCard({
    image,
    alt,
    href,
    heightClass = 'h-[190px]',
    roundedClass = 'rounded-[12px]',
    fit = 'cover',
    priority = false,
}: PromoCardProps) {
    const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'
    
    const card = (
        <div className={`card relative overflow-hidden ${roundedClass} ${heightClass}`}>
            <Image
                src={image}
                alt={alt ?? ''}
                fill
                sizes="(min-width:1024px)  25vw, 100vw"
                priority={priority}
                className={fitClass}
                
            />
        </div>
    )

    return href ? (
        <Link href={href} aria-label={alt ?? 'promo image'} className="block">
            {card}
        </Link>
    ) : (
        card
    )
}

/* =====================
CÁCH DÙNG
===================== */
// 1) Ảnh local trong /public/promos
// <PromoCard image="/promos/install.jpg" />
// <PromoCard image="/promos/warranty.png" heightClass="h-[220px]" />
//
// 2) Click cả card
// <PromoCard image="/promos/sale.jpg" href="/khuyen-mai" />
//
// 3) Static import tối ưu ảnh
// import img1 from '@/../public/promos/install.jpg'
// <PromoCard image={img1} fit="contain" />
