import type { Metadata } from "next";
import "./globals.css";

import ContactFab from "./components/main/floating/ContactFab";
import MobileDock from "./components/main/floating/MobileDock";


export const metadata: Metadata = {
  title: "Đèn Sài Gòn - Đơn vị cung cấp thiết bị chiếu sáng",
  description: "Chuyên cung cấp sỉ và lẻ các loại đèn chùm, đèn thả, quạt trần đèn...",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">

      
      <body>{children}
        <ContactFab />
        <MobileDock
          phone="0853892898"
          cartCount={0}
          
          active="home"
        />
      </body>
    </html>
  );
}
