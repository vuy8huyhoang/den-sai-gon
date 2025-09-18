'use client'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, ShieldCheck, Facebook, Youtube, ArrowUpRight, ChevronRight } from 'lucide-react'

/**
 * Footer – Modern, high-contrast footer inspired by the reference screenshot
 * - Clean grid layout, accent gradient bar, elevated hotline card
 * - Fully responsive, uses Tailwind
 * - Replace logo src & links with your data
 */

export default function Footer() {
    return (
        <footer className="relative bg-white pb-24 md:pb-0">
            {/* Accent gradient bar */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />

           

            <div className="container-x px-4 py-10 md:py-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
                    {/* Brand + summary */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <Image src="/logo.svg" width={170} height={46} alt="LEDXANH" priority />
                            
                        </Link>
                        <p className="text-sm text-slate-600 max-w-sm">
                            <span className="font-semibold text-emerald-700">THƯƠNG HIỆU ĐÈN SÀI GÒN</span>
                            <br />
                            Giải pháp chiếu sáng chính hãng – bảo hành tại nhà. Tư vấn thiết kế, lắp đặt nhanh, giá tốt.
                        </p>

                        {/* Hotline card */}
                        <div className="relative mt-4 rounded-xl border border-emerald-600/20 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-[0_10px_25px_rgba(2,80,60,0.08)]">
                            <div className="absolute -top-3 -left-3 rounded-full bg-emerald-600 p-2 text-white shadow-lg">
                                <Phone size={16} />
                            </div>
                            <div className="pl-6">
                                <div className="text-xs uppercase tracking-wide text-emerald-700">CSKH & khiếu nại</div>
                                <a href="tel:0853892898" className="mt-1 block text-2xl font-extrabold text-slate-900">
                                    0853 892 898
                                </a>
                                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                    <ShieldCheck className="h-4 w-4 text-emerald-600" /> Bảo hành tại nhà từ 24 tháng
                                </div>
                            </div>
                        </div>

                        {/* Trust badges (replace with your images if needed) */}
                        <div className="flex items-center gap-3 pt-2">
                            <TrustBadge label="DMCA" />
                            <TrustBadge label="SSL" />
                        </div>
                    </div>

                    {/* Showrooms */}
                    <div className="space-y-4">
                        <FooterTitle>Hệ thống showroom</FooterTitle>

                        <Address
                            title="Hồ Chí Minh – Showroom chính"
                            lines={[
                                '704/11/1A Hương Lộ 2, P Bình Trị Đông, Q Bình Tân, TP.HCM (8h–12h, 13h30–17h30, T2–T7)',
                            ]}
                            phone="0853892898"
                            note="Chi Nhánh Chính"
                            mapHref="https://maps.app.goo.gl/qp5D9isKXvHn8isx5"
                        />

                       
                    </div>

                    {/* Branches */}
                    <div className="space-y-4">
                        <div className="pt-8 md:pt-0">
                            <FooterTitle>Kho hàng</FooterTitle>
                        </div>

                        <Address
                            title="Hồ Chí Minh - Kho hàng chính"
                            lines={[
                                '19 KC ấp Mỹ Hoà 1, Tân Xuân, Hóc Môn, TP.HCM (7h30–17h30, T2–T7)',
                            ]}
                            phone="0853892898"
                            note="Kho hàng chính"
                            email="denvietsaigon@gmail.com"
                            mapHref="#"
                        />

                    </div>

                    {/* Policies + Socials */}
                    <div className="space-y-5">
                        <FooterTitle>Chính sách & Quy định</FooterTitle>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <PolicyLink href="#">Chính sách đổi trả</PolicyLink>
                            <PolicyLink href="#">Chính sách bảo hành</PolicyLink>
                            <PolicyLink href="#">Điều khoản dịch vụ</PolicyLink>
                            <PolicyLink href="#">Chính sách bảo mật</PolicyLink>
                            <PolicyLink href="#">Hướng dẫn mua hàng</PolicyLink>
                            <PolicyLink href="#">Kinh nghiệm mua hàng</PolicyLink>
                        </ul>

                        <FooterTitle className="pt-4">Theo dõi chúng tôi</FooterTitle>
                        <div className="flex items-center gap-3">
                            <Social icon={<Facebook className="h-4 w-4" />} label="Facebook" href="#" />
                            <Social icon={<Youtube className="h-4 w-4" />} label="Youtube" href="#" />
                            <Social icon={<ArrowUpRight className="h-4 w-4" />} label="Tuyển dụng" href="#" />
                        </div>
                    </div>
                </div>
            </div>

            {/* bottom bar */}
            <div className="border-t border-slate-200/70">
                <div className="container-x px-4 py-4 text-sm text-slate-600 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        © {new Date().getFullYear()} by Vu AI. GPKD - 0108769986. Nơi cấp: Sở KH&ĐT Hồ Chí Minh.
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <span className="text-slate-500">Hotline mua hàng:</span>
                        <a href="tel:0853892898" className="font-semibold text-emerald-700 hover:underline">
                            0853 892 898
                        </a>
                    </div>
                </div>
            </div>

        </footer>
    )
}

/* --------------------------------- Sub parts -------------------------------- */

function FooterTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <h4 className={`text-[15px] font-extrabold tracking-wide text-slate-900 ${className}`}>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{children}</span>
        </h4>
    )
}

function PolicyLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="group inline-flex items-center gap-1 hover:text-emerald-700">
                <ChevronRight className="h-4 w-4 text-emerald-600/70 group-hover:text-emerald-700" />
                {children}
            </Link>
        </li>
    )
}

function Address({ title, lines, phone, note, email, mapHref }: {
    title: string
    lines: string[]
    phone?: string
    note?: string
    email?: string
    mapHref?: string
}) {
    return (
        <div className="rounded-lg border border-slate-200/70 p-4">
            <div className="mb-2 font-semibold text-slate-900">{title}</div>
            <ul className="space-y-2 text-sm text-slate-700">
                {lines.map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                        <span className='flex-1 min-w-0 whitespace-normal break-words'>
                            {l}
                            {mapHref && (
                                <Link href={mapHref} className="ml-2 text-emerald-700 hover:underline">
                                    (xem bản đồ)
                                </Link>
                            )}
                        </span>
                    </li>
                ))}
                {phone && (
                    <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-emerald-600" />
                        <span>
                            {phone}
                            {note && <span className="text-slate-500"> – {note}</span>}
                        </span>
                    </li>
                )}
                {email && (
                    <li className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-emerald-600" /> {email}
                    </li>
                )}
            </ul>
        </div>
    )
}

function Social({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-emerald-500 hover:bg-emerald-50"
        >
            <span className="text-emerald-700">{icon}</span>
            {label}
        </Link>
    )
}

function TrustBadge({ label }: { label: string }) {
    return (
        <div className="inline-flex items-center rounded-md border border-emerald-600/20 bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
            <ShieldCheck className="mr-1.5 h-3.5 w-3.5" /> {label}
        </div>
    )
}
