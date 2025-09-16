import type { Metadata } from "next"
import TopStrip from "../../components/main/top/TopStrip"
import HeaderWithCategories from "../../components/main/top/HeaderWithCategories"
import CategoryToolbar from "../../components/category/CategoryToolbar"
import ProductRowFive, { type Product as RowProduct } from "../../components/category/ProductGrid"
import { PaginationSquare } from "../../components/ui/SmartPagination"
import Footer from "../../components/main/footer/footer"
import ContactFab from "../../components/main/floating/ContactFab"
import MobileDock from "../../components/main/floating/MobileDock"
import MobileHeader from "../../components/main/top/MobileHeader"
import SearchBar from "../../components/main/search/SearchBar"
import { PRODUCTSLEDAMTRAN } from "../../lib/data"

export const metadata: Metadata = {
  title: "Tìm Kiếm Sản Phẩm - ĐÈN SÀI GÒN | Đèn LED Chính Hãng",
  description: "Tìm kiếm sản phẩm đèn LED, đèn trang trí, quạt trần tại ĐÈN SÀI GÒN. Hàng chính hãng, bảo hành 2 năm.",
  keywords: "tìm kiếm đèn LED, tìm đèn trang trí, search đèn chiếu sáng",
}

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams.q as string) || ""
  const SEARCH_PRODUCTS = (PRODUCTSLEDAMTRAN as RowProduct[]).slice(0, 20)

  return (
    <main className="min-h-screen overflow-hidden">
      <TopStrip />
      <MobileHeader cartCount={0} />
      <HeaderWithCategories />

      <div className="container-x py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar placeholder="Tìm kiếm sản phẩm..." />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            {query ? `Kết quả tìm kiếm cho "${query}"` : "Tìm kiếm sản phẩm"}
          </h1>
          <p className="text-slate-600">
            {query ? `Tìm thấy ${SEARCH_PRODUCTS.length} sản phẩm` : "Nhập từ khóa để tìm kiếm sản phẩm"}
          </p>
        </div>

        {query && (
          <>
            <CategoryToolbar />
            <ProductRowFive products={SEARCH_PRODUCTS} />
            <PaginationSquare />
          </>
        )}

        {!query && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Tìm kiếm sản phẩm</h3>
              <p className="text-slate-600 mb-6">Nhập từ khóa vào ô tìm kiếm để tìm sản phẩm bạn cần</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Đèn LED âm trần", "Đèn chùm", "Quạt trần", "Đèn thả"].map((keyword) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ContactFab />
      <MobileDock />
    </main>
  )
}
