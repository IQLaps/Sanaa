import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProduct, addToCart } from '../api/client'
import { useAuthStore } from '../store'
import { useCartStore } from '../store'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()
  const cartAddItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id!)
        setProduct(response.data.data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      alert('يرجى تسجيل الدخول أولاً')
      return
    }

    try {
      await addToCart(user.id, product.id, quantity)
      cartAddItem({
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        quantity,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      })
      alert('تم إضافة المنتج إلى السلة')
    } catch (error) {
      alert('خطأ في إضافة المنتج')
    }
  }

  if (loading) {
    return <div className="text-center py-20">جاري التحميل...</div>
  }

  if (!product) {
    return <div className="text-center py-20">المنتج غير موجود</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full rounded-lg shadow-lg bg-gray-200 h-96 object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <div className="mb-4">
              <span className="text-gray-600">السعر:</span>
              <span className="text-4xl font-bold text-primary ml-4">${product.price}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600">المخزون:</span>
              <span className={`ml-4 font-bold ${product.stock_quantity > 0 ? 'text-success' : 'text-danger'}`}>
                {product.stock_quantity > 0 ? `${product.stock_quantity} متاح` : 'غير متاح'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">الكمية</label>
            <input
              type="number"
              min="1"
              max={product.stock_quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-4 py-2 border rounded-lg"
            />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 mb-4"
          >
            إضافة إلى السلة
          </button>

          <button className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-opacity-90">
            شراء الآن
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
