// components/shared/ItemCard.tsx
"use client"
import Image from "next/image"
import { useState } from "react"

export type Variant = {
  image: string // ảnh lớn khi chọn
  thumb?: string // thumbnail vuông; nếu thiếu sẽ dùng image
  label?: string // ví dụ: 6 tay, 8 tay, 12 tay...
}

/** Icon hiển thị theo ảnh PNG */
export type FeatureIcon = { key: string; img: string; label?: string }

export type ItemCardProps = {
  title: string
  image: string
  priceMin: number
  priceMax?: number
  discount?: number
  /** Tuỳ chọn: hiển thị progress "đã bán/ tổng" (dành cho Flash Sale) */
  progress?: { sold: number; total: number } | null
  /** Danh sách biến thể (thumbnail vuông). Chọn vào sẽ đổi ảnh đại diện */
  variants?: Variant[]

  /** Cách chọn dải feature */
  /** - 'downlight' => dùng gói icon đèn LED âm trần
   *  - 'chandelier' => dùng gói icon đèn chùm
   *  - 'custom' => truyền mảng features riêng qua prop `features`
   *  - 'none' => không hiển thị dải feature
   *  - 'auto' => bạn tự set theo logic ngoài (mặc định 'none')
   */
  featureMode?: "none" | "auto" | "downlight" | "chandelier" | "custom"
  /** Khi featureMode==='custom' thì dùng mảng này */
  features?: FeatureIcon[]
  /** Nếu muốn chỉ lấy 1 phần trong gói mặc định, truyền danh sách key để lọc & sắp xếp */
  featureKeys?: string[]

  /** Kiểu hiển thị badge bảo hành bên dưới dải feature */
  /** - 'downlightImg' | 'chandelierImg' => hiển thị ảnh PNG
   *  - 'textRed' => badge chữ nền đỏ
   *  - 'none' => ẩn
   *  - 'auto' => tự chọn theo featureMode ('downlight'/'chandelier' => ảnh; còn lại => 'textRed')
   */
  warrantyMode?: "auto" | "none" | "downlightImg" | "chandelierImg" | "textRed"
  warrantyImgDownlight?: string // override đường dẫn nếu khác mặc định
  warrantyImgChandelier?: string // override đường dẫn nếu khác mặc định
}

// ====== Gói icon mặc định ======
const DOWNLIGHT_PACK: FeatureIcon[] = [
  { key: "antiglare", img: "/den-sai-gon/icons/icon-17.png", label: "Chống chói" },
  { key: "warranty3y", img: "/den-sai-gon/icons/icon-12.png", label: "Bảo hành 3 năm" },
  { key: "genuine", img: "/den-sai-gon/icons/icon-13.png", label: "Chính hãng" },
  { key: "cri97", img: "/den-sai-gon/icons/icon_Artboard 18.png", label: "CRI 97" },
]

const CHANDELIER_PACK: FeatureIcon[] = [
  { key: "size", img: "/den-sai-gon/icons/icon2-01.png", label: "Nhiều kích thước" },
  { key: "led3mau", img: "/den-sai-gon/icons/icon2-02.png", label: "LED 3 màu" },
  { key: "inox201", img: "/den-sai-gon/icons/icon2-03.png", label: "Inox 201" },
  { key: "dong", img: "/den-sai-gon/icons/icon2-04.png", label: "Khung đồng" },
  { key: "phaleK9", img: "/den-sai-gon/icons/icon2-05.png", label: "Pha lê K9" },
]

const DEFAULT_WARRANTY_DOWNLIGHT = "/den-sai-gon/icons/icon_Artboard 26.svg" // "Bảo hành tại nhà" (PNG)
const DEFAULT_WARRANTY_CHANDELIER = "/den-sai-gon/icons/icon_Artboard 19.svg"

