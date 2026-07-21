# Sanaa - E-commerce Platform

## Project Information

**Sanaa** (صنعة) is a modern e-commerce platform designed specifically for industrial electronic products. Built with React, Node.js/Express, and PostgreSQL.

## Quick Start

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
   npm install
   ```

3. **Setup environment files**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. **Configure database**
   - Edit `backend/.env` with your PostgreSQL credentials
   - The database will be created automatically on first run

5. **Run development servers**
   ```bash
   npm run dev
   ```

   This will start both backend (http://localhost:5000) and frontend (http://localhost:5173)

### Available Commands

```bash
# Development
npm run dev                 # Run both servers
npm run dev:backend       # Backend only
npm run dev:frontend      # Frontend only

# Production
npm run build             # Build both
npm run build:backend     # Backend only
npm run build:frontend    # Frontend only

# Testing & Linting
npm run test             # Run all tests
npm run lint             # Lint all code
npm run lint:backend     # Backend linting
npm run lint:frontend    # Frontend linting
```

## Docker Support

### Using Docker Compose

```bash
docker-compose up --build
```

This will start:
- PostgreSQL (port 5432)
- Backend API (port 5000)
- Frontend (port 5173)

## Project Structure

```
Sanaa/
├── frontend/              # React application
│   ├── src/
│   │   ├── api/          # API client configuration
│   │   ├── pages/        # Route pages
│   │   ├── components/   # React components
│   │   ├── store/        # Zustand state management
│   │   └── App.tsx       # Main component
│   └── package.json
├── backend/              # Express server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── db/          # Database configuration
│   │   └── index.ts      # Server entry point
│   └── package.json
├── docker-compose.yml    # Docker configuration
├── docs/
│   └── API.md           # API documentation
└── README.md
```

## Features

- ✅ User Authentication (Register/Login)
- ✅ Product Browsing & Search
- ✅ Shopping Cart Management
- ✅ Order Management
- ✅ User Profile Management
- ✅ Category System
- ✅ Responsive Design
- ✅ PostgreSQL Database
- ✅ RESTful API
- ✅ Docker Support

## Technology Stack

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State Management
- **Axios** - HTTP Client
- **Vite** - Build Tool

### Backend
- **Node.js** - Runtime
- **Express** - Web Framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **TypeScript** - Type Safety

## API Documentation

See [docs/API.md](docs/API.md) for complete API documentation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Support

For support, email support@sanaa.com or open an issue on GitHub.

## Roadmap

- [ ] Payment Gateway Integration (Stripe)
- [ ] Admin Dashboard
- [ ] Product Reviews & Ratings
- [ ] Wishlist Feature
- [ ] Inventory Management
- [ ] Email Notifications
- [ ] Multi-language Support
- [ ] Analytics Dashboard

---

Made with ❤️ by IQLaps
