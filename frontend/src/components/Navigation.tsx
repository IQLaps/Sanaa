import { Link } from 'react-router-dom'
import { useAuthStore } from '../store'

function Navigation() {
  const { user, logout } = useAuthStore()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Sanaa</span>
            <span className="text-sm text-gray-500">صنعة</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary transition">
              المنتجات
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-primary transition">
              السلة
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-primary">
                  {user.email}
                </Link>
                <button
                  onClick={logout}
                  className="bg-danger text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary">
                  دخول
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition"
                >
                  تسجيل جديد
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
