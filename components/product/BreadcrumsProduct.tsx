// app/(routes)/category/[slug]/CategoryHeader.tsx (ví dụ)
import CategoryBreadcrumbs, { Crumb } from "../../components/category/CategoryBreadcrumbs";


export default function BreadcrumsProduct() {
    const crumbs: Crumb[] = [
        { label: "Trang chủ", href: "#" },
        { label: "Đèn LED âm trần", href: "#" },
        { label: "Đèn trần", href: "#" },
    ];
    return (
        <section className="container-x px-4">
            <CategoryBreadcrumbs items={crumbs} />

        
        </section>
    );
}
