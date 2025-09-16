export type Media = {
    type: 'image' | 'video' | 'spec' | 'model3d'
    src: string // image src OR fallback video url
    thumb?: string // thumbnail (image or video poster)
    label?: string
    // NEW (optional) — for YouTube videos
    youtubeId?: string // e.g. "dQw4w9WgXcQ"
    videoUrl?: string // non‑YouTube embed url if any
    poster?: string // video poster if you don't pass thumb
}
export type SpecRow = { label: string; value: string }
export type Price = { current: number; original?: number; vatIncluded?: boolean }
export type Brand = { name: string; logo?: string }
export type Hotline = { label: string; phone: string }
export type FeatureIcon = { src: string; label: string }
export type AttrChoice = { label: string; value?: string; color?: string; note?: string }
export type AttrGroup = { key: string; label: string; type?: 'chip' | 'color'; values: AttrChoice[]; defaultIndex?: number; tooltip?: string; scroll?: boolean }
export type PDPProps = { title: string; brand: Brand; stockText?: string; price: Price; media: Media[]; promo?: React.ReactNode; quickSpecs: SpecRow[]; attributes: AttrGroup[]; features?: FeatureIcon[]; hotlines?: Hotline[] }
export const fmtVND = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + 'đ'
export const BRAND = '#079553'
