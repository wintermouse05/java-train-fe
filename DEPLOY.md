# Hướng dẫn Deploy Vue.js với Docker & Nginx

## Mục lục

- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cấu trúc file Docker](#cấu-trúc-file-docker)
- [Cài đặt Docker trên Ubuntu](#cài-đặt-docker-trên-ubuntu)
- [Development (hot reload)](#development-hot-reload)
- [Production deploy](#production-deploy)
- [Quản lý container](#quản-lý-container)
- [Troubleshooting](#troubleshooting)

---

## Yêu cầu hệ thống

| Yêu cầu | Phiên bản |
|----------|-----------|
| Docker Engine | 20.10+ |
| Docker Compose | v2+ (tích hợp sẵn trong Docker Desktop) |
| RAM | >= 2GB |
| Disk | >= 5GB |
| OS | Ubuntu 20.04+, macOS, Windows (Docker Desktop) |

---

## Cấu trúc file Docker

```
project/
├── Dockerfile              # Build production image (multi-stage)
├── Dockerfile.dev          # Build development image (hot reload)
├── docker-compose.yml      # Production: Nginx serve static files
├── docker-compose.dev.yml  # Development: Vite dev server + hot reload
├── nginx.conf              # Cấu hình Nginx cho SPA
├── .dockerignore           # Loại bỏ file không cần thiết khi build
├── deploy.sh               # Script deploy tự động (production)
├── dev.sh                  # Script quản lý dev container
├── manage.sh               # Script quản lý production container
└── logs/nginx/             # Nginx access/error logs (auto-created)
```

### Giải thích từng file

| File | Mục đích |
|------|----------|
| `Dockerfile` | Multi-stage build: Stage 1 dùng Node để `npm run build`, Stage 2 dùng Nginx để serve file tĩnh. Image cuối ~30MB |
| `Dockerfile.dev` | Chạy Vite dev server trong container, dùng với volume mount để hot reload |
| `docker-compose.yml` | Cấu hình production: port 80, healthcheck, log mount, auto-restart |
| `docker-compose.dev.yml` | Cấu hình dev: port 3000, mount source code, named volume cho node_modules |
| `nginx.conf` | SPA routing (`try_files`), gzip, cache static assets, security headers, health endpoint |
| `.dockerignore` | Giảm Docker build context: bỏ node_modules, .git, dist, storybook... |

---

## Cài đặt Docker trên Ubuntu

### 1. Cài Docker Engine

```bash
# Cập nhật package
sudo apt update

# Cài dependencies
sudo apt install -y ca-certificates curl gnupg

# Thêm GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Thêm repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Cài Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 2. Cho phép chạy Docker không cần `sudo`

```bash
sudo usermod -aG docker $USER

# Logout rồi login lại, hoặc chạy:
newgrp docker
```

### 3. Kiểm tra

```bash
docker --version          # Docker Engine
docker compose version    # Docker Compose v2
```

### Trên Windows / macOS

Cài [Docker Desktop](https://www.docker.com/products/docker-desktop/) — đã bao gồm Docker Engine + Compose.

---

## Development (hot reload)

Chạy Vite dev server trong Docker container, code thay đổi sẽ tự động reload.

### Cách 1: Dùng script

```bash
# Cấp quyền (lần đầu)
chmod +x dev.sh

# Khởi động
./dev.sh start

# Xem logs
./dev.sh logs

# Dừng
./dev.sh stop
```

### Cách 2: Dùng docker compose trực tiếp

```bash
# Khởi động (build + start)
docker compose -f docker-compose.dev.yml up -d --build

# Xem logs
docker compose -f docker-compose.dev.yml logs -f

# Dừng
docker compose -f docker-compose.dev.yml down
```

### Truy cập

```
http://localhost:3000
```

### Cách hoạt động

```
docker-compose.dev.yml
└── frontend-dev container (node:20-alpine)
    ├── Chạy: npm run dev
    ├── Port: 3000 → 3000
    └── Volume mount:
        ├── ./src         → /app/src          (hot reload)
        ├── ./public      → /app/public
        ├── ./index.html  → /app/index.html
        ├── ./vite.config.js → /app/vite.config.js
        └── node_modules_dev → /app/node_modules (named volume, không mount từ host)
```

> **Tại sao dùng named volume cho `node_modules`?**
> Vì `node_modules` trên host (Windows/macOS) và trong container (Linux) có thể khác nhau (native bindings). Named volume giữ `node_modules` trong Docker, tránh conflict.

---

## Production deploy

Build thành file tĩnh, serve bằng Nginx.

### Cách 1: Deploy tự động (khuyến nghị)

```bash
# Cấp quyền (lần đầu)
chmod +x deploy.sh

# Deploy
./deploy.sh
```

Script sẽ tự động: dừng container cũ → build image → start → health check.

### Cách 2: Deploy thủ công

```bash
# Tạo thư mục logs
mkdir -p logs/nginx

# Build và chạy
docker compose up -d --build

# Kiểm tra
docker compose ps
curl http://localhost/health
```

### Truy cập

```
http://localhost        # Ứng dụng
http://localhost/health # Health check
```

### Cách hoạt động

```
Dockerfile (multi-stage build)
│
├── Stage 1: node:20-alpine
│   ├── npm ci           → Cài dependencies
│   └── npm run build    → Tạo thư mục dist/
│
└── Stage 2: nginx:alpine
    ├── COPY dist/ → /usr/share/nginx/html   (chỉ file tĩnh)
    ├── COPY nginx.conf                       (SPA routing)
    └── Chạy Nginx ở port 80

docker-compose.yml
└── frontend container (nginx:alpine, ~30MB)
    ├── Port: 80 → 80
    ├── Healthcheck: wget /health mỗi 30s
    ├── Logs: mount ./logs/nginx
    └── Restart: unless-stopped (tự khởi động lại khi crash/reboot)
```

---

## Quản lý container

Dùng `manage.sh` cho production:

```bash
chmod +x manage.sh

./manage.sh start     # Khởi động
./manage.sh stop      # Dừng
./manage.sh restart   # Khởi động lại
./manage.sh logs      # Xem logs realtime
./manage.sh status    # Trạng thái + resource usage
./manage.sh health    # Kiểm tra health check
./manage.sh shell     # Truy cập shell container
./manage.sh clean     # Dọn dẹp toàn bộ Docker resources
```

### Các lệnh Docker hữu ích

```bash
# Xem tất cả container
docker ps -a

# Xem images
docker images

# Xem logs 50 dòng cuối
docker compose logs --tail=50

# Xem Nginx access log
docker compose exec frontend cat /var/log/nginx/access.log

# Xem resource usage
docker stats

# Dọn dẹp Docker (images, container, volume không dùng)
docker system prune -a
```

---

## Nginx chi tiết

File `nginx.conf` được cấu hình tối ưu cho Vue.js SPA:

| Tính năng | Mô tả |
|-----------|-------|
| `try_files $uri $uri/ /index.html` | Vue Router history mode — mọi route trả về `index.html` |
| `gzip on` | Nén response, giảm ~70% bandwidth |
| `location /assets/` + `expires 1y` | Cache file Vite build (có hash) vĩnh viễn |
| `location = /index.html` + `no-cache` | Luôn lấy `index.html` mới nhất khi deploy |
| `X-Frame-Options`, `X-XSS-Protection` | Chống clickjacking và XSS |
| `location /health` | Endpoint cho Docker healthcheck |
| `location ~ /\.` + `deny all` | Chặn truy cập file ẩn (`.git`, `.env`...) |

---

## Troubleshooting

### Container không start

```bash
# Xem logs chi tiết
docker compose logs

# Kiểm tra cấu hình compose
docker compose config

# Build lại từ đầu
docker compose build --no-cache
docker compose up -d
```

### Port 80 đã bị chiếm

```bash
# Kiểm tra process đang dùng port 80
sudo lsof -i :80
# hoặc
sudo netstat -tulpn | grep :80

# Đổi port trong docker-compose.yml:
# ports:
#   - "8080:80"    ← đổi thành port khác
```

### Không truy cập được từ bên ngoài (Ubuntu)

```bash
# Mở firewall
sudo ufw allow 80
sudo ufw allow 443
sudo ufw reload
```

### Hot reload không hoạt động (dev mode)

Kiểm tra `vite.config.js` đã có:

```js
server: {
  host: '0.0.0.0',    // Cho phép truy cập từ ngoài container
  port: 3000,
  watch: {
    usePolling: true,  // Bắt buộc cho Docker volume mount
  },
},
```

### Image quá lớn

```bash
# Kiểm tra kích thước
docker images | grep vue

# Nếu > 50MB, kiểm tra .dockerignore có đầy đủ không
# Production image (nginx:alpine + static files) nên ~30-40MB
```

---

## Tổng hợp lệnh nhanh

| Mục đích | Lệnh |
|----------|-------|
| **Dev** - start | `./dev.sh start` |
| **Dev** - stop | `./dev.sh stop` |
| **Dev** - logs | `./dev.sh logs` |
| **Prod** - deploy lần đầu | `./deploy.sh` |
| **Prod** - start | `./manage.sh start` |
| **Prod** - stop | `./manage.sh stop` |
| **Prod** - health check | `./manage.sh health` |
| **Prod** - logs | `./manage.sh logs` |
| Dọn dẹp dev | `./dev.sh clean` |
| Dọn dẹp prod | `./manage.sh clean` |
| Dọn dẹp toàn bộ Docker | `docker system prune -a` |
