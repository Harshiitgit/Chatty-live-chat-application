# 🚀 Chatty - Quick Reference Card

## Start Application (2 Minutes)

### Option 1: Automated (Recommended)
```bash
cd /home/hpaney/Chatty
chmod +x startup.sh
./startup.sh
```

### Option 2: Manual
```bash
# Terminal 1 - Backend
cd /home/hpaney/Chatty/Chatty && npm run dev

# Terminal 2 - Frontend
cd /home/hpaney/Chatty/frontend && npm run dev

# Browser
http://localhost:5173
```

---

## 🔑 Test Credentials

| Role | ID/Email | Password |
|------|----------|----------|
| Admin | admin123 | admin@123 |
| User | emma.thompson@example.com | 123456 |

---

## 🔧 Services & Ports

| Service | Port | URL |
|---------|------|-----|
| Backend | 5001 | http://localhost:5001 |
| Frontend | 5173 | http://localhost:5173 |
| MongoDB | 27017 | localhost:27017 |

---

## ✅ System Check

```bash
cd /home/hpaney/Chatty
./health-check.sh
```

---

## ⚠️ Quick Troubleshooting

### App shows blank page?
```bash
# Check MongoDB
mongod

# Check backend
curl http://localhost:5001/api/health

# Clear browser cache: Ctrl+Shift+Delete
```

### "Port already in use"?
```bash
lsof -ti:5001 | xargs kill -9
npm run dev  # Try again
```

### Can't connect to backend?
```bash
# Verify port is correct
cat Chatty/.env | grep PORT

# Verify backend is running
lsof -i :5001
```

### Database empty?
```bash
cd Chatty && npm run seed:all
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `STARTUP_GUIDE.md` | Complete setup guide |
| `PROJECT_STABILITY_GUIDE.md` | Troubleshooting & fixes |
| `IMPLEMENTATION_STATUS_REPORT.md` | What was fixed |
| `startup.sh` | Automated startup |
| `health-check.sh` | Service verification |

---

## 🔄 Restart Everything

```bash
pkill -f "node"  # Kill all Node processes
./startup.sh     # Start everything
```

---

## 📊 What Was Fixed

✅ Port configuration (50001 → 5001)  
✅ Frontend API connection  
✅ WebSocket configuration  
✅ CSS compilation errors  
✅ Error handling & logging  
✅ Environment configuration  

---

## 🎯 Status: STABLE ✅

**The website now:**
- ✅ Starts reliably every time
- ✅ Connects frontend to backend successfully
- ✅ Has real-time messaging
- ✅ Handles errors gracefully
- ✅ Provides clear error messages

---

**Need Help?** See `PROJECT_STABILITY_GUIDE.md`
