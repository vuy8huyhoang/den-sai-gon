// ===============================
// components/product/ProductRowFive.tsx (bỏ nền xanh, 1 hàng 5 sản phẩm)
// ===============================
'use client'
import { ItemCard, Variant } from '../category/ProductCard'

export type Product = {
    id: string | number
    title: string
    image: string
    priceMin: number
    priceMax?: number
    discount?: number
    variants?: Variant[]
}

export default function ProductRowFive({ products = [], }: { title?: string; products?: Product[] }) {
    const items = (products || []).slice(0, 20) // đảm bảo đúng 1 hàng 5 sp

    return (
        <section className="my-8 container-x mx-auto">
            <div className="">
                

                {/* Lưới 5 cột trên desktop, responsive xuống 4/3/2 */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {items.map((p) => (
                        <ItemCard
                            key={p.id}
                            title={p.title}
                            image={p.image}
                            priceMin={p.priceMin}
                            priceMax={p.priceMax}
                            discount={p.discount}
                            featureMode="downlight"
                            featureKeys={['antiglare', 'warranty3y', 'genuine', 'cri97']}
                            warrantyMode="downlightImg"
                            variants={p.variants}
                            attributes={[
                                { key: 'power', label: '', values: [{ label: '7W' }, { label: '9W' }, { label: '12W' }, { label: '15W' }, { label: '18W' }, { label: '21W' }], scroll: true },
                            ]}
                            progress={null}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

// ===============================
// DEMO (có thể đặt tạm ở page để xem)
// ===============================
