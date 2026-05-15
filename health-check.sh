#!/bin/bash

# Chatty Health Check Script
# Verifies that all services are running and properly configured

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "\n${BLUE}================================${NC}"
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

# Check MongoDB
print_header "MongoDB Status"
if pgrep -x "mongod" > /dev/null; then
    print_success "MongoDB is running"
else
    print_error "MongoDB is not running"
    print_warning "Start MongoDB with: mongod"
fi

# Check if port 5001 is in use (Backend)
print_header "Backend Service (Port 5001)"
if lsof -Pi :5001 -sTCP:LISTEN -t > /dev/null 2>&1; then
    print_success "Backend is running on port 5001"
    # Try to access health endpoint
    if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
        print_success "Backend API is responsive"
    else
        print_warning "Backend is running but API may not be responding"
    fi
else
    print_error "Backend is not running on port 5001"
    print_warning "Start backend with: cd Chatty && npm run dev"
fi

# Check if port 5173 is in use (Frontend)
print_header "Frontend Service (Port 5173)"
if lsof -Pi :5173 -sTCP:LISTEN -t > /dev/null 2>&1; then
    print_success "Frontend is running on port 5173"
    if curl -s http://localhost:5173 > /dev/null 2>&1; then
        print_success "Frontend is responsive"
    else
        print_warning "Frontend is running but may not be responsive"
    fi
else
    print_error "Frontend is not running on port 5173"
    print_warning "Start frontend with: cd frontend && npm run dev"
fi

# Check Node.js
print_header "Node.js Status"
NODE_VERSION=$(node --version 2>/dev/null)
if [ $? -eq 0 ]; then
    print_success "Node.js installed: $NODE_VERSION"
else
    print_error "Node.js is not installed"
fi

# Check npm
print_header "NPM Status"
NPM_VERSION=$(npm --version 2>/dev/null)
if [ $? -eq 0 ]; then
    print_success "NPM installed: $NPM_VERSION"
else
    print_error "NPM is not installed"
fi

# Check dependencies
print_header "Dependencies Status"
if [ -d "Chatty/node_modules" ]; then
    print_success "Backend dependencies installed"
else
    print_warning "Backend dependencies not installed"
    echo "   Run: cd Chatty && npm install"
fi

if [ -d "frontend/node_modules" ]; then
    print_success "Frontend dependencies installed"
else
    print_warning "Frontend dependencies not installed"
    echo "   Run: cd frontend && npm install"
fi

# Check environment files
print_header "Environment Configuration"
if [ -f "Chatty/.env" ]; then
    print_success "Backend .env file exists"
    MONGO_URI=$(grep MONGO_URI Chatty/.env | cut -d= -f2)
    PORT=$(grep "^PORT=" Chatty/.env | cut -d= -f2)
    echo "   MongoDB URI: $MONGO_URI"
    echo "   Port: $PORT"
else
    print_error "Backend .env file not found"
fi

# Summary
print_header "Summary"
echo ""
echo "To start the application:"
echo ""
echo -e "${YELLOW}Terminal 1:${NC}"
echo "  cd Chatty"
echo "  npm run dev"
echo ""
echo -e "${YELLOW}Terminal 2:${NC}"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo -e "${YELLOW}Then open:${NC}"
echo "  http://localhost:5173"
echo ""
