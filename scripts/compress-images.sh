#!/bin/bash

# Image Compression Script (Shell Version)
# 
# This script compresses images in public/images to modern formats (WebP/AVIF)
# and moves original images to a backup folder outside git tracking.
# 
# Requirements: ImageMagick or cwebp/avifenc tools
# Usage: ./scripts/compress-images.sh

set -e

# Configuration
SOURCE_DIR="public/images"
BACKUP_DIR="images-original"
WEBP_QUALITY=85
AVIF_QUALITY=80

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Statistics
PROCESSED=0
SKIPPED=0
ERRORS=0

# Function to print colored output
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

# Check if required tools are available
check_dependencies() {
    local missing_tools=()
    
    if ! command -v cwebp &> /dev/null && ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
        missing_tools+=("WebP converter (cwebp or ImageMagick)")
    fi
    
    if ! command -v avifenc &> /dev/null && ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
        missing_tools+=("AVIF converter (avifenc or ImageMagick)")
    fi
    
    if [ ${#missing_tools[@]} -gt 0 ]; then
        print_error "Missing required tools:"
        for tool in "${missing_tools[@]}"; do
            echo "  - $tool"
        done
        echo ""
        echo "Install options:"
        echo "  Ubuntu/Debian: sudo apt install imagemagick libavif-bin webp"
        echo "  macOS: brew install imagemagick libavif webp"
        echo "  Or use the Node.js version: npm run compress-images"
        exit 1
    fi
}

# Create backup directory
create_backup_dir() {
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
        print_status "Created backup directory: $BACKUP_DIR"
    fi
}

# Update .gitignore
update_gitignore() {
    if [ -f ".gitignore" ]; then
        if ! grep -q "images-original/" .gitignore; then
            echo "" >> .gitignore
            echo "# Original images backup" >> .gitignore
            echo "images-original/" >> .gitignore
            print_status "Updated .gitignore to exclude backup folder"
        fi
    fi
}

# Convert image to WebP
convert_to_webp() {
    local input="$1"
    local output="$2"
    
    if command -v cwebp &> /dev/null; then
        cwebp -q $WEBP_QUALITY "$input" -o "$output" &> /dev/null
    elif command -v magick &> /dev/null; then
        magick "$input" -quality $WEBP_QUALITY "$output" &> /dev/null
    elif command -v convert &> /dev/null; then
        convert "$input" -quality $WEBP_QUALITY "$output" &> /dev/null
    else
        return 1
    fi
}

# Convert image to AVIF
convert_to_avif() {
    local input="$1"
    local output="$2"
    
    if command -v avifenc &> /dev/null; then
        avifenc -q $AVIF_QUALITY "$input" "$output" &> /dev/null
    elif command -v magick &> /dev/null; then
        magick "$input" -quality $AVIF_QUALITY "$output" &> /dev/null
    elif command -v convert &> /dev/null; then
        convert "$input" -quality $AVIF_QUALITY "$output" &> /dev/null
    else
        return 1
    fi
}

# Process a single image
process_image() {
    local file="$1"
    local relative_path="${file#$SOURCE_DIR/}"
    local dir_name=$(dirname "$relative_path")
    local base_name=$(basename "$file" | sed 's/\.[^.]*$//')
    local ext="${file##*.}"
    
    # Skip non-image files
    case "${ext,,}" in
        png|jpg|jpeg) ;;
        svg|gif) 
            print_info "Skipping $relative_path (${ext} format)"
            ((SKIPPED++))
            return 0
            ;;
        *) 
            ((SKIPPED++))
            return 0
            ;;
    esac
    
    echo "🔄 Processing $relative_path..."
    
    # Create backup directory structure
    local backup_dir="$BACKUP_DIR/$dir_name"
    mkdir -p "$backup_dir"
    
    # Copy original to backup
    cp "$file" "$backup_dir/"
    
    # Generate output paths
    local output_dir="$SOURCE_DIR/$dir_name"
    local webp_output="$output_dir/${base_name}.webp"
    local avif_output="$output_dir/${base_name}.avif"
    
    # Convert to WebP
    if convert_to_webp "$file" "$webp_output"; then
        local webp_size=$(stat -f%z "$webp_output" 2>/dev/null || stat -c%s "$webp_output" 2>/dev/null || echo "0")
    else
        print_error "Failed to convert $relative_path to WebP"
        ((ERRORS++))
        return 1
    fi
    
    # Convert to AVIF
    if convert_to_avif "$file" "$avif_output"; then
        local avif_size=$(stat -f%z "$avif_output" 2>/dev/null || stat -c%s "$avif_output" 2>/dev/null || echo "0")
    else
        print_error "Failed to convert $relative_path to AVIF"
        ((ERRORS++))
        return 1
    fi
    
    # Remove original
    rm "$file"
    
    print_status "$relative_path -> WebP + AVIF"
    ((PROCESSED++))
}

# Format bytes to human readable
format_bytes() {
    local bytes=$1
    if [ $bytes -lt 1024 ]; then
        echo "${bytes} B"
    elif [ $bytes -lt 1048576 ]; then
        echo "$(( bytes / 1024 )) KB"
    else
        echo "$(( bytes / 1048576 )) MB"
    fi
}

# Main function
main() {
    echo "🚀 Starting image compression..."
    echo ""
    
    # Check dependencies
    check_dependencies
    
    # Check if source directory exists
    if [ ! -d "$SOURCE_DIR" ]; then
        print_error "Source directory $SOURCE_DIR not found!"
        exit 1
    fi
    
    # Create backup directory and update .gitignore
    create_backup_dir
    update_gitignore
    
    # Find and process images
    print_info "Scanning for images in $SOURCE_DIR..."
    
    local image_count=0
    while IFS= read -r -d '' file; do
        ((image_count++))
    done < <(find "$SOURCE_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.svg" -o -iname "*.gif" \) -print0)
    
    if [ $image_count -eq 0 ]; then
        print_info "No images found to process."
        exit 0
    fi
    
    echo "📁 Found $image_count image(s) to process"
    echo ""
    
    # Process each image
    while IFS= read -r -d '' file; do
        process_image "$file"
    done < <(find "$SOURCE_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -print0)
    
    # Print statistics
    echo ""
    echo "📊 Compression Statistics:"
    echo "─────────────────────────────────────────────────"
    echo "✅ Processed: $PROCESSED files"
    echo "⏭️  Skipped: $SKIPPED files"
    echo "❌ Errors: $ERRORS files"
    echo ""
    echo "🎉 Image compression completed!"
    echo "📂 Original images backed up to: $BACKUP_DIR"
}

# Run the script
main "$@"
