#!/bin/bash
# Chạy Vue.js trong Docker development mode (hot reload)
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

COMPOSE_FILE="docker-compose.dev.yml"

show_usage() {
    echo -e "${BLUE}Usage: $0 [command]${NC}"
    echo ""
    echo "  start     Khởi động dev server (hot reload)"
    echo "  stop      Dừng dev server"
    echo "  restart   Khởi động lại"
    echo "  logs      Xem logs (realtime)"
    echo "  status    Kiểm tra trạng thái"
    echo "  shell     Truy cập shell container"
    echo "  clean     Dọn dẹp toàn bộ (container, volume, image)"
}

case "${1:-}" in
    start)
        echo -e "${YELLOW}Khởi động dev server...${NC}"
        docker-compose -f $COMPOSE_FILE up -d --build
        echo -e "${GREEN}Dev server: http://localhost:3000${NC}"
        ;;
    stop)
        docker-compose -f $COMPOSE_FILE down
        echo -e "${GREEN}Dev server đã dừng.${NC}"
        ;;
    restart)
        docker-compose -f $COMPOSE_FILE restart
        echo -e "${GREEN}Dev server đã khởi động lại.${NC}"
        ;;
    logs)
        docker-compose -f $COMPOSE_FILE logs -f
        ;;
    status)
        docker-compose -f $COMPOSE_FILE ps
        echo ""
        docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" 2>/dev/null || true
        ;;
    shell)
        docker-compose -f $COMPOSE_FILE exec frontend-dev sh
        ;;
    clean)
        echo -e "${YELLOW}Dọn dẹp Docker resources...${NC}"
        docker-compose -f $COMPOSE_FILE down -v --remove-orphans
        docker image prune -f
        echo -e "${GREEN}Dọn dẹp hoàn tất.${NC}"
        ;;
    *)
        show_usage
        exit 1
        ;;
esac
