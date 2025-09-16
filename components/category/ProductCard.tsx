"use client"
import Image from "next/image"
import { useMemo, useState } from "react"

export type Variant = { image?: string; thumb?: string; label?: string }
export type FeatureIcon = { key: string; img: string; label?: string }

// NEW: Attribute selectors under the name
export type AttrValue = { label: string; value?: string; color?: string; note?: string }
export type AttrGroup = {
  key: string
  label: string
  type?: "chip" | "color" // chip (size/power), color (swatch)
  values: AttrValue[]
  defaultIndex?: number
  scroll?: boolean // true → scroll-x row; false → wrap
}

export type ItemCardProps = {
  title: string
  image: string
  priceMin: number
  priceMax?: number
  discount?: number
  progress?: { sold: number; total: number } | null
  variants?: Variant[]
  featureMode?: "none" | "downlight" | "chandelier" | "custom"
  features?: FeatureIcon[]
  featureKeys?: string[]
  warrantyMode?: "auto" | "none" | "downlightImg" | "chandelierImg" | "textRed"
  warrantyImgDownlight?: string
  warrantyImgChandelier?: string
  // NEW
  attributes?: AttrGroup[]
}

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

const DEFAULT_WARRANTY_DOWNLIGHT = "/den-sai-gon/icons/icon_Artboard 26.svg"
const DEFAULT_WARRANTY_CHANDELIER = "/den-sai-gon/icons/icon_Artboard 19.svg"

