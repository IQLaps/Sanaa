import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Products
export const getProducts = (page = 1, limit = 10) =>
  apiClient.get('/products', { params: { page, limit } })

export const getProduct = (id: string) => apiClient.get(`/products/${id}`)

export const createProduct = (data: any) => apiClient.post('/products', data)

export const updateProduct = (id: string, data: any) => apiClient.put(`/products/${id}`, data)

export const deleteProduct = (id: string) => apiClient.delete(`/products/${id}`)

// Categories
export const getCategories = () => apiClient.get('/categories')

export const getCategory = (id: string) => apiClient.get(`/categories/${id}`)

export const createCategory = (data: any) => apiClient.post('/categories', data)

// Auth
export const register = (email: string, password: string, firstName: string, lastName: string) =>
  apiClient.post('/auth/register', { email, password, firstName, lastName })

export const login = (email: string, password: string) =>
  apiClient.post('/auth/login', { email, password })

// Cart
export const getCart = (userId: string) => apiClient.get('/cart', { params: { userId } })

export const addToCart = (userId: string, productId: string, quantity: number) =>
  apiClient.post('/cart', { userId, productId, quantity })

export const removeFromCart = (itemId: string) => apiClient.delete(`/cart/${itemId}`)

// Orders
export const getOrders = (userId: string) => apiClient.get('/orders', { params: { userId } })

export const getOrder = (id: string) => apiClient.get(`/orders/${id}`)

export const createOrder = (userId: string, items: any[], shippingAddress: string, paymentMethod: string) =>
  apiClient.post('/orders', { userId, items, shippingAddress, paymentMethod })

// Users
export const getUserProfile = (userId: string) => apiClient.get(`/users/profile/${userId}`)

export const updateUserProfile = (userId: string, data: any) =>
  apiClient.put(`/users/profile/${userId}`, data)

export default apiClient
