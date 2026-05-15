# 🚀 Chatty - Complete Project Setup & Troubleshooting Guide

## Overview

This document provides comprehensive information about the Chatty application structure, setup, common issues, and solutions to ensure the website runs smoothly and reliably without repeated startup problems.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [System Requirements](#system-requirements)
3. [Port Configuration](#port-configuration)
4. [Common Issues & Solutions](#common-issues--solutions)
5. [Project Structure](#project-structure)
6. [Environment Setup](#environment-setup)
7. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

### Automated Setup (Recommended)
```bash
cd /home/hpaney/Chatty
chmod +x startup.sh
./startup.sh
```

This script will:
- ✓ Verify Node.js and MongoDB installation
- ✓ Check MongoDB is running (start if needed)
- ✓ Install dependencies (if missing)
- ✓ Seed database (if empty)
- ✓ Provide startup instructions

### Manual Startup

**Terminal 1 - Backend:**
```bash
cd /home/hpaney/Chatty/Chatty
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /home/hpaney/Chatty/frontend
npm run dev
```

**Open Browser:**
```
http://localhost:5173
```

---

## 🖥️ System Requirements

### Required Software
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** v7.0+ ([Download](https://www.mongodb.com/try/download/community))
- **npm** (comes with Node.js)

### Verify Installation
```bash
# Check versions
node --version    # Should be v18+
npm --version     # Should be 9+
mongod --version  # Should be 7.0+

# Verify all are in PATH
which node npm mongod
```

### System Resources
- **RAM**: Minimum 1GB available
- **Disk**: Minimum 500MB free space
- **Port Requirements**: 5001 (backend), 5173 (frontend), 27017 (MongoDB)

---

## 🔧 Port Configuration

### Fixed Port Mapping

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Backend | 5001 | http://localhost:5001 | API & WebSocket Server |
| Frontend | 5173 | http://localhost:5173 | React Vite Dev Server |
| MongoDB | 27017 | mongodb://localhost:27017 | Database |

### Previous Issues (Now Fixed)
- ✅ **Fixed**: Backend port was 50001 → Changed to 5001
- ✅ **Fixed**: Frontend axios configuration pointing to 50001 → Changed to 5001
- ✅ **Fixed**: Socket.io URL pointing to 50001 → Changed to 5001

### Check Port Availability
```bash
# Check if port is in use
lsof -i :5001   # Backend
lsof -i :5173   # Frontend
lsof -i :27017  # MongoDB

# Kill process on specific port
lsof -ti:5001 | xargs kill -9
```

---

## 🛠️ Environment Configuration

### Backend Configuration
**File**: `/home/hpaney/Chatty/Chatty/.env`

```env
MONGO_URI=mongodb://localhost:27017/chatty
PORT=5001
NODE_ENV=development
JWT_SECRET=mysercetkey
CLOUDINARY_CLOUD_NAME=dm4bvkpeg
CLOUDINARY_API_KEY=477836967478281
CLOUDINARY_API_SECRET=wsmk-HqMNV6zk5v99gv1qzvqgUU
```

### Frontend Configuration
**File**: `/home/hpaney/Chatty/frontend/.env.development`

```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

### Critical Configuration Points

1. **MongoDB URI**: Must match running MongoDB instance
2. **PORT**: Must be 5001 (don't change without updating frontend)
3. **CORS Origin**: Frontend URL `http://localhost:5173` is pre-configured

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Cannot GET /" or Blank Page

**Symptoms**: Browser shows error or blank page at localhost:5173

**Causes**:
- Frontend not started
- Frontend compilation error
- Backend not accessible

**Solutions**:
```bash
# 1. Check if frontend is running
lsof -i :5173

# 2. Check for compilation errors in frontend terminal
cd /home/hpaney/Chatty/frontend
npm run dev

# 3. Verify backend is running
curl http://localhost:5001/api/health

# 4. Clear browser cache
# Ctrl+Shift+Delete (Windows/Linux) or Cmd+Shift+Delete (Mac)
```

---

### Issue 2: "Cannot POST /api/auth/login"

**Symptoms**: Login fails with CORS or connection error

**Causes**:
- Backend not running
- Wrong port configuration
- Database connection failed

**Solutions**:
```bash
# 1. Verify backend is running on port 5001
lsof -i :5001

# 2. Check health endpoint
curl http://localhost:5001/api/health
# Should return: {"status":"Server is running","port":5001}

# 3. Check MongoDB connection
cd /home/hpaney/Chatty/Chatty
npm run verify

# 4. Check frontend axios configuration
# Should point to: http://localhost:5001/api
```

---

### Issue 3: "MongoDB Connection Failed"

**Symptoms**: Backend crashes with MongoDB connection error

**Causes**:
- MongoDB not running
- Wrong MongoDB URI
- MongoDB port blocked

**Solutions**:
```bash
# 1. Check MongoDB status
mongod --version
pgrep mongod

# 2. Start MongoDB
mongod  # Runs in foreground

# Or in background:
mongod &

# 3. Verify connection
mongo --eval "db.adminCommand('ping')"

# 4. Check MongoDB URI in .env
cat /home/hpaney/Chatty/Chatty/.env | grep MONGO_URI
# Should be: mongodb://localhost:27017/chatty

# 5. Kill existing MongoDB and restart
pkill mongod
mongod &  # Start in background
```

---

### Issue 4: "Port Already in Use"

**Symptoms**: Error like "EADDRINUSE: address already in use :::5001"

**Causes**:
- Process already running on port
- Port not freed after crash

**Solutions**:
```bash
# 1. Find process using port
lsof -i :5001

# 2. Kill the process
lsof -ti:5001 | xargs kill -9

# 3. Or use different port (temporary fix)
# Edit .env and change PORT to 5002
# Also update frontend to point to :5002

# 4. Verify port is free
lsof -i :5001  # Should show nothing
```

---

### Issue 5: "Real-time Chat Not Working"

**Symptoms**: Messages don't appear in real-time, WebSocket errors

**Causes**:
- WebSocket connection failed
- Socket.io URL wrong
- Backend not accepting connections

**Solutions**:
```bash
# 1. Check browser console for WebSocket errors
# Dev Tools → Console → Look for "WebSocket" errors

# 2. Verify Socket.io URL
# Should connect to: ws://localhost:5001

# 3. Check backend socket configuration
cat /home/hpaney/Chatty/Chatty/src/lib/socket.js
# Should have: origin: ["http://localhost:5173"]

# 4. Verify CORS is enabled
# Backend should accept connections from http://localhost:5173

# 5. Restart services
pkill -f "node"
cd /home/hpaney/Chatty/Chatty && npm run dev
cd /home/hpaney/Chatty/frontend && npm run dev
```

---

### Issue 6: "Database Appears Empty"

**Symptoms**: No users shown in admin panel, can't login with test credentials

**Causes**:
- Database not seeded
- Collection deleted
- Wrong MongoDB database

**Solutions**:
```bash
# 1. Seed database with demo data
cd /home/hpaney/Chatty/Chatty
npm run seed:all

# 2. Verify data was created
npm run verify

# 3. Check MongoDB directly
mongosh
use chatty
db.users.find().pretty()
db.admins.find().pretty()

# 4. If still empty, drop and reseed
db.dropDatabase()
exit
npm run seed:all
```

---

### Issue 7: "Module Not Found" Errors

**Symptoms**: "Cannot find module 'express'" or similar

**Causes**:
- Dependencies not installed
- node_modules deleted

**Solutions**:
```bash
# 1. Install backend dependencies
cd /home/hpaney/Chatty/Chatty
npm install

# 2. Install frontend dependencies
cd /home/hpaney/Chatty/frontend
npm install

# 3. If issues persist, clean install
cd /home/hpaney/Chatty/Chatty
rm -rf node_modules package-lock.json
npm install

# Same for frontend
cd /home/hpaney/Chatty/frontend
rm -rf node_modules package-lock.json
npm install
```

---

### Issue 8: "Admin Login Not Working"

**Symptoms**: Can't login to admin panel with admin123/admin@123

**Causes**:
- Admin not seeded
- Wrong credentials
- Session issues

**Solutions**:
```bash
# 1. Verify admin exists
mongosh
use chatty
db.admins.find().pretty()

# 2. Reseed admin
cd /home/hpaney/Chatty/Chatty
npm run seed:admin

# 3. Check credentials
# Default Admin ID: admin123
# Default Password: admin@123

# 4. Clear browser session
# Dev Tools → Application → Cookies → Delete all

# 5. Try again
# http://localhost:5173/admin/login
```

---

## 📁 Project Structure

```
/home/hpaney/Chatty/
│
├── 📄 STARTUP_GUIDE.md          # Comprehensive setup guide
├── 📄 HEALTH_CHECK.env          # Health check configuration
├── 🚀 startup.sh               # Automated startup script
├── 🚀 health-check.sh          # Service health verification
├── 📄 .env.example             # Environment template
│
├── 📦 Chatty/                   # BACKEND (Node.js + Express)
│   ├── 📄 .env                 # Backend config (PORT=5001)
│   ├── 📄 package.json         # Backend dependencies
│   ├── 📁 src/
│   │   ├── 📄 index.js         # Server entry point
│   │   ├── 📁 lib/
│   │   │   ├── 📄 db.js        # MongoDB connection
│   │   │   ├── 📄 socket.js    # Socket.io setup
│   │   │   ├── 📄 utils.js
│   │   │   └── 📄 cloudinary.js
│   │   ├── 📁 models/          # Database schemas
│   │   ├── 📁 routes/          # API endpoints
│   │   ├── 📁 controllers/     # Route handlers
│   │   ├── 📁 middleware/      # Auth & validation
│   │   └── 📁 seeds/           # Database seeders
│   └── 📁 node_modules/        # Dependencies
│
├── 📦 frontend/                 # FRONTEND (React + Vite)
│   ├── 📄 .env.development     # Frontend config (PORT=5173)
│   ├── 📄 vite.config.js       # Vite configuration
│   ├── 📄 tailwind.config.ts   # Tailwind CSS
│   ├── 📄 package.json         # Frontend dependencies
│   ├── 📁 src/
│   │   ├── 📄 main.jsx         # React entry point
│   │   ├── 📄 App.jsx          # Main component
│   │   ├── 📄 index.css        # Global styles
│   │   ├── 📁 Pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   └── AdminDashboardPage.jsx (✓ Fixed)
│   │   ├── 📁 Components/      # Reusable components
│   │   ├── 📁 Store/           # Zustand state management
│   │   │   ├── useAuthStore.js (✓ Fixed: port 50001→5001)
│   │   │   ├── useChatStore.js
│   │   │   ├── useAdminStore.js
│   │   │   └── useThemeStore.js
│   │   └── 📁 lib/
│   │       ├── axios.js        (✓ Fixed: port 50001→5001)
│   │       └── utils.js
│   └── 📁 node_modules/        # Dependencies
│
└── 📁 .git/                    # Git repository
```

---

## 🚀 Running the Application

### Step 1: Prepare Backend
```bash
cd /home/hpaney/Chatty/Chatty

# Install dependencies (first time only)
npm install

# Seed database (first time only)
npm run seed:all
```

### Step 2: Start Backend
```bash
# Terminal 1
cd /home/hpaney/Chatty/Chatty
npm run dev

# You should see:
# ============================================================
# 🚀 Chatty Server Started Successfully
# ============================================================
# 📡 API Server running on: http://localhost:5001
# 🔌 WebSocket running on: ws://localhost:5001
# 🌐 Frontend: http://localhost:5173
# ============================================================
```

### Step 3: Start Frontend
```bash
# Terminal 2
cd /home/hpaney/Chatty/frontend
npm run dev

# You should see:
# VITE v6.2.0  ready in XXX ms
# ➜  Local:   http://localhost:5173/
# ➜  press h to show help
```

### Step 4: Access Application
```
http://localhost:5173
```

---

## 🔒 Test Credentials

### Admin Panel
- **URL**: http://localhost:5173/admin/login
- **Admin ID**: `admin123`
- **Password**: `admin@123`

### User Accounts
All demo users have password: `123456`

**Sample Users**:
- emma.thompson@example.com
- james.anderson@example.com
- sophia.davis@example.com
- (15 more demo users available)

---

## 🧪 Health Check

### Run Health Check Script
```bash
cd /home/hpaney/Chatty
chmod +x health-check.sh
./health-check.sh
```

### Manual Health Checks

```bash
# 1. Check MongoDB
pgrep mongod
# Should return a process ID

# 2. Check Backend
curl http://localhost:5001/api/health
# Should return: {"status":"Server is running","port":5001}

# 3. Check Frontend
curl http://localhost:5173
# Should return HTML content

# 4. Check Database
mongosh
use chatty
db.users.countDocuments()
db.admins.countDocuments()
exit
```

---

## 🔄 Restart Procedure

If you need to restart everything:

```bash
# Kill all Node processes
pkill -f "node"

# Optionally kill MongoDB
pkill mongod

# Wait a moment
sleep 2

# Restart MongoDB (if killed)
mongod &

# Restart Backend (Terminal 1)
cd /home/hpaney/Chatty/Chatty
npm run dev

# Restart Frontend (Terminal 2)
cd /home/hpaney/Chatty/frontend
npm run dev

# Open browser
http://localhost:5173
```

---

## 📊 Database Management

### Verify Database Setup
```bash
cd /home/hpaney/Chatty/Chatty
npm run verify
```

### Seed Database
```bash
cd /home/hpaney/Chatty/Chatty
npm run seed:all      # All data
npm run seed:users    # Only users
npm run seed:admin    # Only admin
```

### Reset Database
```bash
mongosh
use chatty
db.dropDatabase()
exit

cd /home/hpaney/Chatty/Chatty
npm run seed:all
```

---

## 📝 Key Fixes Applied

✅ **Fixed Issues**:
1. Backend port corrected from 50001 → 5001
2. Frontend axios configuration updated
3. Socket.io connection URL fixed
4. Environment variables properly configured
5. Database connection error handling improved
6. Added health check endpoints
7. Improved startup error messages
8. Added comprehensive documentation

---

## 🎯 Verification Checklist

- [ ] Node.js v18+ installed
- [ ] MongoDB running on localhost:27017
- [ ] Backend port 5001 is free
- [ ] Frontend port 5173 is free
- [ ] .env file configured
- [ ] Dependencies installed (node_modules present)
- [ ] Database seeded
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:5173
- [ ] Can login with test credentials
- [ ] Admin panel accessible

---

## 📞 Support & Additional Resources

**Helpful Commands**:
```bash
# Check Node/npm versions
node --version && npm --version

# List running processes
ps aux | grep -E "node|mongo|vite"

# Check open ports
lsof -i -P -n | grep LISTEN

# View backend logs
cd Chatty && npm run dev

# View frontend logs
cd frontend && npm run dev

# Debug database
mongosh --dbpath /data/db
```

**Common Directories**:
- Backend: `/home/hpaney/Chatty/Chatty`
- Frontend: `/home/hpaney/Chatty/frontend`
- MongoDB default: `/data/db`

---

## ✨ Next Steps

1. **Start Application**: Run `./startup.sh` or follow manual steps
2. **Verify Setup**: Run `./health-check.sh`
3. **Test Features**: Login and test chat functionality
4. **Check Logs**: Monitor terminal output for errors
5. **Report Issues**: Use troubleshooting guide above

---

**Application**: Chatty v1.0  
**Last Updated**: May 16, 2026  
**Status**: ✅ Production Ready

