// app/(routes)/category/[slug]/CategoryHeader.tsx (ví dụ)
import CategoryBreadcrumbs, { Crumb } from "../../components/category/CategoryBreadcrumbs";
import CategoryTitle from "../../components/category/CategoryTitle";
import CategoryHero from "../../components/category/CategoryHero";

export default function CategoryHeader() {
    const crumbs: Crumb[] = [
        { label: "Trang chủ", href: "/" },
        { label: "Đèn LED âm trần" }, // trang hiện tại
    ];

    return (
        <section className="container-x px-4">
            <CategoryBreadcrumbs items={crumbs} />

            <CategoryTitle
                title="ĐÈN LED ÂM TRẦN DOWNLIGHT"
                subtitle="Ưu đãi, đa lựa chọn công suất và kích thước. Ánh sáng trung thực, tiết kiệm điện, lắp đặt nhanh."
            />

            <CategoryHero
                main={{
                    src: "/den-sai-gon/banners/banner_den_am_tran.png",
                    href: "/khuyen-mai/downlight",
                    alt: "Khuyến mãi downlight",
                }}
                rightTop={{
                    src: "/den-sai-gon/banners/led_spotlight.png",
                    href: "/den-spotlight",
                    alt: "Spotlight X7 Series",
                }}
                rightBottom={{
                    src: "/den-sai-gon/banners/bao_hanh_tai_nha.png",
                    href: "/bao-hanh-tai-nha",
                    alt: "Bảo hành tại nhà",
                }}
            />
        </section>
    );
}
