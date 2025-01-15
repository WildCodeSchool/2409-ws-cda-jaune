PHONY: stop clean dev

stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -af --volumes

dev:
	docker compose -f compose.dev.yaml --env-file .env.dev up -d --build
