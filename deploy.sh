#!/bin/bash
# Deploy Vue.js app (production) với Docker + Nginx
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Deploy Vue.js + Nginx (Production)${NC}"
echo -e "${BLUE}========================================${NC}"

# 1. Kiểm tra Docker
for cmd in docker docker-compose; do
    if ! command -v $cmd &>/dev/null; then
        echo -e "${RED}[ERROR] '$cmd' chưa được cài đặt.${NC}"
        exit 1
    fi
done
echo -e "${GREEN}[OK] Docker & Docker Compose sẵn sàng${NC}"

# 2. Tạo thư mục logs
mkdir -p logs/nginx

# 3. Dừng container cũ
echo -e "${YELLOW}[1/4] Dừng container cũ...${NC}"
docker-compose down --remove-orphans 2>/dev/null || true

# 4. Build image
echo -e "${YELLOW}[2/4] Build Docker image...${NC}"
docker-compose build --no-cache

# 5. Start container
echo -e "${YELLOW}[3/4] Khởi động container...${NC}"
docker-compose up -d

# 6. Health check
echo -e "${YELLOW}[4/4] Kiểm tra health...${NC}"
sleep 5
if curl -sf http://localhost/health >/dev/null 2>&1; then
    echo -e "${GREEN}[OK] Health check passed!${NC}"
else
    echo -e "${YELLOW}[WARN] Health check chưa sẵn sàng (container có thể đang khởi động)${NC}"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Deploy thành công!${NC}"
echo -e "${GREEN}  URL:  http://localhost${NC}"
echo -e "${GREEN}  Logs: docker-compose logs -f${NC}"
echo -e "${GREEN}  Stop: docker-compose down${NC}"
echo -e "${GREEN}========================================${NC}"
