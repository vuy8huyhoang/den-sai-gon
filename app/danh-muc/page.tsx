import type { Metadata } from "next"
import TopStrip from "../../components/main/top/TopStrip"
import HeaderWithCategories from "../../components/main/top/HeaderWithCategories"
import CategorySection from "../../components/main/category/CategorySection"
import Footer from "../../components/main/footer/footer"
import ContactFab from "../../components/main/floating/ContactFab"
import MobileDock from "../../components/main/floating/MobileDock"

export const metadata: Metadata = {
  title: "Danh Mục Sản Phẩm - ĐÈN SÀI GÒN | Đèn LED Chính Hãng",
  description:
    "Khám phá đầy đủ danh mục sản phẩm đèn LED tại ĐÈN SÀI GÒN: đèn âm trần, đèn chùm, đèn trang trí, quạt trần và nhiều hơn nữa.",
  keywords: "danh mục đèn LED, đèn âm trần, đèn chùm, đèn trang trí, quạt trần",
}

export default function CategoriesPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <TopStrip />
      <HeaderWithCategories />

      <div className="container-x py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Danh Mục Sản Phẩm</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập đèn LED và thiết bị chiếu sáng chất lượng cao của chúng tôi
          </p>
        </div>

        <CategorySection />
      </div>

      <Footer />
      <ContactFab />
      <MobileDock />
    </main>
  )
}