export default function ItemCard({
  title,
  image,
  priceMin,
  priceMax,
  discount,
  progress,
  variants = [],
  featureMode = "none",
  features,
  featureKeys,
  warrantyMode = "auto",
  warrantyImgDownlight,
  warrantyImgChandelier,
}: ItemCardProps) {
  const [activeImage, setActiveImage] = useState<string>(image)

  const priceText =
    new Intl.NumberFormat("vi-VN").format(priceMin) +
    "đ" +
    (priceMax ? ` - ${new Intl.NumberFormat("vi-VN").format(priceMax)}đ` : "")

  // ---- Quyết định dải feature để hiển thị ----
  let pack: FeatureIcon[] = []
  if (featureMode === "custom" && features) pack = features
  else if (featureMode === "downlight") pack = DOWNLIGHT_PACK
  else if (featureMode === "chandelier") pack = CHANDELIER_PACK
  else pack = [] // 'none' | 'auto' => mặc định ẩn (bạn có thể set 'auto' theo logic bên ngoài)

  // Lọc & sắp xếp theo featureKeys (nếu có)
  if (featureKeys && featureKeys.length && pack.length) {
    const map = new Map(pack.map((f) => [f.key, f]))
    pack = featureKeys.map((k) => map.get(k)).filter(Boolean) as FeatureIcon[]
  }

  // ---- Quyết định badge bảo hành ----
  let warranty: "downlightImg" | "chandelierImg" | "textRed" | "none" = "textRed"
  if (warrantyMode === "auto") {
    warranty = featureMode === "downlight" ? "downlightImg" : featureMode === "chandelier" ? "chandelierImg" : "textRed"
  } else {
    warranty = warrantyMode
  }

  const warrantySrc =
    warranty === "downlightImg"
      ? warrantyImgDownlight || DEFAULT_WARRANTY_DOWNLIGHT
      : warranty === "chandelierImg"
        ? warrantyImgChandelier || DEFAULT_WARRANTY_CHANDELIER
        : undefined

  return (
    <article className=" overflow-hidden bg-white hover:shadow transition-shadow">
      {/* Ảnh sản phẩm (đổi theo biến thể) */}
      <div className="relative h-[330px] bg-white">
        <Image
          src={activeImage || "/placeholder.svg"}
          alt={title}
          fill
          sizes="330px"
          className="object-contain"
          loading="lazy"
        />
      </div>

      {/* Dải feature (chỉ render khi có pack) */}
      {pack.length > 0 && (
        <div className="pt-2 pb-1 flex items-center justify-between text-[12px]">
          {pack.map((f) => (
            <span key={f.key} className="inline-flex items-center gap-1 text-slate-700">
              <Image
                src={f.img || "/placeholder.svg"}
                alt={f.label || ""}
                width={40}
                height={40}
                quality={95}
                className="object-contain select-none [image-rendering:auto]"
                loading="lazy"
              />
            </span>
          ))}
        </div>
      )}

      {/* Badge bảo hành (tùy kiểu) */}
      {warranty !== "none" && (
        <div className="py-2">
          {warrantySrc ? (
            <Image
              src={warrantySrc || "/placeholder.svg"}
              alt="Bảo hành"
              width={250}
              height={26}
              quality={95}
              className="object-contain contrast-125 saturate-110 drop-shadow-sm"
              loading="lazy"
            />
          ) : (
            <span className="inline-block text-[12px] bg-[#de3a2b] text-white rounded-full px-3 py-[6px]">
              BẢO HÀNH TẠI NHÀ
            </span>
          )}
        </div>
      )}

      {/* Biến thể (thumbnail vuông) */}
      {variants.length > 0 && (
        <div className="py-2">
          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 [scrollbar-width:none]">
            {variants.map((v, idx) => {
              const isActive = activeImage === v.image
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(v.image)}
                  aria-pressed={isActive}
                  className={[
                    "relative w-14 h-14 rounded-md overflow-hidden bg-white border",
                    isActive ? "border-emerald-600 ring-2 ring-emerald-200" : "border-slate-200",
                  ].join(" ")}
                  title={v.label || "Biến thể"}
                >
                  <Image
                    src={v.thumb || v.image}
                    alt={v.label || "variant"}
                    fill
                    sizes="56px"
                    className="object-contain"
                    loading="lazy"
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Tiêu đề */}
      <h4 className="py-2 text-[15px] leading-7 text-slate-800 line-clamp-1">{title}</h4>

      {/* Giá + % giảm */}
      <div className="py-2 flex items-end gap-2">
        <span className="text-[#079553] font-semibold">{priceText}</span>
        {typeof discount === "number" && discount > 0 && (
          <span className="text-[12px] text-slate-500 bg-slate-100 rounded px-1">-{discount}%</span>
        )}
      </div>

      {/* Progress (tuỳ có) */}
      {progress && (
        <div className="px-4 pb-4">
          <div className="h-[10px] rounded-full bg-[#e8f5e9] overflow-hidden">
            <div
              className="h-full bg-[linear-gradient(90deg,#4caf50,#079553)]"
              style={{ width: `${Math.min(100, Math.round((progress.sold / progress.total) * 100))}%` }}
            />
          </div>
          <div className="mt-1 text-center text-[12px] text-slate-600">
            Đã bán {progress.sold}/{progress.total} suất
          </div>
        </div>
      )}
    </article>
  )
}

/* ===================== CÁCH DÙNG =====================
1) Đèn LED âm trần – chỉ hiện các icon chọn lọc + badge ảnh PNG

<ItemCard
  title="Downlight 9W"
  image="/den-sai-gon/anh-sp/downlight-9w.png"
  priceMin={129000}
  priceMax={159000}
  discount={15}
  featureMode="downlight"
  featureKeys={['antiglare','cri97']} // chỉ hiện 2 icon này, bỏ các icon còn lại
  warrantyMode="downlightImg" // dùng ảnh PNG bảo hành tại nhà
  variants={[
    { image: '/den-sai-gon/anh-sp/downlight-9w.png', label: '9W' },
    { image: '/den-sai-gon/anh-sp/downlight-12w.png', label: '12W' },
  ]}
/>

2) Đèn chùm – chọn gói đèn chùm & tuỳ chọn badge riêng

<ItemCard
  title="Đèn chùm pha lê 12 tay"
  image="/den-sai-gon/anh-sp/den-chum-12.png"
  priceMin={11241000}
  priceMax={13990000}
  discount={20}
  featureMode="chandelier"
  featureKeys={['phaleK9','led3mau','dong']} // chỉ hiện 3 icon này
  warrantyMode="chandelierImg"
  warrantyImgChandelier="/den-sai-gon/icons/chum-warranty.png"
  variants={[
    { image: '/den-sai-gon/anh-sp/den-chum-12.png', label: '12 tay' },
    { image: '/den-sai-gon/anh-sp/den-chum-18.png', label: '18 tay' },
  ]}
/>

3) Tuỳ biến hoàn toàn (custom)

<ItemCard
  title="Sản phẩm custom"
  image="/img/main.png"
  priceMin={900000}
  featureMode="custom"
  features=[{
    key: 'ip65',
    img: '/icons/ip65.png',
    label: 'IP65'
  }, {
    key: 'al6063',
    img: '/icons/al6063.png',
    label: 'Nhôm 6063'
  }]
  warrantyMode="textRed"
/>
====================================================== */
