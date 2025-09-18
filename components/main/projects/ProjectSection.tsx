"use client";
import Image from "next/image";
import Link from "next/link";

export type ProjectItem = {
    image: string;
    title: string;
    href?: string;
};

export default function ProjectsSection({
    title = "CÔNG TRÌNH",
    items = [],
    className = "",
    /** số cột ở breakpoint lớn (>=1024px) */
    lgCols = 4,
    /** tỉ lệ ảnh card (ví dụ: "16/10", "4/3") */
    ratio = "16/10",
}: {
    title?: string;
    items: ProjectItem[];
    className?: string;
    lgCols?: 3 | 4 | 5;
    ratio?: `${number}/${number}`;
}) {
    const data = items.length ? items : DEFAULT_ITEMS;

    // chuyển số cột thành lớp Tailwind
    const lgColsClass = `lg:grid-cols-${lgCols}` as const;

    return (
        <section className={`my-8 ${className}`}>
            <div className="container-x ">
                {/* Vỏ khung xanh đồng bộ với ProductCarousel */}
                <div className="rounded-[14px] bg-[#079553] p-2">
                    {/* Header xanh */}
                    <div className="bg-[#079553] h-12 flex items-center px-6 rounded-t-[14px]">
                        <h2 className="text-white font-bold text-[20px] tracking-wide">{title}</h2>
                    </div>

                    {/* Thân: grid canh đều như ProductCarousel, khoảng cách gọn gàng */}
                    <div className="px-6 py-3">
                        <div className={`grid grid-cols-1 sm:grid-cols-2 ${lgColsClass} gap-4 md:gap-5`}>
                            {data.map((it, i) => (
                                <Card key={i} item={it} ratio={ratio} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Card({ item, ratio = "16/10" }: { item: ProjectItem; ratio?: `${number}/${number}` }) {
    const Wrapper: any = item.href ? Link : "div";
    const wrapperProps = item.href ? { href: item.href } : {};

    return (
        <Wrapper
            {...wrapperProps}
            className="group block h-full rounded-xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition-shadow"
        >
            <div className={`relative aspect-[${ratio}]`}>
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                    priority={false}
                />
            </div>
            <div className="p-4">
                <h3 className="text-[15px] leading-5 text-slate-800 line-clamp-2">{item.title}</h3>
            </div>
        </Wrapper>
    );
}

// --- Demo fallback (có thể xoá) ---
const DEFAULT_ITEMS: ProjectItem[] = [
    {
        image: "/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-1.jpeg",
        title: "Cung cấp đèn LED cho Biệt thự song lập Camelia Eco Garden Huế",
    },
    {
        image: "/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-2.jpeg",
        title: "Cung cấp đèn LED cho Khách sạn 5 sao Wyndham Legend Hạ Long",
    },
    {
        image: "/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-3.jpeg",
        title: "Cung cấp đèn LED chiếu sáng cho hệ thống Showroom xe Mazda",
    },
    {
        image: "/den-sai-gon/anh-cong-trinh/hinh-cong-trinh-4.jpeg",
        title: "Cung cấp đèn LED cho chung cư Imperia Sky Garden - 423 Minh Khai",
    },
];
