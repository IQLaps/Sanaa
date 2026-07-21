import { create } from 'zustand'

interface User {
  id: string
  email: string
  firstName?: string
}

interface AuthStore {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthStore>((set) => {
  const savedUser = localStorage.getItem('user')
  const savedToken = localStorage.getItem('token')

  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    login: (user, token) => {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      set({ user, token })
    },
    logout: () => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      set({ user: null, token: null })
    },
    setUser: (user) => {
      localStorage.setItem('user', JSON.stringify(user))
      set({ user })
    },
  }
})

interface CartItem {
  id: string
  productId: string
  quantity: number
  name: string
  price: number
  image_url?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items
    const existingItem = items.find((i) => i.productId === item.productId)
    if (existingItem) {
      set({
        items: items.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i,
        ),
      })
    } else {
      set({ items: [...items, item] })
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) })
  },
  updateQuantity: (id, quantity) => {
    set({
      items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })
  },
  clearCart: () => {
    set({ items: [] })
  },
  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
}))
