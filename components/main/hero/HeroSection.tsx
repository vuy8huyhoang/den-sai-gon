import Container from "../../../components/main/layout/Container"
import HeroCarousel from "./HeroCarousel"
import PromoCard from "../../../components/main/cards/PromoCard"
import { BANNERS } from "../../../lib/data"

export default function HeroSection() {
    return (
        <section className="pt-4 md:py-4">
            <Container className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-9">
                    {/* Truyền ảnh qua prop images + tuỳ chỉnh chiều cao */}
                    <HeroCarousel
                        images={BANNERS}
                        heightClass="h-[150px] md:h-[400px]"
                        autoPlayMs={5000} // 0 để tắt
                    />
                </div>
                <div className="lg:col-span-3 flex flex-col gap-4">
                    <PromoCard image="/den-sai-gon/banners/banner3.jpg" />
                    <PromoCard image="/den-sai-gon/banners/banner4.jpg" />
                </div>
            </Container>
        </section>
    )
}
