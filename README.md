# Chatty - Real-time Messaging Application

A modern, full-stack real-time chat application built with React, Node.js, MongoDB, and Socket.io.

## 🚀 Quick Start

### Prerequisites
- Node.js (v20+)
- MongoDB (running locally or connection URI)
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

3. **Configure Environment**
```bash
# Backend
cd ../backend
cp ../.env.example .env
# Edit .env with your MongoDB URI and other config

# Frontend (optional, already configured for localhost)
# Check frontend/.env.development
```

### Running the Application

**Terminal 1 - MongoDB:**
```bash
mongod --dbpath /path/to/chatty/database/mongodb_data
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
Chatty/
├── backend/                   # Backend API
│   ├── src/
│   │   ├── index.js           # Express server entry point
│   │   ├── controllers/       # API controllers
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Express middleware
│   │   ├── lib/               # Utilities (socket, cloudinary, utils)
│   │   └── database/          # Database-related files
│   │       ├── config/        # Database connection
│   │       ├── models/        # Mongoose schemas
│   │       └── seeds/         # Database seeding scripts
│   ├── package.json
│   └── .env                   # Backend environment variables
│
├── frontend/                  # Frontend UI
│   ├── src/
│   │   ├── App.jsx            # Main app component
│   │   ├── Pages/             # Page components (10 pages)
│   │   ├── Components/        # Reusable UI components
│   │   ├── Store/             # Zustand state management
│   │   └── lib/               # Utilities (axios, etc.)
│   ├── package.json
│   └── vite.config.js
│
├── database/                  # Database files
│   └── mongodb_data/          # MongoDB data directory
│
├── Documentation/             # Project documentation
│   ├── README.md              # This file
│   ├── COMPLETE_INTEGRATION_REPORT.md
│   ├── STARTUP_GUIDE.md
│   ├── PROJECT_STABILITY_GUIDE.md
│   └── QUICK_REFERENCE.md
│
├── Scripts/                   # Utility scripts
│   ├── startup.sh             # Auto-start script
│   └── health-check.sh        # Service verification
│
└── Configuration/             # Config files
    ├── .env.example           # Environment template
    └── .gitignore             # Git configuration
```

## 🎯 Features

- ✅ **Real-time Messaging** - Socket.io powered instant messaging
- ✅ **User Authentication** - Secure signup/login with JWT
- ✅ **Friend System** - Send/accept/reject friend requests
- ✅ **User Discovery** - Find and connect with other users
- ✅ **Online Status** - See who's online in real-time
- ✅ **Admin Portal** - User management and platform status
- ✅ **Modern UI** - Tailwind CSS with DaisyUI components
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Dark Mode** - Theme toggle support

## 🔐 Security Features

- Password hashing with bcrypt
- JWT authentication with httpOnly cookies
- Protected API endpoints with middleware
- Email validation (RFC 5322)
- Username validation (3-20 characters)
- CORS configured properly
- Admin access restriction

## 📚 Documentation

- **[COMPLETE_INTEGRATION_REPORT.md](COMPLETE_INTEGRATION_REPORT.md)** - Full integration details and API documentation
- **[STARTUP_GUIDE.md](STARTUP_GUIDE.md)** - Detailed startup instructions
- **[PROJECT_STABILITY_GUIDE.md](PROJECT_STABILITY_GUIDE.md)** - Troubleshooting and maintenance guide
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick command reference

## 🧪 Useful Commands

### Backend
```bash
# Development
npm run dev

# Production
npm start

# Database operations
npm run seed:all    # Seed all data
npm run clean       # Clean database
npm run verify      # Verify database
```

### Frontend
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

### Project Utils
```bash
# Health check (verify all services)
bash health-check.sh

# Quick startup
bash startup.sh
```

## 🔧 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io
- **Authentication**: JWT with bcrypt
- **File Upload**: Cloudinary
- **Validation**: RFC 5322 (Email), Custom (Username)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS + DaisyUI
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Real-time**: Socket.io Client

## 🚀 Deployment

### For Production:
1. Set `NODE_ENV=production` in backend `.env`
2. Update MongoDB URI to production instance
3. Generate strong `JWT_SECRET`
4. Build frontend: `npm run build`
5. Use production-ready server (Nginx, PM2, etc.)
6. Enable HTTPS
7. Update CORS origins for production domain

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Verify authentication

### Messages
- `GET /api/messages/users` - Get contacts
- `POST /api/messages/send/:id` - Send message
- `GET /api/messages/:id` - Get conversation
- `GET /api/messages/search` - Search users

### Friends
- `POST /api/friends/send` - Send friend request
- `GET /api/friends/pending` - Get pending requests
- `POST /api/friends/accept` - Accept request
- `POST /api/friends/reject` - Reject request
- `GET /api/friends/list` - Get friends list

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/dashboard/stats` - Dashboard stats

## 🆘 Troubleshooting

Refer to [PROJECT_STABILITY_GUIDE.md](PROJECT_STABILITY_GUIDE.md) for troubleshooting common issues.

## 📝 License

ISC

## 👨‍💻 Author

Created with ❤️ using modern web technologies

---

**Happy chatting!** 💬

