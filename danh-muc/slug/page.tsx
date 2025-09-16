// app/(du-an)/den-sai-gon/danh-muc/[slug]/page.tsx

import TopStrip from "../../components/main/top/TopStrip";
import HeaderWithCategories from "../../components/main/top/HeaderWithCategories";
import CategoryHeader from "../../components/category/CategoryHeader";
import ProductCarouselAligned from "../../components/main/product/ProductCarousel";
import { PRODUCTSLEDAMTRAN } from "../../lib/data";
import CategoryToolbar from "../../components/category/CategoryToolbar";
import Footer from "../../components/main/footer/footer";
import ProductRowFive, { type Product as RowProduct } from "../../components/category/ProductGrid"
import { PaginationSquare } from "../../components/ui/SmartPagination";
import { CategoryFaqSectionDemo } from "../../components/category/CategoryFaqSectionDemo";


// Khai báo type thủ công cho params (đúng chuẩn App Router)

export default function CategoryPage() {
    const ROW5_PRODUCTS = (PRODUCTSLEDAMTRAN as RowProduct[]).slice(0, 20);
    
    return (
        <main className="min-h-screen overflow-hidden">
            <TopStrip />
            <HeaderWithCategories />

            {/* Nếu muốn truyền slug xuống breadcrumb/title */}
            <CategoryHeader /* slug={slug} */ />

            <ProductCarouselAligned
                title="SẢN PHẨM BÁN CHẠY"
                products={PRODUCTSLEDAMTRAN}
                tabs={[]}
            />

            <CategoryToolbar />
            <ProductRowFive
                products={ROW5_PRODUCTS}
            />
            <PaginationSquare />
            <CategoryFaqSectionDemo/>
            <Footer />
        </main>
    );
}
