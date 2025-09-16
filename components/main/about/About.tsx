"use client";
import Image from "next/image";
import { ShieldCheck, BadgeCheck, Timer, Sparkles, Handshake, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * AboutHighlightV2 – phiên bản có hiệu ứng số đếm tăng dần (CountUp)
 *
 * Cách dùng:
 * <AboutHighlightV2 title="Giới thiệu về LED XANH" imageSrc="/den-sai-gon/brand/hero-ledxanh.jpg" />
 */
export default function AboutHighlightV2({
    title = "Giới thiệu về LED XANH",
    imageSrc,
}: {
    title?: string;
    imageSrc?: string;
}) {
    return (
        <section className="relative overflow-hidden pb-4">
            {/* background layer */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
            </div>

            <div className="container-x px-4 py-2">
                {/* heading */}
                <div className="text-center max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                        <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-400 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h2>
                    <div className="mt-3 inline-block h-[6px] w-40 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-300" />
                    <p className="mt-5 text-slate-600">
                        Đèn Sài Gòn cung cấp sản phẩm <b>chính hãng</b>, hiệu suất cao, tiết kiệm điện và ánh sáng trung thực.
                        Chúng tôi là <b>cầu nối trực tiếp</b> giữa nhà sản xuất & khách hàng, đảm bảo <b>giá tốt</b> cùng dịch vụ hậu mãi vượt trội.
                    </p>
                </div>

                {/* content grid: text left / media right */}
                <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
                    {/* left copy */}
                    <div className="space-y-5 text-[15px] leading-7 text-slate-700">
                        <p>
                            Tại <b>ĐÈN SÀI GÒN</b>, mọi sản phẩm đều có nguồn gốc xuất xứ rõ ràng, bảo hành
                            <b> tối thiểu 2 năm</b>, và được đội ngũ kỹ thuật <b>tư vấn – lắp đặt tận nơi</b>.
                        </p>
                        <p>
                            Chúng tôi cam kết đồng hành cùng khách hàng từ khâu lựa chọn mẫu mã, thiết kế ánh sáng cho tới
                            <b> bảo hành nhanh chóng</b> – đảm bảo trải nghiệm trọn vẹn, an tâm dài lâu.
                        </p>

                        {/* feature chips */}
                        <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                            <Feature icon={<ShieldCheck className="w-4 h-4" />} label="Bảo hành 2+ năm" />
                            <Feature icon={<BadgeCheck className="w-4 h-4" />} label="Hàng chính hãng" />
                            <Feature icon={<Sparkles className="w-4 h-4" />} label="Ánh sáng trung thực" />
                            <Feature icon={<Timer className="w-4 h-4" />} label="Lắp đặt nhanh" />
                            <Feature icon={<Handshake className="w-4 h-4" />} label="Giá đối tác tốt" />
                            <Feature icon={<Truck className="w-4 h-4" />} label="Giao tận nơi" />
                        </ul>
                    </div>

                    {/* right media / badge */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-emerald-700/15 bg-white/70 shadow-[0_10px_40px_rgba(2,80,60,0.08)]">
                        {imageSrc ? (
                            <Image src={imageSrc} alt={title} fill className="object-cover" />
                        ) : (
                            <FallbackGraphic />
                        )}
                    </div>
                </div>

                {/* stats stripe + CTAs */}
                <div className="mt-10 rounded-xl border border-emerald-700/15 bg-white/70 backdrop-blur px-4 py-5 md:px-6 shadow-[0_6px_24px_rgba(2,80,60,0.08)]">
                    <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_auto]">
                        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
                            <StatCounter end={17} label="Thành lập" suffix=" năm" />
                            <StatCounter end={5000} label="Công trình" plus />
                            <StatCounter end={20000} label="Khách hàng" plus />
                            <StatCounter end={100} label="Chính hãng" suffix="%" />
                        </div>
                        <div className="hidden md:block h-10 w-px bg-gradient-to-b from-transparent via-emerald-200 to-transparent" />
                        <div className="flex justify-center md:justify-end gap-3">
                            <a href="#san-pham" className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-2 text-white font-semibold shadow hover:bg-emerald-700">Xem sản phẩm</a>
                            <a href="#lien-he" className="inline-flex items-center rounded-full bg-white px-4 py-2 text-emerald-700 font-semibold ring-1 ring-emerald-600/30 hover:bg-emerald-50">Liên hệ tư vấn</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ----------------- Helpers ----------------- */
function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <li className="flex items-center gap-2 rounded-full border border-emerald-700/15 bg-white/70 px-3 py-2 text-[13px] text-slate-700 shadow-sm">
            <span className="text-emerald-600">{icon}</span>
            <span className="font-medium">{label}</span>
        </li>
    );
}

function FallbackGraphic() {
    return (
        <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-2xl bg-emerald-200/30 blur-xl" />
                <svg width="320" height="160" viewBox="0 0 320 160" className="text-emerald-600/80">
                    <defs>
                        <linearGradient id="g" x1="0" x2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#14b8a6" />
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="320" height="160" rx="14" fill="url(#g)" opacity="0.15" />
                    <g fill="none" stroke="url(#g)" strokeWidth="2">
                        <circle cx="80" cy="80" r="42" opacity="0.7" />
                        <circle cx="180" cy="80" r="56" opacity="0.5" />
                        <circle cx="250" cy="80" r="22" opacity="0.9" />
                    </g>
                </svg>
            </div>
        </div>
    );
}

/* ----------------- CountUp logic ----------------- */
function StatCounter({ end, label, suffix = "", plus = false, duration = 1.6 }: {
    end: number;
    label: string;
    suffix?: string;
    plus?: boolean; // hiển thị dấu + cuối số
    duration?: number; // giây
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (inView) setPlay(true);
    }, [inView]);

    return (
        <div ref={ref}>
            <div className="text-xl md:text-2xl font-extrabold text-slate-900">
                <CountUpNumber end={end} play={play} duration={duration} />
                {suffix && <span>{suffix}</span>}
                {plus && <span>+</span>}
            </div>
            <div className="mt-0.5 text-[12px] uppercase tracking-wide text-slate-500">{label}</div>
        </div>
    );
}

function CountUpNumber({ end, play, duration = 1.6 }: { end: number; play: boolean; duration?: number }) {
    const [val, setVal] = useState(0);
    const raf = useRef<number | null>(null);
    const startTs = useRef<number | null>(null);

    useEffect(() => {
        if (!play) return;
        const start = 0;
        const total = duration * 1000;

        const step = (ts: number) => {
            if (startTs.current === null) startTs.current = ts;
            const p = Math.min(1, (ts - startTs.current) / total);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - p, 3);
            const current = Math.round(start + (end - start) * eased);
            setVal(current);
            if (p < 1) {
                raf.current = requestAnimationFrame(step);
            }
        };

        raf.current = requestAnimationFrame(step);
        return () => {
            if (raf.current) cancelAnimationFrame(raf.current);
            startTs.current = null;
        };
    }, [play, end, duration]);

    return <>{new Intl.NumberFormat("vi-VN").format(val)}</>;
}

function useInView<T extends HTMLElement>(ref: React.RefObject<T>, rootMargin = "0px") {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting),
            { root: null, rootMargin, threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [ref, rootMargin]);

    return isIntersecting;
}
