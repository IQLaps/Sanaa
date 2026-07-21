import { useState, useEffect } from 'react'
import { useAuthStore } from '../store'
import { getOrders } from '../api/client'

function Orders() {
  const { user } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const response = await getOrders(user.id)
          setOrders(response.data.data)
        } catch (error) {
          console.error('Error fetching orders:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchOrders()
    }
  }, [user])

  if (!user) {
    return <div className="text-center py-20">يرجى تسجيل الدخول</div>
  }

  if (loading) {
    return <div className="text-center py-20">جاري التحميل...</div>
  }

  if (orders.length === 0) {
    return <div className="text-center py-20">لا توجد طلبات</div>
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">طلباتي</h1>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-lg">الطلب #{order.id.slice(0, 8)}</h3>
                <p className="text-gray-600">{new Date(order.created_at).toLocaleDateString('ar-SA')}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">${order.total_price}</p>
                <span
                  className={`inline-block px-3 py-1 rounded text-white ${
                    order.status === 'pending' ? 'bg-warning' : 'bg-success'
                  }`}
                >
                  {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
