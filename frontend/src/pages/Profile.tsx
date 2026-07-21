import { useState, useEffect } from 'react'
import { useAuthStore } from '../store'
import { getUserProfile, updateUserProfile } from '../api/client'

function Profile() {
  const { user } = useAuthStore()
  const [profile, setProfile] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const response = await getUserProfile(user.id)
          setProfile(response.data.data)
          setFormData(response.data.data)
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      }
      fetchProfile()
    }
  }, [user])

  const handleUpdate = async () => {
    try {
      await updateUserProfile(user!.id, formData)
      setProfile(formData)
      setIsEditing(false)
      alert('تم تحديث الملف الشخصي بنجاح')
    } catch (error) {
      alert('خطأ في تحديث الملف الشخصي')
    }
  }

  if (!user) {
    return <div className="text-center py-20">يرجى تسجيل الدخول</div>
  }

  if (!profile) {
    return <div className="text-center py-20">جاري التحميل...</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">الملف الشخصي</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-gray-600">الاسم الأول</label>
            <p className="font-bold text-lg">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              ) : (
                profile.first_name
              )}
            </p>
          </div>
          <div>
            <label className="text-gray-600">الاسم الأخير</label>
            <p className="font-bold text-lg">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                />
              ) : (
                profile.last_name
              )}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-gray-600">البريد الإلكتروني</label>
          <p className="font-bold text-lg">{profile.email}</p>
        </div>

        <div className="mb-6">
          <label className="text-gray-600">رقم الهاتف</label>
          <p className="font-bold text-lg">
            {isEditing ? (
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1 border rounded"
              />
            ) : (
              profile.phone
            )}
          </p>
        </div>

        <div className="flex gap-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-opacity-90"
            >
              تعديل
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="bg-success text-white px-6 py-2 rounded font-bold hover:bg-opacity-90"
              >
                حفظ
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-danger text-white px-6 py-2 rounded font-bold hover:bg-opacity-90"
              >
                إلغاء
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
