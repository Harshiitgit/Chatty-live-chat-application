# Chatty - Complete Startup Guide

## Prerequisites

Before starting the application, ensure you have:
- **Node.js** (v18+ recommended)
- **MongoDB** (v7.0+ installed and running on localhost:27017)
- **npm** (comes with Node.js)

---

## ✅ Verification Checklist

### 1. Check Node.js Installation
```bash
node --version
npm --version
```

### 2. Check MongoDB Installation
```bash
mongod --version
```

### 3. Start MongoDB (if not running)
```bash
# On Linux/Mac
mongod

# Or using brew (Mac)
brew services start mongodb-community

# Or using systemctl (Linux)
sudo systemctl start mongod
```

Verify MongoDB is running:
```bash
mongo --version
```

---

## 🚀 Quick Start (Automated)

### Option 1: Using the Startup Script
```bash
cd /home/hpaney/Chatty
chmod +x startup.sh
./startup.sh
```

### Option 2: Manual Start

#### Step 1: Install Dependencies
```bash
# Backend dependencies
cd /home/hpaney/Chatty/backend
npm install

# Frontend dependencies
cd /home/hpaney/Chatty/frontend
npm install
```

#### Step 2: Seed Database (First Time Only)
```bash
cd /home/hpaney/Chatty/backend
npm run seed:all
# This creates admin user and 16 demo users
```

#### Step 3: Start Backend Server
```bash
cd /home/hpaney/Chatty/backend
npm run dev
# Server runs on http://localhost:5001
```

#### Step 4: Start Frontend (In New Terminal)
```bash
cd /home/hpaney/Chatty/frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📝 Environment Configuration

### Backend (.env file)
Located at: `/home/hpaney/Chatty/Chatty/.env`

```env
MONGO_URI=mongodb://localhost:27017/chatty
PORT=5001
NODE_ENV=development
JWT_SECRET=mysercetkey
CLOUDINARY_CLOUD_NAME=dm4bvkpeg
CLOUDINARY_API_KEY=477836967478281
CLOUDINARY_API_SECRET=wsmk-HqMNV6zk5v99gv1qzvqgUU
```

**Important**: Ensure:
- MongoDB URI is correct and MongoDB is running
- PORT is not in use (default: 5001)
- All required env vars are present

### Frontend Configuration
Frontend automatically connects to:
- API: `http://localhost:5001/api`
- WebSocket: `http://localhost:5001`

These are configured in the axios instance and socket.io client.

---

## 🔐 Default Test Credentials

### Admin Panel
- **URL**: `http://localhost:5173/admin/login`
- **Admin ID**: `admin123`
- **Password**: `admin@123`

### Regular Users
- **Email**: `emma.thompson@example.com` (or any seeded user)
- **Password**: `123456`

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Port Already in Use"
```
Error: listen EADDRINUSE: address already in use :::5001
```

**Solution**:
```bash
# Kill the process using port 5001
lsof -ti:5001 | xargs kill -9

# Or change PORT in .env
PORT=5002
```

### Issue 2: "MongoDB Connection Failed"
```
Error: MongoDB Connection Error: connect ECONNREFUSED
```

**Solution**:
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod

# Or verify connection string in .env
MONGO_URI=mongodb://localhost:27017/chatty
```

### Issue 3: "CORS Error"
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**: Backend CORS is already configured for `http://localhost:5173`
- Verify frontend is running on port 5173
- Clear browser cache/cookies
- Restart both servers

### Issue 4: "Module Not Found"
```
Error: Cannot find module 'express'
```

**Solution**:
```bash
# Reinstall dependencies
cd /home/hpaney/Chatty/Chatty
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: "WebSocket Connection Failed"
```
WebSocket connection failed: ERR_INTERNET_DISCONNECTED
```

**Solution**:
- Verify backend is running on port 5001
- Check browser console for specific errors
- Restart both frontend and backend
- Ensure CORS is configured (it is by default)

---

## 🔧 Database Management

### Reset Database (Delete All Data)
```bash
cd /home/hpaney/Chatty/Chatty

# If using MongoDB CLI
mongo
# Then in mongo shell:
# db.dropDatabase()
# exit

# Or use npm script
npm run seed:all  # This reseeds with fresh data
```

### Verify Database
```bash
cd /home/hpaney/Chatty/Chatty
npm run verify
```

### View Database Contents
```bash
mongosh

# In mongosh:
use chatty
db.users.find().pretty()
db.admins.find().pretty()
db.messages.find().pretty()
```

---

## 📊 Project Structure

```
/home/hpaney/Chatty/
├── Chatty/                    # Backend (Node.js + Express)
│   ├── src/
│   │   ├── index.js           # Server entry point
│   │   ├── lib/
│   │   │   ├── db.js          # MongoDB connection
│   │   │   ├── socket.js      # Socket.io setup
│   │   ├── models/            # Database schemas
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Route handlers
│   │   └── middleware/        # Auth middleware
│   ├── .env                   # Environment variables
│   └── package.json
│
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── main.jsx           # App entry point
│   │   ├── App.jsx            # Main component
│   │   ├── Pages/             # Page components
│   │   ├── Components/        # Reusable components
│   │   ├── Store/             # Zustand stores
│   │   ├── lib/               # Utilities
│   │   └── index.css          # Global styles
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.ts     # Tailwind CSS
│   └── package.json
│
└── .env.example               # Env template
```

---

## 🛠️ Development Workflow

### Backend Development
```bash
cd /home/hpaney/Chatty/Chatty
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd /home/hpaney/Chatty/frontend
npm run dev  # Vite dev server with HMR
```

### Building for Production
```bash
# Backend: Just run with Node
cd /home/hpaney/Chatty/Chatty
npm start

# Frontend: Build first, then serve
cd /home/hpaney/Chatty/frontend
npm run build
npm run preview
```

---

## 🧪 Testing Checklist

- [ ] MongoDB is running
- [ ] Backend starts without errors
- [ ] Frontend loads on localhost:5173
- [ ] Can access admin panel
- [ ] Can login with test credentials
- [ ] Can send messages between users
- [ ] Real-time messaging works (WebSocket)
- [ ] Admin can view all users
- [ ] Admin can delete users
- [ ] Theme switching works
- [ ] Responsive design on mobile

---

## 📞 Support & Troubleshooting

If issues persist:

1. **Check Terminal Output**: Backend and frontend show detailed errors
2. **Check Browser Console**: Frontend errors appear here
3. **Check MongoDB**: 
   ```bash
   mongo
   # In mongo shell: db.version()
   ```
4. **Clear Caches**: 
   ```bash
   # Browser: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   # Node cache:
   cd /home/hpaney/Chatty/Chatty && npm cache clean --force
   ```
5. **Restart Everything**:
   ```bash
   # Kill all Node processes
   pkill -f node
   
   # Restart MongoDB if needed
   mongod
   
   # Start backend and frontend again
   ```

---

## 📋 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/chatty` |
| `PORT` | Backend server port | `5001` |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `JWT_SECRET` | Secret for JWT tokens | `mysercetkey` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `dm4bvkpeg` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `477836967478281` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `wsmk-HqMNV6zk5v99gv1qzvqgUU` |

---

## ✨ Performance Tips

- Use Chrome DevTools for frontend debugging
- Use MongoDB Compass for database visualization
- Check network tab for API requests
- Use `console.log()` for debugging (remove in production)
- Restart after making `.env` changes

---

**Last Updated**: May 16, 2026
**Application**: Chatty v1.0
