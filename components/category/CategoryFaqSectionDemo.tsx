import { CatBlock,  CategoryDescriptionFull, FeaturedImage } from "./CategoryDescription"
import { FaqAccordion, FaqItem } from "./FaqAccordion"
export const faq: FaqItem[] = [
    { question: 'Làm thế nào để đặt hàng?', answer: <p>Bạn có thể đặt hàng trực tiếp trên website, hoặc liên hệ hotline. Đơn hàng sẽ được xác nhận qua SMS/Zalo.</p> },
    { question: 'Có thanh toán khi nhận hàng không?', answer: <p>Hỗ trợ COD toàn quốc. Với đơn máy công trình giá trị lớn có thể cần đặt cọc.</p> },
    { question: 'Phí giao hàng tính thế nào?', answer: <p>Trong nội thành HCM miễn phí với đơn trên 1.000.000đ. Tỉnh thành khác áp dụng theo bảng giá của đơn vị vận chuyển.</p> },
    { question: 'ĐÈN SÀI GÒN có nhận lắp đặt không?', answer: <p>Có. Vui lòng đặt lịch trước 24h để được phục vụ tốt nhất.</p> },
    {
        question: 'ĐÈN SÀI GÒN có nhận trả hàng không? Điều kiện trả hàng thế nào', answer: <p>Khách hàng mua hàng tại ĐÈN SÀI GÒN được trả hàng miễn phí trong thời gian 7 ngày. Điều kiện trả hàng như sau:
            Trong thời gian được đổi trả. Hàng còn nguyên vỏ hộp.
            Vỏ hộp không bị rách nát. Hàng còn mới chưa lắp lên: không bị trầy xước, dính sơn, thạch cao….
            Hàng chưa cắt đầu dây Hàng còn nguyên tem mác, không tẩy xóa.
            Hàng còn đầy đủ linh, phụ kiện. Không thuộc các mặt hàng không được phép đổi trả.</p>
    },

]
export const related = [
    { label: 'Bảng giá đèn LED downlight âm trần tháng 09‑2025', href: '#' },
    { label: 'Bảng giá đèn LED âm trần Philips tháng 09‑2025', href: '#' },
    { label: 'Bảng giá bóng đèn LED Philips tháng 09‑2025', href: '#' },
    { label: 'Bảng giá đèn LED âm trần thạch cao mới nhất', href: '#' },
    { label: 'Bảng giá đèn LED âm trần đổi màu', href: '#' },
    { label: 'Báo giá đèn LED âm trần rọi', href: '#' },
    { label: 'Bảng giá đèn mắt ếch cập nhật', href: '#' },
    { label: 'Công suất phổ biến: đèn LED âm trần 9W', href: '#' },
    { label: 'Các mẫu đèn LED âm trần 7W', href: '#' },
]
export function CategoryFaqSectionDemo() {



    const blocks: CatBlock[] = [
        {
            heading: 'Đèn LED âm trần là gì?',
            body: (
                <>
                    <p><b>Đèn LED âm trần (downlight)</b> là loại đèn gắn lõm vào trần, cho luồng sáng chiếu trực tiếp xuống, giữ bề mặt trần phẳng gọn gàng. Nhờ hiệu suất phát quang cao, tuổi thọ 30.000–50.000h và tản nhiệt tốt, downlight là lựa chọn phổ biến cho nhà ở, văn phòng và cửa hàng.</p>
                    <p>So với bóng compact/halogen, downlight giúp <b>tiết kiệm 50–80% điện</b>, ánh sáng êm mắt, ít toả nhiệt. Nhiều mẫu hỗ trợ đổi 3 màu (3000K/4000K/6500K) bằng 1 công tắc.</p>
                </>
            )
        },
        {
            heading: 'Tại sao nên chọn tại Densaigon.vn?',
            body: (
                <>
                    <ul className="list-disc pl-5">
                        <li>Chính sách <b>bảo hành tại nhà</b> 2–3 năm, xử lý nhanh chóng.</li>
                        <li><b>Đổi mới 7 ngày</b> nếu lỗi nhà sản xuất.</li>
                        <li>Kho đa dạng công suất, kích thước lỗ khoét D50–D110.</li>
                        <li>Giá tốt từ kho nhà máy, có đội ngũ kỹ thuật hỗ trợ lắp đặt.</li>
                    </ul>
                </>
            )
        },
        {
            heading: 'Theo dòng sản phẩm',
            body: (
                <>
                    <ul className="list-disc pl-5">
                        <li><b>Siêu mỏng</b> — thả trần, ánh sáng toả đều, thi công nhanh.</li>
                        <li><b>Rọi (Anti‑glare)</b> — ánh sáng tập trung, chống chói, tạo điểm nhấn nội thất.</li>
                        <li><b>Đổi 3 màu</b> — thay đổi nhiệt màu linh hoạt theo thời điểm trong ngày.</li>
                        <li><b>Chống ẩm/IP65</b> — phù hợp nhà tắm, ban công, khu vực ẩm ướt.</li>
                    </ul>
                </>
            )
        },
        {
            heading: 'Phân loại theo thương hiệu',
            body: (
                <>
                    <p><b>Kosoom</b>: thương hiệu mạnh về đèn chiếu sáng kỹ thuật. Một số dòng <b>bảo hành 3 năm</b>, thiết kế chống chói đẹp, độ hoàn màu cao.</p>
                    <p><b>Philips</b>: lâu đời, driver ổn định, ánh sáng tự nhiên. Đa dạng công suất và kích thước, phù hợp dự án và gia đình.</p>
                    <p><b>Kingled</b>: phổ biến tại VN, giá tốt, dùng chip ổn định; nhiều model đổi màu tiện dụng.</p>
                    <p className="mt-2">Ngoài ra còn: Rạng Đông, FSL, Opple, CDN, ELV Lighting, Maxben…</p>
                </>
            )
        },
        {
            heading: 'Phân loại theo công suất',
            body: (
                <>
                    <p>Thông dụng 3W–20W; tuỳ trần cao và độ rọi mong muốn có thể lên tới 24W.</p>
                    <ul className="list-disc pl-5">
                        <li>3W • 5W/6W • 7W/8W • 9W/10W • 12W/15W • &gt;18W</li>
                    </ul>
                    <p className="mt-1 text-slate-700 text-[13px]">Gợi ý khoảng cách lắp: 0.8–1.2m tuỳ công suất và trần.</p>
                </>
            )
        },
    ]
   


    const featured: FeaturedImage = {
        src: '/den-sai-gon/anh-mo-ta-danh-muc/den-led-am-tran-phong-khach.png', // 👉 thay bằng ảnh thật của bạn
        alt: 'Ứng dụng đèn LED âm trần trong phòng khách hiện đại',
        caption: 'Ứng dụng thực tế: bố trí downlight kết hợp rọi điểm giúp không gian sáng đều nhưng vẫn có điểm nhấn.',
        credit: <>Nguồn: <a href="#" className="underline decoration-dotted">Densaigon.vn</a></>,
    }
    return (
        <div className="mx-auto grid container-x grid-cols-1 gap-6 md:grid-cols-12 mb-12">
            <div className="md:col-span-5">
                <FaqAccordion items={faq} title="Câu hỏi thường gặp" />
            </div>
            <div className="md:col-span-7">
                <CategoryDescriptionFull
                    title="ĐÈN LED ÂM TRẦN DOWNLIGHT"
                    intro={<p>Danh sách các sản phẩm đèn LED âm trần đầy đủ công suất, kiểu đáng với chất lượng và độ bền cao. Các sản phẩm densaigon.vn cung cấp có tuổi thọ lên tới 50.000h được bảo hành chính hãng từ 2- 3 năm. Đặc biệt  hiện nay đang có chương trình giảm giá hấp dẫn.</p>}
                    blocks={blocks}                // mảng các đoạn nội dung của bạn
                    featured={featured}
                    relatedLinks={related}
                    clamp={320}
                    relatedDefaultCollapsed={true} // true nếu muốn danh sách liên quan rút gọn sẵn
                    expandControl="always"
                />
            </div>
        </div>
    )
}
