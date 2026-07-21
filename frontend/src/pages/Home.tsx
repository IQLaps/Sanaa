import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">منصة صنعة للتسوق الإلكتروني</h1>
          <p className="text-xl mb-8">أكبر منصة متخصصة في المنتجات الإلكترونية الصناعية</p>
          <Link
            to="/products"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            تصفح المنتجات
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">آلاف المنتجات</h3>
            <p className="text-gray-600">مجموعة واسعة من المنتجات الإلكترونية الصناعية</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2">شحن سريع</h3>
            <p className="text-gray-600">توصيل موثوق وسريع إلى جميع أنحاء البلاد</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-2">دفع آمن</h3>
            <p className="text-gray-600">طرق دفع متعددة وآمنة تماماً</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
