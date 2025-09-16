// components/category/CategoryGrid.tsx
'use client'
import Image from 'next/image'

export type CatItem = {
    title: string
    image: string
    href?: string
}

export default function CategoryGrid({ items }: { items: CatItem[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-2">
            {items.map((it, i) => (
                <a
                    key={i}
                    href={it.href ?? '#'}
                    className="block rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-shadow"
                >
                    <div className="flex flex-col items-center p-3">
                        <div className="relative w-[150px] h-[110px] md:w-[150px] md:h-[120px]">
                            <Image
                                src={it.image}
                                alt={it.title}
                                fill
                                className="object-contain"
                                sizes="(min-width: 1280px) 12vw, (min-width: 1024px) 16vw, (min-width: 768px) 22vw, 40vw"
                                priority={i < 4}
                            />
                        </div>
                        <div className="mt-2 text-[15px] font-medium text-slate-800 text-center">{it.title}</div>
                    </div>
                </a>
            ))}
        </div>
    )
}

// ==============================
// Ví dụ dùng trong page/section
// ==============================
// import CategoryGrid, { CatItem } from '@/components/category/CategoryGrid'
//
// const ITEMS: CatItem[] = [
//   { title: 'Đèn LED âm trần', image: '/cats/downlight.png' },
//   { title: 'Đèn chùm', image: '/cats/chandelier.png' },
//   { title: 'Đèn thả', image: '/cats/pendant.png' },
//   { title: 'Đèn LED ốp trần', image: '/cats/surface.png' },
//   { title: 'Quạt trần', image: '/cats/fan.png' },
//   { title: 'Đèn LED panel', image: '/cats/panel.png' },
//   { title: 'Đèn LED dây', image: '/cats/strip.png' },
//   { title: 'Đèn tuýp LED', image: '/cats/tube.png' },
//   { title: 'Bóng đèn LED', image: '/cats/bulb.png' },
//   { title: 'Đèn LED rọi ray', image: '/cats/track.png' },
//   { title: 'Đèn tường', image: '/cats/wall.png' },
//   { title: 'Đèn bàn', image: '/cats/table.png' },
//   { title: 'Đèn cây', image: '/cats/floor.png' },
//   { title: 'Đèn LED pha', image: '/cats/flood.png' },
//   { title: 'Đèn sân vườn', image: '/cats/garden.png' },
//   { title: 'Đèn rọi ngoài trời', image: '/cats/spot-out.png' },
//   { title: 'Đèn thả văn phòng', image: '/cats/pendant-office.png' },
//   { title: 'Thiết bị điện', image: '/cats/electric.png' },
// ]
//
// export default function CategorySection(){
//   return (
//     <section className="py-6">
//       <div className="container-x">
//         <CategoryGrid items={ITEMS} />
//       </div>
//     </section>
//   )
// }

/* Gợi ý:
- Đặt ảnh vào public/cats/ theo tên ở trên
- Tăng/giảm kích thước item: chỉnh w/h của khung ảnh và font-size
- Bo góc & viền giống ảnh: rounded-xl + border-slate-200
*/
