import type { Metadata } from "next"
import Footer from "../../../components/main/footer/footer"
import HeaderWithCategories from "../../../components/main/top/HeaderWithCategories"
import TopStrip from "../../../components/main/top/TopStrip"
import BreadcrumsProduct from "../../../components/product/BreadcrumsProduct"
import InterestIdeasGrid from "../../../components/product/InterestIdeasGrid"
import ProductDetailShell from "../../../components/product/ProductDetailShell"
import RecentlyViewedSlider from "../../../components/product/RecentlyView"
import SimilarProductsSlider from "../../../components/product/SimilarProduct"
import ContactFab from "../../../components/main/floating/ContactFab"
import MobileDock from "../../../components/main/floating/MobileDock"
import MobileHeader from "../../../components/main/top/MobileHeader"
import type { PDPProps } from "../../../components/product/types"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // In a real app, you would fetch product data based on the slug
  const productTitle = "Đèn LED Âm Trần PROLUX-T Ánh Sáng Đổi Màu — MAXBEN"

  return {
    title: `${productTitle} - ĐÈN SÀI GÒN | Chính Hãng, Bảo Hành 2 Năm`,
    description: `Mua ${productTitle} chính hãng tại ĐÈN SÀI GÒN. Bảo hành 2 năm, giao hàng toàn quốc, giá tốt nhất thị trường.`,
    keywords: "đèn LED âm trần, PROLUX-T, MAXBEN, đèn âm trần đổi màu, đèn LED chính hãng",
    openGraph: {
      title: `${productTitle} - ĐÈN SÀI GÒN`,
      description: `Mua ${productTitle} chính hãng tại ĐÈN SÀI GÒN`,
      images: ["/den-sai-gon/anh-chi-tiet-san-pham/den-led-1.png"],
    },
  }
}

const similar = [
  {
    id: "m2",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói M2 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
  {
    id: "m3",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói M3 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
  {
    id: "m4",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói M4 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
  {
    id: "m5",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói M5 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
  {
    id: "m6",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói M6 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
]

const viewed = [
  {
    id: "v1",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói V1 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
  {
    id: "v2",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói V2 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
  {
    id: "v3",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói V3 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
  {
    id: "v4",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói V4 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
  {
    id: "v5",
    href: "#",
    title: "Đèn LED âm trần Spotlight Chống Chói V5 - BrightLux",
    image: "/den-sai-gon/anh-sp/led-am-tran.png",
    priceMin: 186000,
    priceMax: 326000,
    featureMode: "downlight" as const,
    variants: [{ thumb: "/den-sai-gon/anh-sp/led-am-tran-2.png", label: "7W" }],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "7W" }, { label: "9W" }, { label: "12W" }],
        scroll: true,
      },
    ],
  },
]

export default function ProductPage({ params }: ProductPageProps) {
  const demo: PDPProps = {
    title: "ĐÈN LED ÂM TRẦN PROLUX‑T ÁNH SÁNG ĐỔI MÀU — MAXBEN",
    brand: { name: "ĐÈN SÀI GÒN" },
    stockText: "Còn hàng",
    price: { current: 352000, original: 469000, vatIncluded: true },
    media: [
      {
        type: "image",
        src: "/den-sai-gon/anh-chi-tiet-san-pham/den-led-1.png",
        thumb: "/den-sai-gon/anh-chi-tiet-san-pham/den-led-1.png",
      },
      {
        type: "image",
        src: "/den-sai-gon/anh-chi-tiet-san-pham/den-led-4.png",
        thumb: "/den-sai-gon/anh-chi-tiet-san-pham/den-led-4.png",
      },
      {
        type: "image",
        src: "/den-sai-gon/anh-chi-tiet-san-pham/den-led-3.png",
        thumb: "/den-sai-gon/anh-chi-tiet-san-pham/den-led-3.png",
      },
      {
        type: "video",
        youtubeId: "GJ4ynPb3f3k?si=Z6GjjzVBdg5oqv1Z",
        src: "",
        label: "Video giới thiệu",
        poster: "/den-sai-gon/anh-chi-tiet-san-pham/den-led-1.png",
      },
      { type: "spec", src: "#" },
    ],
    promo: (
      <div>
        <div className="flex gap-2">
          <span className="text-red-600">•</span> Giảm giá 2%: cho đơn hàng có giá trị từ <b>1 - 2 triệu</b>{" "}
          <span className="text-slate-500">(xem chi tiết)</span>
        </div>
        <div className="flex gap-2">
          <span className="text-red-600">•</span> Giảm giá 5%: cho đơn hàng có giá trị <b>≥ 2 triệu</b>{" "}
          <span className="text-slate-500">(xem chi tiết)</span>
        </div>
        <div className="text-[12px] italic text-slate-600 mt-1">
          (*) Không áp dụng đồng thời với các chương trình khác.
        </div>
      </div>
    ),
    quickSpecs: [
      { label: "Công suất", value: "10W" },
      { label: "Quang thông(Lm)", value: "850" },
      { label: "Kích thước (mm)", value: "D122*H44" },
      { label: "Khoét lỗ (mm)", value: "Ø90-110" },
      { label: "Xuất xứ", value: "Lắp ráp tại Việt Nam" },
    ],
    attributes: [
      {
        key: "power",
        label: "Công suất",
        values: [{ label: "9W" }, { label: "10W" }, { label: "12W" }],
        defaultIndex: 1,
      },
      {
        key: "casing",
        label: "Màu chóa",
        values: [{ label: "Trắng" }, { label: "Đen" }, { label: "Vàng" }],
      },
      {
        key: "cct",
        label: "Ánh sáng",
        values: [
          { label: "Ánh sáng trắng" },
          { label: "Ánh sáng vàng" },
          { label: "Ánh sáng trung tính" },
          { label: "Ánh sáng 3 màu" },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <TopStrip />
      <MobileHeader cartCount={0} />
      <HeaderWithCategories />
      <BreadcrumsProduct />
      <ProductDetailShell data={demo} />
      <SimilarProductsSlider title="SẢN PHẨM TƯƠNG TỰ" products={similar} />
      <RecentlyViewedSlider products={viewed} />
      <InterestIdeasGrid
        items={[
          { label: "ĐÈN LED ÂM TRẦN MAXBEN", href: "/den-am-tran-maxben" },
          { label: "Đèn led âm trần 9W, 10W", href: "/den-am-tran?power=9-10" },
          { label: "Đèn trần", href: "/den-tran" },
          { label: "Đèn LED MAXBEN", href: "/maxben" },
          { label: "Đèn LED âm trần 3 màu", href: "/den-am-tran-3-mau" },
          { label: "Đèn LED âm trần", href: "/den-am-tran" },
        ]}
        variant="card"
      />
      <Footer />
      <ContactFab />
      <MobileDock />
    </main>
  )
}

export async function generateStaticParams() {
  // In a real app, you would fetch all product slugs from your database
  return [
    { slug: "den-led-am-tran-prolux-t-maxben" },
    { slug: "den-chum-pha-le-cao-cap" },
    { slug: "den-tha-hien-dai" },
    { slug: "quat-tran-5-canh" },
    { slug: "den-led-panel-600x600" },
  ]
}
