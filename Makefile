build:
	docker compose -f docker/docker-compose.yml build
	
start:
	docker compose -f docker/docker-compose.yml up
	
stop:
	docker compose -f docker/docker-compose.yml down -v

dev:
	docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up

stop-dev:
	docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml down -v