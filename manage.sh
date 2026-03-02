#!/bin/bash
# Quản lý Vue.js production container
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

show_usage() {
    echo -e "${BLUE}Usage: $0 [command]${NC}"
    echo ""
    echo "  start     Khởi động production server"
    echo "  stop      Dừng production server"
    echo "  restart   Khởi động lại"
    echo "  logs      Xem logs (realtime)"
    echo "  status    Kiểm tra trạng thái"
    echo "  health    Kiểm tra health check"
    echo "  shell     Truy cập shell container"
    echo "  clean     Dọn dẹp toàn bộ (container, volume, image)"
}

case "${1:-}" in
    start)
        echo -e "${YELLOW}Khởi động production server...${NC}"
        mkdir -p logs/nginx
        docker-compose up -d
        echo -e "${GREEN}Production server: http://localhost${NC}"
        ;;
    stop)
        docker-compose down
        echo -e "${GREEN}Production server đã dừng.${NC}"
        ;;
    restart)
        docker-compose restart
        echo -e "${GREEN}Production server đã khởi động lại.${NC}"
        ;;
    logs)
        docker-compose logs -f
        ;;
    status)
        docker-compose ps
        echo ""
        docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" 2>/dev/null || true
        ;;
    health)
        if curl -sf http://localhost/health >/dev/null 2>&1; then
            echo -e "${GREEN}Health check: OK${NC}"
        else
            echo -e "${RED}Health check: FAILED${NC}"
            docker compose logs --tail=20
            exit 1
        fi
        ;;
    shell)
        docker-compose exec frontend sh
        ;;
    clean)
        echo -e "${YELLOW}Dọn dẹp Docker resources...${NC}"
        docker-compose down -v --remove-orphans
        docker image prune -f
        docker volume prune -f
        echo -e "${GREEN}Dọn dẹp hoàn tất.${NC}"
        ;;
    *)
        show_usage
        exit 1
        ;;
esac
