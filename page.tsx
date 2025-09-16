import HeroSection from "./components/main/hero/HeroSection";
import TopStrip from "./components/main/top/TopStrip";
import HeaderWithCategories from "./components/main/top/HeaderWithCategories";
import CategorySection from "./components/main/category/CategorySection";
import ProductCarousel from "./components/main/product/ProductCarousel";
import FlashSaleDenChum, { DEMO_PRODUCTS } from "./components/main/flashsale/FlashSale";
import { PRODUCTSLEDAMTRAN } from "./lib/data";
import ProjectsSection from "./components/main/projects/ProjectSection";
import AboutHighlightV2 from "./components/main/about/About";
import Footer from "./components/main/footer/footer";



export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden">
      <TopStrip />
      <HeaderWithCategories />
      <HeroSection />
      <CategorySection />
      <FlashSaleDenChum
        title="FLASH SALE ĐÈN CHÙM"
        windowLabel="9h - 11h 09/09"
        nextWindowLabel="9h - 11h 10/09"
        startInSeconds={3600 + 42} // ví dụ 1h42s
        products={DEMO_PRODUCTS /* hoặc dữ liệu thật */}
      />
      <ProductCarousel
        title="ĐÈN LED CHIẾU SÁNG"
        products={PRODUCTSLEDAMTRAN}
        tabs={[
          'Đèn LED âm trần downlight',
          'Đèn LED ốp trần',
          'Đèn LED panel',
          'Đèn LED tuýp',
        ]}

      />
      <ProductCarousel
        title="ĐÈN TRANG TRÍ"
        products={PRODUCTSLEDAMTRAN}
        tabs={[
          'Đèn chùm',
          'Đèn chùm pha lê',
          'Đèn thả',
          'Đèn chùm hiện đại',
        ]}

      />

      <ProjectsSection
        title="CÔNG TRÌNH"
        items={[
          { image: "/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-1.jpg", title: "Cung cấp đèn LED cho biệt thự song lập Camelia Eco Garden Huế" },
          { image: "/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-2.jpg", title: "Cung cấp đèn LED cho khách sạn Wyndham Hạ Long", href: "#" },
          { image: "/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-3.jpg", title: "Cung cấp đèn LED hệ thống chiếu sáng showroom xe Mazda" },
          { image: "/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-4.jpg", title: "Cung cấp đèn LED cho chung cư Imperia Sky Garden - 423 Minh Khai" },
        ]}
      />
      <AboutHighlightV2
        title="Giới thiệu về ĐÈN SÀI GÒN"
        imageSrc="/den-sai-gon/anh-cong-trinh/cua-hang.png" // hoặc bỏ trống để dùng fallback graphic
      />
      <Footer />
    </main>
  );
}
