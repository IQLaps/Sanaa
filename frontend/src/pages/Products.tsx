import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/client'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await getProducts(page, 10)
        setProducts(response.data.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [page])

  if (loading) {
    return <div className="text-center py-20">جاري التحميل...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">المنتجات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover bg-gray-200"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-lg">${product.price}</span>
                  <span className={`text-sm ${product.stock_quantity > 0 ? 'text-success' : 'text-danger'}`}>
                    {product.stock_quantity > 0 ? `${product.stock_quantity} متاح` : 'غير متاح'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          السابق
        </button>
        <span className="py-2">{page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          التالي
        </button>
      </div>
    </div>
  )
}

export default Products
