#!/bin/bash

# Chatty Application Startup Script
# This script helps start the Chatty application with proper checks

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if Node.js is installed
print_header "Checking Node.js Installation"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js is installed: $NODE_VERSION"
else
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is installed
print_header "Checking MongoDB Installation"
if command -v mongod &> /dev/null; then
    MONGO_VERSION=$(mongod --version | head -1)
    print_success "MongoDB is installed: $MONGO_VERSION"
else
    print_error "MongoDB is not installed. Please install MongoDB first."
    exit 1
fi

# Check if MongoDB is running
print_header "Checking MongoDB Service"
if pgrep -x "mongod" > /dev/null; then
    print_success "MongoDB is running"
else
    print_warning "MongoDB is not running. Starting MongoDB..."
    # Try to start MongoDB
    if command -v brew &> /dev/null; then
        brew services start mongodb-community 2>/dev/null || true
    elif command -v systemctl &> /dev/null; then
        sudo systemctl start mongod 2>/dev/null || true
    else
        print_error "Could not auto-start MongoDB. Please start it manually:"
        echo "  mongod"
        exit 1
    fi
    sleep 2
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB started successfully"
    else
        print_error "Failed to start MongoDB. Please start it manually:"
        echo "  mongod"
        exit 1
    fi
fi

# Check if MongoDB is accessible
print_header "Verifying MongoDB Connection"
if mongo --version &> /dev/null; then
    print_success "MongoDB CLI is accessible"
else
    print_warning "MongoDB CLI (mongo/mongosh) not found in PATH"
fi

# Navigate to project root
cd "$(dirname "$0")"
PROJECT_ROOT=$(pwd)

# Check .env file
print_header "Checking Environment Configuration"
if [ -f "./backend/.env" ]; then
    print_success "Backend .env file found"
else
    print_error ".env file not found at ./backend/.env"
    print_warning "Creating .env from template..."
    if [ -f "./.env.example" ]; then
        cp ./.env.example ./backend/.env
        print_success ".env file created from template"
    else
        print_error "Could not create .env file"
        exit 1
    fi
fi

# Install backend dependencies
print_header "Installing Backend Dependencies"
cd "$PROJECT_ROOT/backend"
if [ ! -d "node_modules" ]; then
    print_warning "Backend dependencies not found. Installing..."
    npm install
    print_success "Backend dependencies installed"
else
    print_success "Backend dependencies already installed"
fi

# Install frontend dependencies
print_header "Installing Frontend Dependencies"
cd "$PROJECT_ROOT/frontend"
if [ ! -d "node_modules" ]; then
    print_warning "Frontend dependencies not found. Installing..."
    npm install
    print_success "Frontend dependencies installed"
else
    print_success "Frontend dependencies already installed"
fi

# Check if database needs seeding
print_header "Checking Database"
cd "$PROJECT_ROOT/backend"
# Try to verify database
if npm run verify 2>/dev/null | grep -q "users"; then
    print_success "Database appears to be seeded"
else
    print_warning "Database appears to be empty. Seeding database..."
    npm run seed:all
    print_success "Database seeded with demo data"
fi

# Create startup info file
print_header "Creating Startup Information"
cat > "$PROJECT_ROOT/STARTUP_INFO.txt" << EOF
Chatty Application Startup Information
Generated: $(date)

Backend Configuration:
- Port: 5001
- API URL: http://localhost:5001/api
- WebSocket: ws://localhost:5001

Frontend Configuration:
- Port: 5173
- URL: http://localhost:5173

Test Credentials:
- Admin ID: admin123
- Admin Password: admin@123
- User Email: emma.thompson@example.com
- User Password: 123456

To start the application:

Terminal 1 (Backend):
  cd $PROJECT_ROOT/Chatty
  npm run dev

Terminal 2 (Frontend):
  cd $PROJECT_ROOT/frontend
  npm run dev

Then open: http://localhost:5173

EOF

print_success "Startup information saved"

# Final summary
echo ""
print_header "Startup Summary"
print_success "All checks passed! Ready to start Chatty"
echo ""
echo "To start the application, open two terminals and run:"
echo ""
echo -e "${YELLOW}Terminal 1 (Backend):${NC}"
echo "  cd $PROJECT_ROOT/Chatty"
echo "  npm run dev"
echo ""
echo -e "${YELLOW}Terminal 2 (Frontend):${NC}"
echo "  cd $PROJECT_ROOT/frontend"
echo "  npm run dev"
echo ""
echo -e "${YELLOW}Then open in browser:${NC}"
echo "  http://localhost:5173"
echo ""
echo -e "${YELLOW}Admin Panel:${NC}"
echo "  http://localhost:5173/admin/login"
echo ""
print_success "Ready to go! Happy chatting! 🚀"
