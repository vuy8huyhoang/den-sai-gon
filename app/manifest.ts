import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ĐÈN SÀI GÒN - Đèn LED Chính Hãng",
    short_name: "ĐÈN SÀI GÒN",
    description:
      "Chuyên cung cấp đèn LED âm trần, đèn chùm, đèn trang trí chính hãng. Bảo hành 2 năm, giao hàng toàn quốc.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
