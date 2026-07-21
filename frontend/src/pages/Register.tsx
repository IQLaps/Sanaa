import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/client'
import { useAuthStore } from '../store'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const authLogin = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await register(email, password, firstName, lastName)
      authLogin(response.data.data.user, response.data.data.token)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.error || 'حدث خطأ أثناء التسجيل')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">إنشاء حساب جديد</h1>

      {error && <div className="bg-danger text-white p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">الاسم الأول</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">الاسم الأخير</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-opacity-90 disabled:opacity-50 transition"
        >
          {loading ? 'جاري التسجيل...' : 'تسجيل'}
        </button>
      </form>
    </div>
  )
}

export default Register
