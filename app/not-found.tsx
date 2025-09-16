import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-slate-400">404</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy trang</h1>
          <p className="text-slate-600 mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>

          <div className="flex gap-3 justify-center">
            <Link
              href="/danh-muc"
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Danh mục
            </Link>

            <Link
              href="/tim-kiem"
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Search className="h-4 w-4" />
              Tìm kiếm
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Cần hỗ trợ? Gọi hotline:{" "}
            <a href="tel:0853892898" className="text-emerald-600 font-medium">
              0853.892.898
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
