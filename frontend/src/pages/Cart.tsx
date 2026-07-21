import { useCartStore } from '../store'
import { useAuthStore } from '../store'
import { useState } from 'react'
import { createOrder } from '../api/client'

function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      alert('يرجى تسجيل الدخول أولاً')
      return
    }

    setLoading(true)
    try {
      await createOrder(
        user.id,
        items.map(item => ({ productId: item.productId, quantity: item.quantity })),
        'تحديد العنوان',
        'credit_card'
      )
      clearCart()
      alert('تم إنشاء الطلب بنجاح')
    } catch (error: any) {
      alert(error.response?.data?.error || 'حدث خطأ')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">سلة التسوق</h1>
        <p className="text-gray-600 mb-4">السلة فارغة</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-danger text-white px-4 py-1 rounded hover:bg-opacity-90"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-2xl font-bold mb-4">الملخص</h2>
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span>المجموع:</span>
              <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>الشحن:</span>
              <span className="font-bold">مجاني</span>
            </div>
          </div>
          <div className="border-t pt-4 flex justify-between mb-4 text-lg font-bold">
            <span>الإجمالي:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? 'جاري المعالجة...' : 'الدفع'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
