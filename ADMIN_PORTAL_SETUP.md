# Chatty Admin Portal - Complete Setup Guide

## Overview
A fully functional admin control panel has been integrated into the Chatty project, allowing administrators to manage users and monitor platform statistics.

## Admin Credentials
- **Admin ID**: `admin123`
- **Password**: `admin@123`

## Admin Portal Access
- **URL**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin/dashboard`

---

## Backend Implementation

### 1. Admin Model (`src/models/admin.model.js`)
- Stores admin credentials (adminId, password, email, role)
- Includes timestamps for audit tracking

### 2. Admin Authentication
**File**: `src/controllers/admin.controller.js`
- `adminLogin()` - Authenticate admin with adminId and password
- `adminLogout()` - Logout admin
- `checkAdminAuth()` - Verify admin session

**Middleware**: `src/middleware/adminAuth.middleware.js`
- `protectAdminRouter()` - Protect admin routes with JWT verification

### 3. User Management Endpoints
**File**: `src/controllers/admin.controller.js`
- `getAllUsers()` - Retrieve all registered users
- `deleteUser(userId)` - Delete a specific user
- `getDashboardStats()` - Get platform statistics

### 4. Admin Routes
**File**: `src/routes/admin.route.js`
```
POST   /api/admin/login              - Admin login
POST   /api/admin/logout             - Admin logout
GET    /api/admin/check              - Check admin auth (protected)
GET    /api/admin/users              - Get all users (protected)
DELETE /api/admin/users/:userId      - Delete user (protected)
GET    /api/admin/dashboard/stats    - Get dashboard stats (protected)
```

### 5. Database Seeding
**File**: `src/seeds/admin.seed.js`
- Automatically seeds default admin account
- Run with: `node src/seeds/admin.seed.js`

---

## Frontend Implementation

### 1. Admin Auth Store
**File**: `src/Store/useAdminStore.js`
- Zustand store for managing admin authentication state
- Methods:
  - `checkAdminAuth()` - Verify admin session
  - `adminLogin()` - Authenticate admin
  - `adminLogout()` - Logout admin
  - `getAllUsers()` - Fetch all users
  - `deleteUser()` - Delete a user
  - `getDashboardStats()` - Fetch platform stats

### 2. Admin Pages

#### Admin Login Page
**File**: `src/Pages/AdminLoginPage.jsx`
- Beautiful login interface with admin credentials display
- Form validation
- Secure password input with show/hide toggle

#### Admin Dashboard
**File**: `src/Pages/AdminDashboardPage.jsx`
- **Dashboard Statistics**:
  - Total Users count
  - Platform status indicator

- **User Management**:
  - Complete user table with all user information
  - Search functionality (by email or name)
  - Delete user with confirmation dialog
  - User join date tracking

- **Admin Navigation**:
  - Admin ID display
  - Logout button
  - Real-time updates

### 3. Updated Navigation
**File**: `src/Components/Navbar.jsx`
- Added Admin link to navbar
- Admin link only visible when not logged in as user or admin

### 4. Updated Routing
**File**: `src/App.jsx`
- Added admin routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (protected)
- Auto-redirects based on auth state

---

## Key Features

### ✅ Admin Authentication
- Secure login with admin credentials
- JWT token-based session management
- Protected routes
- Persistent sessions with 7-day expiration

### ✅ User Management
- View all registered users
- Display user information:
  - Full name
  - Email address
  - Account creation date
  - Profile picture (when available)
- Search users by email or name
- Delete users with confirmation

### ✅ Platform Monitoring
- Total user count
- Platform status indicator
- Real-time statistics

### ✅ Security Features
- Password hashing with bcryptjs
- JWT token verification
- Protected admin middleware
- Secure cookie storage
- CSRF protection

---

## Database Collections

### Admin Collection
```javascript
{
  _id: ObjectId,
  adminId: String (unique),
  password: String (hashed),
  email: String (unique),
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  fullName: String,
  password: String (hashed),
  profilePic: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Testing the Admin Portal

1. **Access Admin Login**:
   ```
   URL: http://localhost:5173/admin/login
   ```

2. **Login with Demo Credentials**:
   ```
   Admin ID: admin123
   Password: admin@123
   ```

3. **View Dashboard**:
   - See total user count
   - View all registered users in table format
   - Search for specific users

4. **Manage Users**:
   - Click Delete button to remove a user
   - Confirm deletion when prompted
   - User list updates automatically

---

## API Testing with cURL

### Admin Login
```bash
curl -X POST http://localhost:50001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"adminId":"admin123","password":"admin@123"}' \
  -c cookies.txt
```

### Get All Users
```bash
curl -X GET http://localhost:50001/api/admin/users \
  -b cookies.txt
```

### Delete User
```bash
curl -X DELETE http://localhost:50001/api/admin/users/{userId} \
  -b cookies.txt
```

### Get Dashboard Stats
```bash
curl -X GET http://localhost:50001/api/admin/dashboard/stats \
  -b cookies.txt
```

---

## Future Enhancement Opportunities

1. **Admin Profile Management**
   - Change admin password
   - Update admin email

2. **Advanced Statistics**
   - Active users count
   - Messages sent count
   - User registration trends
   - Last login tracking

3. **User Details View**
   - View user profile information
   - See user's messages/conversations
   - Account activity logs

4. **Batch Operations**
   - Bulk delete users
   - Export user data
   - Generate reports

5. **Admin Activity Logs**
   - Track admin actions
   - Audit trail for user deletions
   - System event logging

6. **Multi-Admin Support**
   - Multiple admin accounts
   - Admin role permissions
   - Activity delegation

---

## Installation & Setup

### Backend Setup
1. Admin routes are already integrated in `src/index.js`
2. Seed default admin:
   ```bash
   cd /home/hpaney/Chatty/Chatty
   node src/seeds/admin.seed.js
   ```

### Frontend Setup
1. All admin components are created
2. Routes are configured in `App.jsx`
3. Start the frontend:
   ```bash
   cd /home/hpaney/Chatty/frontend
   npm run dev
   ```

### Accessing the Portal
1. Open browser: `http://localhost:5173`
2. Click "Admin" button in navbar or navigate to `/admin/login`
3. Enter credentials: `admin123` / `admin@123`
4. Manage users from the dashboard

---

## Support & Troubleshooting

### Admin Login Not Working
- Ensure MongoDB is running
- Verify admin was seeded: `node src/seeds/admin.seed.js`
- Check backend server is running on port 50001

### Users Not Showing
- Create a regular user account first via signup
- Refresh admin dashboard
- Check browser console for errors

### Delete User Not Working
- Ensure you're logged in as admin
- Check admin JWT token in cookies
- Verify user ID is valid

---

## Files Created/Modified

### Created Files
- `src/models/admin.model.js`
- `src/controllers/admin.controller.js`
- `src/middleware/adminAuth.middleware.js`
- `src/routes/admin.route.js`
- `src/seeds/admin.seed.js`
- `src/Store/useAdminStore.js`
- `src/Pages/AdminLoginPage.jsx`
- `src/Pages/AdminDashboardPage.jsx`

### Modified Files
- `src/index.js` - Added admin routes
- `src/App.jsx` - Added admin routes and store initialization
- `src/Components/Navbar.jsx` - Added admin link

---

## Version Information
- **Node.js**: v18+
- **MongoDB**: v5.0+
- **React**: v18.3.1
- **Express**: v4.21.2
- **Socket.io**: v4.8.1
- **JWT**: jsonwebtoken v9.0.2
- **Bcryptjs**: v3.0.2

---

**Admin Portal Setup Complete!** 🎉

The admin portal is now fully functional and ready to use. Administrators can log in, view all users, search for specific users, and delete accounts as needed.
