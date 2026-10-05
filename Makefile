.DEFAULT_GOAL := help
SHELL := /bin/sh

DIR ?= src
export EXERCISE_DIR := $(DIR)

.PHONY: help setup test test-ts test-go watch watch-ts watch-go validate-dir
.PHONY: fmt fmt-ts fmt-go fmt-check lint lint-ts lint-go typecheck check

help:
	@printf '%s\n' \
	  'make setup       Install pinned dependencies and local tools' \
	  'make test        Run TypeScript and Go tests once' \
	  'make watch       Watch TypeScript and Go tests (Ctrl-C to stop)' \
	  'make test-ts     Run only TypeScript tests' \
	  'make test-go     Run only Go tests' \
	  'make watch-ts    Watch only TypeScript tests' \
	  'make watch-go    Watch only Go tests' \
	  '                 Add DIR=src/dojo/bubble_sort to select a folder' \
	  'make fmt         Format TypeScript and Go files' \
	  'make lint        Run Oxlint and golangci-lint' \
	  'make typecheck   Check TypeScript types' \
	  'make check       Run all checks without changing files'

setup:
	pnpm install --frozen-lockfile
	go mod download
	go tool gotestsum --version
	sh setup-tools.sh

validate-dir:
	@test -d "$(DIR)" || { printf 'Directory does not exist: %s\n' "$(DIR)" >&2; exit 1; }
	@case "$$(cd "$(DIR)" && pwd -P)/" in "$$(pwd -P)/src/"*) ;; \
	  *) printf 'DIR must be inside src/: %s\n' "$(DIR)" >&2; exit 1 ;; esac

test: validate-dir
	pnpm exec concurrently --names TS,Go --success all \
	  "$(MAKE) --no-print-directory test-ts" "$(MAKE) --no-print-directory test-go"

test-ts: validate-dir
	pnpm test:run

test-go: validate-dir
	@if [ -n "$$(find "$(DIR)" -type f -name '*.go' -print -quit)" ]; then \
	  cd "$(DIR)" && go tool gotestsum --format testname -- -count=1 ./...; \
	else \
	  printf 'No Go files in %s; skipping.\n' "$(DIR)"; \
	fi

watch: validate-dir
	pnpm exec concurrently --names TS,Go --kill-others \
	  "$(MAKE) --no-print-directory watch-ts" "$(MAKE) --no-print-directory watch-go"

watch-ts: validate-dir
	pnpm test

watch-go: validate-dir
	@test -x .tools/watchexec || { printf 'Run make setup first.\n' >&2; exit 1; }
	.tools/watchexec --watch "$(DIR)" --watch-non-recursive . \
	  --exts go,mod,sum --debounce 150ms --on-busy-update restart \
	  -- $(MAKE) --no-print-directory test-go

fmt: fmt-ts fmt-go

fmt-ts:
	pnpm fmt

fmt-go:
	find src -type f -name '*.go' -exec "$$(go env GOROOT)/bin/gofmt" -w {} +

fmt-check:
	pnpm fmt:check
	@set -e; files="$$(find src -type f -name '*.go' -exec "$$(go env GOROOT)/bin/gofmt" -l {} +)"; \
	  if [ -n "$$files" ]; then printf 'Run make fmt; unformatted Go files:\n%s\n' "$$files"; exit 1; fi

lint: lint-ts lint-go

lint-ts:
	pnpm lint

lint-go:
	@test -x .tools/golangci-lint || { printf 'Run make setup first.\n' >&2; exit 1; }
	@if [ -n "$$(find src -type f -name '*.go' -print -quit)" ]; then \
	  .tools/golangci-lint run ./src/...; \
	else \
	  printf 'No Go files in src/; skipping lint.\n'; \
	fi

typecheck:
	pnpm typecheck

check: test typecheck lint fmt-check
