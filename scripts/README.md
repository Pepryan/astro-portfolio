# Image Compression Scripts

This directory contains scripts to compress images in the `public/images` folder to modern formats (WebP/AVIF) and move original images to a backup folder outside of git tracking.

## Available Scripts

### 1. Node.js Script (Recommended)
**File:** `compress-images.js`

**Features:**
- Uses Sharp library for high-quality image processing
- Converts PNG/JPG/JPEG to WebP and AVIF formats
- Maintains directory structure
- Moves originals to backup folder
- Provides detailed compression statistics
- Automatically updates .gitignore

**Requirements:**
- Node.js
- Sharp library (install with: `npm install sharp --save-dev`)

**Usage:**
```bash
npm run compress-images
```

### 2. Shell Script (Alternative)
**File:** `compress-images.sh`

**Features:**
- Uses system tools (ImageMagick, cwebp, avifenc)
- Converts PNG/JPG/JPEG to WebP and AVIF formats
- Maintains directory structure
- Moves originals to backup folder
- Provides basic compression statistics

**Requirements:**
- ImageMagick or cwebp/avifenc tools
- Unix-like system (Linux, macOS)

**Installation (Ubuntu/Debian):**
```bash
sudo apt install imagemagick libavif-bin webp
```

**Installation (macOS):**
```bash
brew install imagemagick libavif webp
```

**Usage:**
```bash
./scripts/compress-images.sh
```

## Configuration

### Node.js Script Configuration
Edit the `CONFIG` object in `compress-images.js`:

```javascript
const CONFIG = {
  sourceDir: path.join(__dirname, '../public/images'),
  backupDir: path.join(__dirname, '../images-original'),
  supportedFormats: ['.png', '.jpg', '.jpeg'],
  webpQuality: 85,
  avifQuality: 80,
  skipFormats: ['.svg', '.gif'], // Skip these formats
};
```

### Shell Script Configuration
Edit variables at the top of `compress-images.sh`:

```bash
SOURCE_DIR="public/images"
BACKUP_DIR="images-original"
WEBP_QUALITY=85
AVIF_QUALITY=80
```

## What the Scripts Do

1. **Scan** the `public/images` directory for supported image formats
2. **Create** a backup directory (`images-original/`) outside git tracking
3. **Copy** original images to the backup directory (maintaining folder structure)
4. **Convert** images to WebP and AVIF formats with optimized quality settings
5. **Remove** original images from the source directory
6. **Update** .gitignore to exclude the backup folder
7. **Report** compression statistics

## Supported Formats

**Input formats:**
- PNG
- JPG/JPEG

**Output formats:**
- WebP (for broad browser support)
- AVIF (for modern browsers with better compression)

**Skipped formats:**
- SVG (vector format, already optimized)
- GIF (animation support, requires special handling)

## File Structure After Running

```
astro-portfolio/
├── public/images/           # Compressed WebP/AVIF files
│   ├── blog/
│   │   ├── image1.webp
│   │   ├── image1.avif
│   │   └── ...
│   └── ...
├── images-original/         # Original files backup (git ignored)
│   ├── blog/
│   │   ├── image1.png
│   │   └── ...
│   └── ...
└── scripts/
    ├── compress-images.js
    ├── compress-images.sh
    └── README.md
```

## Browser Support

**WebP:**
- Chrome 23+
- Firefox 65+
- Safari 14+
- Edge 18+

**AVIF:**
- Chrome 85+
- Firefox 93+
- Safari 16+
- Edge 121+

## Usage in HTML/Astro

Use the `<picture>` element for optimal browser support:

```html
<picture>
  <source srcset="/images/example.avif" type="image/avif">
  <source srcset="/images/example.webp" type="image/webp">
  <img src="/images/example.jpg" alt="Example image">
</picture>
```

Or in Astro components:

```astro
---
// Component logic
---

<picture>
  <source srcset="/images/blog/example.avif" type="image/avif">
  <source srcset="/images/blog/example.webp" type="image/webp">
  <img src="/images/blog/example.jpg" alt="Example image" loading="lazy">
</picture>
```

## Performance Benefits

- **WebP:** 25-35% smaller than JPEG/PNG
- **AVIF:** 50% smaller than JPEG, 20% smaller than WebP
- **Faster loading:** Reduced bandwidth usage
- **Better SEO:** Improved Core Web Vitals scores

## Troubleshooting

### Node.js Script Issues
1. **Sharp installation fails:** Try `npm install --platform=linux --arch=x64 sharp`
2. **Permission errors:** Ensure write permissions to backup directory
3. **Memory issues:** Process images in smaller batches for large collections

### Shell Script Issues
1. **Command not found:** Install required tools (ImageMagick, libavif, webp)
2. **Permission denied:** Make script executable with `chmod +x scripts/compress-images.sh`
3. **Conversion fails:** Check if input images are corrupted

## Recovery

If you need to restore original images:

1. Copy files from `images-original/` back to `public/images/`
2. Remove the compressed WebP/AVIF files
3. Run the script again with different settings if needed

## Notes

- Always backup your images before running the script
- Test the script on a small subset first
- The backup folder is automatically added to .gitignore
- Original images are preserved in the backup folder
- The script skips SVG and GIF files by default
