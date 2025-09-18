// -----------------------------------------------------------------------------
// components/pdp/ProductDetailShell.tsx — keep desktop UI; mobile shows Buy box after Gallery
'use client'
import { useState } from 'react'
import BrandBadge from './BrandBadge'
import StockTag from './StockTag'
import PriceBlock from './PriceBlock'
import PromoBox from './PromoBox'
import SpecsQuick from './SpecsQuick'
import AttributeBlocks from './AttributeBlocks'
import QuantityStep from './QuantityStep'
import CTAButtons from './CTAButtons'
import HotlineRow from './HotlineRow'
import InstallSupportCard from './InstallSupportCard'
import FeatureBadges from './FeatureBadges'
import ProductGallery from './ProductGallery'
import ProductSpecs, { EXAMPLE_SPECS } from './ProductSpecs'
import { FaqAccordion, FaqItem } from '../category/FaqAccordion'
import type { PDPProps } from './types'

export const faq: FaqItem[] = [
    { question: 'Làm thế nào để đặt hàng?', answer: <p>Bạn có thể đặt hàng trực tiếp trên website, hoặc liên hệ hotline. Đơn hàng sẽ được xác nhận qua SMS/Zalo.</p> },
    { question: 'Có thanh toán khi nhận hàng không?', answer: <p>Hỗ trợ COD toàn quốc. Với đơn máy công trình giá trị lớn có thể cần đặt cọc.</p> },
    { question: 'Phí giao hàng tính thế nào?', answer: <p>Trong nội thành HCM miễn phí với đơn trên 1.000.000đ. Tỉnh thành khác áp dụng theo bảng giá của đơn vị vận chuyển.</p> },
    { question: 'ĐÈN SÀI GÒN có nhận lắp đặt không?', answer: <p>Có. Vui lòng đặt lịch trước 24h để được phục vụ tốt nhất.</p> },
    {
        question: 'ĐÈN SÀI GÒN có nhận trả hàng không? Điều kiện trả hàng thế nào',
        answer: (
            <p>
                Khách hàng mua hàng tại ĐÈN SÀI GÒN được trả hàng miễn phí trong thời gian 7 ngày. Điều kiện trả hàng như sau:
                Trong thời gian được đổi trả. Hàng còn nguyên vỏ hộp.
                Vỏ hộp không bị rách nát. Hàng còn mới chưa lắp lên: không bị trầy xước, dính sơn, thạch cao….
                Hàng chưa cắt đầu dây Hàng còn nguyên tem mác, không tẩy xóa.
                Hàng còn đầy đủ linh, phụ kiện. Không thuộc các mặt hàng không được phép đổi trả.
            </p>
        ),
    },
]

export default function ProductDetailShell({ data }: { data: PDPProps }) {
    const [qty, setQty] = useState(1)

    return (
        <div className="mx-auto container-x px-3 py-6">
            {/* Badge thương hiệu + tồn kho */}
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <BrandBadge brand={data.brand} />
                    {data.stockText && <StockTag text={data.stockText} />}
                </div>
            </div>

            {/**
       * Grid 1 cột trên mobile, 10 cột trên desktop
       * Giữ NGUYÊN UI desktop: trái (col-span-6) / phải (col-span-4)
       * Mobile order:
       *   1) Gallery + FeatureBadges
       *   2) Box mua hàng (tiêu đề/giá/CTA/...)
       *   3) InstallSupportCard
       *   4) ProductSpecs + FAQ
       */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
                {/* (1) Gallery + Feature badges — LEFT (desktop) */}
                <div className="order-1 lg:order-1 lg:col-span-6">
                    <ProductGallery media={data.media} />
                    <div className="mt-3">
                        <FeatureBadges icons={data.features || []} />
                        <div className='hidden md:block'>
                            <InstallSupportCard />
                        </div>
                    </div>
                </div>

                {/* (2) Right column: thông tin mua hàng — RIGHT (desktop) */}
                <div className="order-2 lg:order-2 lg:col-span-4">
                    <h1 className="text-[22px] font-extrabold leading-7 text-slate-900">{data.title}</h1>
                    <div className="mt-1 text-[12px] text-slate-600">
                        Thương hiệu: {data.brand.name} •{' '}
                        <span className="italic text-emerald-700">
                            {data.price.vatIncluded ? 'Giá đã bao gồm VAT' : 'Giá chưa gồm VAT'}
                        </span>
                    </div>

                    <PriceBlock price={data.price} />

                    {data.promo && (
                        <div className="mt-3">
                            <PromoBox>{data.promo}</PromoBox>
                        </div>
                    )}

                    <div className="mt-4 rounded-md border border-slate-200 bg-white p-3">
                        <SpecsQuick rows={data.quickSpecs} onExpand={() => { }} />
                    </div>

                    {data.attributes?.length > 0 && (
                        <div className="mt-4">
                            <AttributeBlocks groups={data.attributes} />
                        </div>
                    )}

                    <div className="mt-4 flex items-center gap-3">
                        <QuantityStep value={qty} onChange={setQty} />
                        <span className="text-[13px] text-slate-600">› Click vào đây để tính toán số lượng đèn</span>
                    </div>

                    <CTAButtons />

                    <HotlineRow
                        calculatorHref="#tinh-phi"
                        hotlines={[{ label: 'TP.Hồ Chí Minh', phone: '0853892898' }]}
                        note={<span>Hỗ trợ 8:00–21:00 • Miễn phí tư vấn kỹ thuật</span>}
                        calcVariant="blue"
                        callVariant="gradient-sunset"
                    />
                </div>

                {/* (3) Install — nằm dưới khối trái trên desktop; sau box mua hàng trên mobile */}
                <div className="order-3 lg:order-3 lg:col-span-6 md:hidden sm:block">
                    <InstallSupportCard />
                </div>

                {/* (4) Product specs + FAQ — tiếp tục dưới khối trái */}
                <div className="order-4 lg:order-4 lg:col-span-6">
                    <div className="mt-4 lg:mt-0">
                        <ProductSpecs
                            title={EXAMPLE_SPECS.title}
                            columns={EXAMPLE_SPECS.columns}
                            rows={EXAMPLE_SPECS.rows}
                            clampRows={2}
                        />
                    </div>

                    <div className="mt-4">
                        <FaqAccordion items={faq} title="Câu hỏi thường gặp" />
                    </div>
                </div>
            </div>
        </div>
    )
}