export function ItemCard({
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
  attributes = [], // NEW
}: ItemCardProps) {
  const [activeImage, setActiveImage] = useState<string>(image)
  const [activeChip, setActiveChip] = useState<number>(0)

  // NEW: selection state for attribute groups
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, number>>(
    Object.fromEntries(attributes.map((g) => [g.key, g.defaultIndex ?? 0])),
  )

  const priceText =
    new Intl.NumberFormat("vi-VN").format(priceMin) +
    "đ" +
    (priceMax ? ` - ${new Intl.NumberFormat("vi-VN").format(priceMax)}đ` : "")

  let pack: FeatureIcon[] = []
  if (featureMode === "custom" && features) pack = features
  else if (featureMode === "downlight") pack = DOWNLIGHT_PACK
  else if (featureMode === "chandelier") pack = CHANDELIER_PACK

  if (featureKeys && featureKeys.length && pack.length) {
    const map = new Map(pack.map((f) => [f.key, f]))
    pack = featureKeys.map((k) => map.get(k)).filter(Boolean) as FeatureIcon[]
  }

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

  const hasVariantImages = useMemo(() => variants.some((v) => !!v.image || !!v.thumb), [variants])

  return (
    <article className="overflow-hidden bg-white border border-slate-200 hover:shadow-sm transition-shadow rounded-md p-3">
      {/* Ảnh sản phẩm */}
      <div className="relative h-[250px] bg-white">
        <Image
          src={activeImage || "/placeholder.svg"}
          alt={title}
          fill
          sizes="250px"
          className="object-contain"
          loading="lazy"
        />
      </div>

      {/* Dải feature */}
      {pack.length > 0 && (
        <div className="mt-2 mb-1 flex items-center justify-between text-[12px]">
          {pack.map((f) => (
            <span key={f.key} className="inline-flex items-center gap-1 text-slate-700">
              <Image
                src={f.img || "/placeholder.svg"}
                alt={f.label || ""}
                width={36}
                height={36}
                quality={95}
                className="object-contain"
                loading="lazy"
              />
            </span>
          ))}
        </div>
      )}

      {/* Badge bảo hành */}
      {warranty !== "none" && (
        <div className="py-2">
          {warrantySrc ? (
            <Image
              src={warrantySrc || "/placeholder.svg"}
              alt="Bảo hành"
              width={220}
              height={24}
              className="object-contain"
              loading="lazy"
            />
          ) : (
            <span className="inline-block text-[12px] bg-[#de3a2b] text-white rounded-full px-3 py-[6px]">
              BẢO HÀNH TẠI NHÀ
            </span>
          )}
        </div>
      )}

      {/* Biến thể hình ảnh (nếu có) */}
      {variants.length > 0 && (
        <div className="py-2">
          {hasVariantImages ? (
            <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 [scrollbar-width:none]">
              {variants.map((v, idx) => {
                const isActive = (!!v.image && activeImage === v.image) || (!!v.thumb && activeImage === v.thumb)
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(v.image || v.thumb || image)}
                    aria-pressed={isActive}
                    className={[
                      "relative w-12 h-12 rounded-md overflow-hidden bg-white border",
                      isActive ? "border-emerald-600 ring-2 ring-emerald-200" : "border-slate-200",
                    ].join(" ")}
                    title={v.label || "Biến thể"}
                  >
                    <Image
                      src={v.thumb || v.image || image}
                      alt={v.label || "variant"}
                      fill
                      sizes="48px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {variants.map((v, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveChip(idx)}
                  aria-pressed={activeChip === idx}
                  className={[
                    "px-2.5 h-7 text-[12px] rounded-md border",
                    activeChip === idx
                      ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                      : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50",
                  ].join(" ")}
                >
                  {v.label || "Variant"}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tiêu đề */}
      <h4 className="py-1 text-[15px] leading-8 text-slate-800 line-clamp-1 min-h-[44px]">{title}</h4>

      {/* NEW: Attribute selectors (under title) */}
      {attributes.length > 0 && (
        <div className="space-y-2 py-1">
          {attributes.map((group) => {
            const sel = selectedAttrs[group.key] ?? group.defaultIndex ?? 0
            const setSel = (i: number) => setSelectedAttrs((prev) => ({ ...prev, [group.key]: i }))

            if (group.type === "color") {
              return (
                <div key={group.key}>
                  <div className="text-[12px] text-slate-700 mb-1">{group.label}</div>
                  <div
                    className={
                      group.scroll
                        ? "flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 [scrollbar-width:none]"
                        : "flex flex-wrap gap-2"
                    }
                  >
                    {group.values.map((v, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSel(i)}
                        aria-pressed={sel === i}
                        className={[
                          "relative h-7 w-7 rounded-full border",
                          sel === i ? "border-emerald-600 ring-2 ring-emerald-200" : "border-slate-300",
                        ].join(" ")}
                        title={v.label}
                      >
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: v.color || "#d1d5db" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )
            }

            // default: chip selector
            return (
              <div key={group.key}>
                <div
                  className={
                    group.scroll
                      ? "flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:h-0 [scrollbar-width:none]"
                      : "flex flex-wrap gap-2"
                  }
                >
                  {group.values.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSel(i)}
                      aria-pressed={sel === i}
                      className={[
                        "px-2.5 h-7 text-[12px] rounded-md border whitespace-nowrap",
                        sel === i
                          ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                          : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50",
                      ].join(" ")}
                      title={v.note || v.label}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Giá */}
      <div className="py-1 flex items-end gap-2">
        <span className="text-[#079553] font-semibold">{priceText}</span>
        {typeof discount === "number" && discount > 0 && (
          <span className="text-[12px] text-slate-500 bg-slate-100 rounded px-1">-{discount}%</span>
        )}
      </div>

      {progress && (
        <div className="px-1 pb-1">
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

/* ----------------------------------------------
   Usage example:

<ItemCard
  title="Đèn LED âm trần chống chói X7"
  image="/images/products/x7/main.png"
  priceMin={182000}
  priceMax={389000}
  featureMode="downlight"
  variants={[{thumb:'/images/products/x7/7w.png', label:'7W'}, {thumb:'/images/products/x7/9w.png', label:'9W'}]}
  attributes={[
    { key: 'power', label: 'Công suất', values: [ {label:'7W'}, {label:'9W'}, {label:'12W'} ], scroll: true },
    { key: 'cutout', label: 'Khoét lỗ', values: [ {label:'Ø75'}, {label:'Ø90'}, {label:'Ø110'} ] },
    { key: 'cct', label: 'Màu ánh sáng', type: 'chip', values: [ {label:'3000K'}, {label:'4000K'}, {label:'6500K'} ] },
    { key: 'color', label: 'Màu viền', type: 'color', values: [ {label:'Đen', color:'#111827'}, {label:'Trắng', color:'#e5e7eb'} ] },
  ]}
/>
---------------------------------------------- */
