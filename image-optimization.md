# Image Optimization Guide

## Current Image Structure
images/
├── lemgenda-logo.svg
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── lemgenda-og-image.jpg
├── lemgenda-twitter-image.jpg
├── lemgenda-owner-lem-treursic.jpg
└── icons/
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
## Recommended Optimizations

### 1. Rename Images for SEO
- `lemgenda-owner-lem-treursic.jpg` → ✅ **Good**
- `web-development-services-sisak-croatia.jpg`
- `seo-optimization-croatia.jpg`
- `logo-design-services.jpg`

### 2. Alt Text Optimization

**Homepage Images:**

<!-- Owner image -->
<img src="images/lemgenda-owner-lem-treursic.jpg"
     alt="Lem Treursić - Founder of Lemgenda Web Development Company in Sisak, Croatia"
     loading="lazy">

<!-- Logo -->
<img src="images/lemgenda-logo.svg"
     alt="Lemgenda Web Development - Professional IT Services in Sisak, Croatia">

**Service Page Images:**

<img src="images/web-development-services-sisak-croatia.jpg"
     alt="Professional web development services in Sisak, Croatia - Custom websites and applications"
     loading="lazy">

### 3. Image Compression
Use WebP format where possible

Compress JPEGs to 60-80% quality

Optimize PNGs with tools like TinyPNG

Implement responsive images with srcset

### 4. Social Media Images
OG Image: 1200×630 pixels

Twitter Image: 1200×600 pixels

Compress to < 200KB each

### 6. `.htaccess` for 301 Redirects

Create `.htaccess` in root directory:

```apache
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove trailing slashes
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [L,R=301]

# Redirect old URLs (example - adjust as needed)
Redirect 301 /old-page.html https://lemgenda.hr/new-page.html
Redirect 301 /services/ https://lemgenda.hr/web-usluge/

# Custom 404 page
ErrorDocument 404 /404.html

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/x-javascript "access plus 1 month"
    ExpiresByType application/x-shockwave-flash "access plus 1 month"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresDefault "access plus 2 days"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>