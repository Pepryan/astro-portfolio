#!/bin/bash

# Setup script for image compression tools
# This script installs the required dependencies for image compression

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

echo "🚀 Setting up image compression tools..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Install Sharp for Node.js script
print_info "Installing Sharp library for Node.js script..."
if npm install sharp --save-dev; then
    print_status "Sharp installed successfully"
else
    print_error "Failed to install Sharp"
    echo "You can try manually: npm install sharp --save-dev"
fi

echo ""

# Check system and suggest system tools installation
print_info "Checking system tools for shell script..."

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    OS="windows"
else
    OS="unknown"
fi

case $OS in
    "linux")
        print_info "Detected Linux system"
        if command -v apt &> /dev/null; then
            echo "To install system tools, run:"
            echo "  sudo apt update"
            echo "  sudo apt install imagemagick libavif-bin webp"
        elif command -v yum &> /dev/null; then
            echo "To install system tools, run:"
            echo "  sudo yum install ImageMagick libavif webp-tools"
        elif command -v pacman &> /dev/null; then
            echo "To install system tools, run:"
            echo "  sudo pacman -S imagemagick libavif libwebp"
        else
            print_warning "Unknown package manager. Please install ImageMagick, libavif, and webp tools manually."
        fi
        ;;
    "macos")
        print_info "Detected macOS system"
        if command -v brew &> /dev/null; then
            echo "To install system tools, run:"
            echo "  brew install imagemagick libavif webp"
        else
            print_warning "Homebrew not found. Please install Homebrew first:"
            echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            echo "Then run: brew install imagemagick libavif webp"
        fi
        ;;
    "windows")
        print_info "Detected Windows system"
        print_warning "For Windows, we recommend using the Node.js script (npm run compress-images)"
        echo "If you want to use system tools, consider using WSL or install tools manually."
        ;;
    *)
        print_warning "Unknown operating system. Please install ImageMagick, libavif, and webp tools manually."
        ;;
esac

echo ""

# Make shell script executable
if [ -f "scripts/compress-images.sh" ]; then
    chmod +x scripts/compress-images.sh
    print_status "Made compress-images.sh executable"
fi

echo ""
print_status "Setup completed!"
echo ""
echo "📋 Available commands:"
echo "  npm run compress-images          # Use Node.js script (recommended)"
echo "  ./scripts/compress-images.sh     # Use shell script (requires system tools)"
echo ""
echo "📖 For more information, see scripts/README.md"
