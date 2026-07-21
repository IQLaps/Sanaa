# Sanaa 🏭

منصة تسوق إلكترونية حديثة للمنتجات الإلكترونية الصناعية | Modern E-commerce Platform for Industrial Electronic Products

## Features ✨

- 🛍️ **Modern Shopping Experience** - واجهة مستخدم حديثة وسهلة الاستخدام
- 🔐 **Secure Authentication** - نظام تسجيل دخول آمن مع JWT
- 💳 **Payment Integration** - نظام دفع متقدم
- 📦 **Inventory Management** - إدارة المخزون الذكية
- 🎯 **Product Categories** - فئات ومنتجات منظمة
- 📊 **Admin Dashboard** - لوحة تحكم شاملة
- 🛒 **Shopping Cart** - سلة تسوق ذكية
- 📱 **Responsive Design** - متوافق مع جميع الأجهزة
- ⚡ **High Performance** - سرعة عالية وأداء ممتاز

## Tech Stack 🚀

### Frontend
- React 18+ with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Redux/Context for state management

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- RESTful API architecture

### DevOps
- Docker support
- GitHub Actions CI/CD

## Project Structure 📁

```
Sanaa/
├── frontend/          # React application
├── backend/           # Express server
├── docker/           # Docker configurations
└── docs/             # Documentation
```

## Getting Started 🏃

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IQLaps/Sanaa.git
   cd Sanaa
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Backend .env
   DATABASE_URL=postgresql://user:password@localhost:5432/sanaa
   JWT_SECRET=your_secret_key
   NODE_ENV=development

   # Frontend .env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## API Documentation 📚

See [docs/API.md](docs/API.md) for detailed API documentation.

## Contributing 🤝

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License 📄

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support 💬

For support, email support@sanaa.com or open an issue on GitHub.

---

**Made with ❤️ by IQLaps**
