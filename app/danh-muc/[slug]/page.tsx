import type { Metadata } from "next"
import TopStrip from "../../../components/main/top/TopStrip"
import HeaderWithCategories from "../../../components/main/top/HeaderWithCategories"
import CategoryHeader from "../../../components/category/CategoryHeader"
import ProductCarouselAligned from "../../../components/main/product/ProductCarousel"
import { PRODUCTSLEDAMTRAN } from "../../../lib/data"
import CategoryToolbar from "../../../components/category/CategoryToolbar"
import Footer from "../../../components/main/footer/footer"
import ProductRowFive, { type Product as RowProduct } from "../../../components/category/ProductGrid"
import { PaginationSquare } from "../../../components/ui/SmartPagination"
import { CategoryFaqSectionDemo } from "../../../components/category/CategoryFaqSectionDemo"
import ContactFab from "../../../components/main/floating/ContactFab"
import MobileDock from "../../../components/main/floating/MobileDock"
import MobileHeader from "../../../components/main/top/MobileHeader"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryNames: { [key: string]: string } = {
    "den-led-am-tran": "Đèn LED Âm Trần",
    "den-chum": "Đèn Chùm",
    "den-tha": "Đèn Thả",
    "den-led-op-tran": "Đèn LED Ốp Trần",
    "quat-tran": "Quạt Trần",
    "den-led-panel": "Đèn LED Panel",
    "den-tuong": "Đèn Tường",
    "den-roi-ray": "Đèn Rọi Ray",
    "den-ngoai-troi": "Đèn Ngoài Trời",
  }

  const categoryName = categoryNames[params.slug] || "Danh Mục Sản Phẩm"

  return {
    title: `${categoryName} - ĐÈN SÀI GÒN | Chính Hãng, Giá Tốt`,
    description: `Mua ${categoryName.toLowerCase()} chính hãng tại ĐÈN SÀI GÒN. Bảo hành 2 năm, giao hàng toàn quốc, giá tốt nhất thị trường.`,
    keywords: `${categoryName.toLowerCase()}, đèn LED, đèn trang trí, đèn chiếu sáng`,
    openGraph: {
      title: `${categoryName} - ĐÈN SÀI GÒN`,
      description: `Mua ${categoryName.toLowerCase()} chính hãng tại ĐÈN SÀI GÒN`,
    },
  }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const ROW5_PRODUCTS = (PRODUCTSLEDAMTRAN as RowProduct[]).slice(0, 20)

  return (
    <main className="min-h-screen overflow-hidden">
      <TopStrip />
      <MobileHeader cartCount={0} />
      <HeaderWithCategories />

      <CategoryHeader slug={params.slug} />

      <ProductCarouselAligned title="SẢN PHẨM BÁN CHẠY" products={PRODUCTSLEDAMTRAN} tabs={[]} />

      <CategoryToolbar />
      <ProductRowFive products={ROW5_PRODUCTS} />
      <PaginationSquare />
      <CategoryFaqSectionDemo />
      <Footer />

      <ContactFab />
      <MobileDock />
    </main>
  )
}

export async function generateStaticParams() {
  return [
    { slug: "den-led-am-tran" },
    { slug: "den-chum" },
    { slug: "den-tha" },
    { slug: "den-led-op-tran" },
    { slug: "quat-tran" },
    { slug: "den-led-panel" },
    { slug: "den-tuong" },
    { slug: "den-roi-ray" },
    { slug: "den-ngoai-troi" },
  ]
}
