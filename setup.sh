#!/bin/bash

# Healthcare-Educate Quick Setup Script
# This script sets up your development environment

set -e

echo "🏥 Healthcare-Educate Setup"
echo "=============================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop first."
    echo "   Visit: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "✅ Docker is installed and running"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or later."
    echo "   Visit: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) is installed"
echo ""

# Check if .env exists, if not create from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "   ⚠️  Please update JWT secrets in .env before production!"
else
    echo "✅ .env file already exists"
fi
echo ""

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Start Docker containers
echo "🐳 Starting PostgreSQL database..."
docker-compose -f docker-compose.dev.yml up -d
echo "✅ Database started"
echo ""

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client generated"
echo ""

# Push database schema
echo "📊 Pushing database schema..."
npx prisma db push --skip-generate
echo "✅ Database schema created"
echo ""

echo "=============================="
echo "🎉 Setup Complete!"
echo "=============================="
echo ""
echo "🚀 To start developing:"
echo "   npm run dev"
echo ""
echo "📊 Access pgAdmin (database UI):"
echo "   http://localhost:5050"
echo "   Email: admin@admin.com"
echo "   Password: admin"
echo ""
echo "🗄️  To view your database:"
echo "   npx prisma studio"
echo ""
echo "🛑 To stop the database:"
echo "   docker-compose -f docker-compose.dev.yml down"
echo ""
echo "Happy coding! 💻"
