'use client';

import CategorySubtypes, { SubtypeItem } from './CategorySubtypes';
import BrandRail, { BrandItem, KeywordItem } from './BrandRail';
import FilterBar from './FilterBar';

export default function CategoryToolbar() {
    // --- Demo data (thay bằng data thật của bạn) ---
    const subtypes: SubtypeItem[] = [
        { title: 'Đèn LED âm trần 3 màu', image: '/den-sai-gon/anh-danh-muc/den_am_tran_3_mau.png', href: '#', swatches: ['#f4f4f5', '#eab308', '#0ea5e9'] },
        { title: 'Đèn LED âm trần rọi', image: '/den-sai-gon/anh-danh-muc/den_am_tran_spotlight.png', href: '#' },
        { title: 'Đèn LED âm trần siêu mỏng', image: '/den-sai-gon/anh-danh-muc/den_am_tran_sieu_mong.png', href: '#' },
        { title: 'Đèn LED âm trần vuông', image: '/den-sai-gon/anh-danh-muc/den_am_tran_vuong.png', href: '#' },
        { title: 'Đèn LED âm trần dimmer', image: '/den-sai-gon/anh-danh-muc/den_am_tran_dimmer.png', href: '#' },
        { title: 'Đèn LED âm trần tán quang', image: '/den-sai-gon/anh-danh-muc/den_led_am_tran_tan_quang.png', href: '#' },
        { title: 'Đèn LED âm trần chống chói', image: '/den-sai-gon/anh-danh-muc/den_led_am_tran_chong_choi.png', href: '#' },
    ];

    const brands: BrandItem[] = [
        { name: 'Brightlux', logo: '/den-sai-gon/anh-danh-muc/brightlux.png' },
        { name: 'KOSOOM', logo: '/den-sai-gon/anh-danh-muc/kosoom.png' },
        { name: 'Philips', logo: '/den-sai-gon/anh-danh-muc/philips.png' },
        { name: 'Rạng Đông', logo: '/den-sai-gon/anh-danh-muc/rang_dong.png' },
        { name: 'Maxben', logo: '/den-sai-gon/anh-danh-muc/max_ben.png' },
        { name: 'Panasonic', logo: '/den-sai-gon/anh-danh-muc/panasonic.png' },
    ];

    const keywords: KeywordItem[] = [
        { label: 'Đèn âm trần 12w' },
        { label: 'Đèn 3 màu - đổi màu' },
        { label: 'Đèn âm trần 9w' },
    ];

    return (
        <div className="container-x px-4 pt-2">
            <CategorySubtypes title="ĐÈN ÂM TRẦN-CÁC LOẠI SẢN PHẨM KHÁC" items={subtypes} />

            <BrandRail popularTitle="Tìm kiếm nhiều:" brands={brands} keywords={keywords} />

            <FilterBar
                menus={[
                    { label: 'Giá', items: ['< 200.000đ', '200.000 – 500.000đ', '500.000 – 1.000.000đ', '> 1.000.000đ'] },
                    { label: 'Thương hiệu', items: ['Brightlux', 'KOSOOM', 'Philips', 'Rạng Đông', 'Maxben', 'Panasonic'] },
                    { label: 'Loại đèn', items: ['Âm trần 3 màu', 'Âm trần rọi', 'Siêu mỏng', 'Vuông'] },
                    { label: 'Công suất', items: ['5W', '7W', '9W', '12W', '18W', '24W'] },
                ]}
                sortLabel="Xếp theo"
                sortValue="Nổi bật"
            />
        </div>
    );
}
