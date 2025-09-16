import Image from "next/image";
import Link from "next/link";

type Banner = {
    src: string;
    href?: string;
    alt?: string;
};

export default function CategoryHero({
    main,
    rightTop,
    rightBottom,
}: {
    main: Banner;
    rightTop: Banner;
    rightBottom: Banner;
}) {
    return (
        <section className="relative">
            {/* nền nhẹ cho khối banner */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-emerald-200/20 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-teal-200/20 blur-3xl" />
            </div>

            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                {/* Banner lớn bên trái */}
                <CardLink banner={main} className="h-[240px]" priority />

                {/* 2 banner bên phải */}
                <div className="grid gap-4">
                    <CardLink banner={rightTop} className="aspect-[21/5]" />
                    <CardLink banner={rightBottom} className="aspect-[21/5]" />
                </div>
            </div>
        </section>
    );
}

function CardLink({
    banner,
    className,
    priority = false,
}: {
    banner: { src: string; href?: string; alt?: string };
    className?: string;
    priority?: boolean;
}) {
    const Img = (
        <div
            className={[
                "relative w-full overflow-hidden rounded-xl ring-1 ring-slate-200/70 bg-white",
                "shadow-[0_10px_30px_rgba(2,80,60,0.08)]",
                className,
            ].join(" ")}
        >
            <Image
                src={banner.src}
                alt={banner.alt || "banner"}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover"
                priority={priority}
            />
            {/* viền gradient mảnh & hover tinh tế */}
            <div className="pointer-events-none absolute inset-0 rounded-[12px] ring-1 ring-transparent hover:ring-emerald-500/30 transition-shadow" />
        </div>
    );

    return banner.href ? (
        <Link href={banner.href} className="block">{Img}</Link>
    ) : (
        Img
    );
}
