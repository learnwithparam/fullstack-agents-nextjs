.PHONY: help setup install dev run build up down logs restart clean lint

.DEFAULT_GOAL := help

BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m

PM := pnpm

help: ## Show this help
	@echo "$(BLUE)Fullstack AI Agents with Next.js$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

setup: ## Initial setup (create .env, install deps)
	@if [ ! -f .env ]; then cp .env.example .env && echo "$(GREEN)✓ .env created, add your API keys$(NC)"; fi
	@if ! command -v $(PM) >/dev/null 2>&1; then npm install -g pnpm; fi
	@$(PM) install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

install: ## Install dependencies
	@$(PM) install

dev: setup run ## Setup and run dev server

run: ## Run the Next.js dev server on port 3000
	@$(PM) run dev

lint: ## Run ESLint
	@$(PM) run lint

build-next: ## Build for production
	@$(PM) run build

start: ## Start the production server
	@$(PM) start

build: ## Build Docker image
	docker compose build

up: ## Start container
	docker compose up -d
	@echo "$(GREEN)✓ Running at http://localhost:3000$(NC)"

down: ## Stop container
	docker compose down

logs: ## View container logs
	docker compose logs -f

restart: down up ## Restart container

clean: ## Remove node_modules and build artifacts
	rm -rf node_modules .next
	@echo "$(GREEN)✓ Cleaned$(NC)"
