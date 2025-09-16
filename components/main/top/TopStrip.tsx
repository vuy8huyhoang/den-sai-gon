import Image from 'next/image'
import Container from '../layout/Container'
import { CONTACTS } from '../../../lib/data'
import { Phone, MapPin, LogIn, UserPlus, ShoppingCart } from 'lucide-react'

export default function TopStrip() {
    return (
        <div className="w-full hidden md:block  border-b bg-white top-shadow text-[15px]">
            <Container className="h-11 flex items-center justify-between text-slate-800">
                {/* Trái: hotline theo khu vực */}
                <div className="flex items-center gap-5 whitespace-nowrap overflow-hidden">
                    {CONTACTS.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 shrink-0">
                            <Phone size={15} className="text-emerald-600" />
                            <b className="text-slate-900">{c.label}</b>
                            <a href={`tel:${c.phone}`} className="font-semibold text-emerald-600 hover:text-emerald-700">{c.phone}</a>
                            {c.note && <em className="opacity-70">&nbsp;- {c.note}</em>}
                            {i < CONTACTS.length - 1 && <span className="hidden md:inline text-slate-300">•</span>}
                        </div>
                    ))}
                </div>

                {/* Phải: actions */}
                <div className="flex items-center gap-3">
                    {/* Zalo: dùng PNG + chữ đậm hơn */}
                    <a className="inline-flex items-center gap-2 hover:text-slate-900" href="https://zalo.me/0853892898">
                        <Image src="/den-sai-gon/icons/zalo.png" alt="Zalo" width={18} height={18} className="rounded-full" />
                        <span className="font-semibold">Zalo</span>
                    </a>
                    <a className="inline-flex items-center gap-2 hover:text-slate-900" href="#">
                        <MapPin size={15} className="text-rose-600" />
                        <span className="font-semibold">Hệ thống cửa hàng</span>
                    </a>
                    <a className="inline-flex items-center gap-2 hover:text-slate-900" href="#">
                        <LogIn size={15} />
                        <span className="font-semibold">Đăng nhập</span>
                    </a>
                    <a className="inline-flex items-center gap-2 hover:text-slate-900" href="#">
                        <UserPlus size={15} />
                        <span className="font-semibold">Đăng kí</span>
                    </a>

                    {/* Nút giỏ hàng xanh nổi bật */}
                    <a
                        href="#"
                        className="ml-2 inline-flex items-center gap-2 h-8 px-3 rounded-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                    >
                        <ShoppingCart size={15} />
                        <span className="font-semibold">Giỏ hàng</span>
                        <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] rounded-full bg-white/90 text-emerald-700">0</span>
                    </a>
                </div>
            </Container>
        </div>
    )
}

/* Gợi ý: đặt file PNG của Zalo vào public/icons/zalo.png */
