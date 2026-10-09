# Programming fundamentals

Практика алгоритмов, паттернов и принципов программирования через TDD на TypeScript и Go.

## Быстрый старт

Нужны Node.js 24 LTS (рекомендуется версия из `.node-version`), pnpm, Go 1.24+ и Make. `make setup` скачает Go 1.27.1 через стандартный механизм Go toolchains, если включён обычный `GOTOOLCHAIN=auto`. pnpm использует версию из `packageManager`.

```sh
make setup
make check
make watch DIR=src/dojo/bubble_sort
```

Установщик локальных инструментов поддерживает macOS, Linux и Windows (Git Bash), arm64 и x86_64. Он скачивает официальные бинарники watchexec и golangci-lint, проверяет SHA-256 и кладёт их в игнорируемую папку `.tools/`. Для загрузки нужны интернет, `curl`, `tar` и `shasum` либо `sha256sum`; на Windows также нужен `unzip` (входит в Git Bash). Системные установки инструментов не заменяются.

На Windows запускай команды `make` из Git Bash с GNU Make в `PATH`. Установщик скачивает нативные `.exe`; WSL не требуется.

## Структура

```text
src/
  dojo/
    bubble_sort/
      bubble_sort.go
      bubble_sort_test.go
      bubble_sort.ts
      bubble_sort_test.ts
```

Одно упражнение — одна папка. Оба языка лежат рядом; можно начать с любого из них и добавить второй позже. Разделы (`algorithms`, `dojo`, `design-patterns`, `solid` и другие) создаются по мере необходимости.

В корне один Go-модуль и один TypeScript-проект. У каждого упражнения свой Go-пакет; одинаковые имена функций в разных упражнениях не конфликтуют. Для папок и файлов используем `snake_case`, для Go-пакетов — обычные короткие имена вроде `bubblesort`.

Пример `bubble_sort` возвращает отсортированную копию числового массива/среза и оставляет входные данные без изменений.

## Команды

| Команда | Действие |
| --- | --- |
| `make setup` | Установить закреплённые зависимости и локальные инструменты |
| `make test` | Однократно запустить тесты обоих языков |
| `make test-ts` / `make test-go` | Однократно запустить тесты выбранного языка |
| `make watch` | Запустить оба watcher с подписями `TS` и `Go` |
| `make watch-ts` / `make watch-go` | Запустить watch выбранного языка |
| `make bench-ts` | Запустить только TypeScript-бенчмарки с меткой `Benchmark:` |
| `make watch-bench-ts` | Перезапускать TypeScript-бенчмарки при изменениях файлов |
| `make bench-go` | Запустить Go-бенчмарки с замером времени и выделений памяти, без обычных тестов |
| `make watch-bench-go` | Перезапускать Go-бенчмарки при изменениях файлов |
| `make fmt` | Исправить форматирование через oxfmt и gofmt |
| `make fmt-check` | Проверить форматирование без изменений |
| `make lint` | Запустить oxlint и golangci-lint |
| `make typecheck` | Запустить TypeScript с `--noEmit` |
| `make check` | Тесты, типы, линтинг и проверка форматирования |
| `make` | Показать краткую справку |

К любой команде тестирования, бенчмарков или watch можно добавить `DIR`:

```sh
make test DIR=src/dojo/bubble_sort
make watch-go DIR=src/dojo/bubble_sort
make watch-ts DIR=src/dojo
make bench-ts DIR=src/neetcode_roadmap/arrays_and_hashing/double_array
make watch-bench-ts DIR=src/neetcode_roadmap/arrays_and_hashing/double_array
make bench-go DIR=src/neetcode_roadmap/arrays_and_hashing/double_array
make watch-bench-go DIR=src/neetcode_roadmap/arrays_and_hashing/double_array
```

Без `DIR` выбран весь `src/`. Папка должна существовать и находиться внутри `src/`; опечатка в пути завершает команду с ошибкой. Отсутствие тестов одного языка допустимо. В общем однократном запуске выполняются оба языка, даже если один из них падает.

`make watch` выполняет начальный прогон. Изменение тестов или реализации запускает новую проверку; новые файлы и папки упражнений подхватываются автоматически. Красные тесты и ошибки компиляции не останавливают наблюдение. `Ctrl-C` останавливает оба watcher.

`make watch-bench-go` выполняет начальный замер и повторяет его при изменениях Go-файлов, `go.mod` и `go.sum`. Остановка — `Ctrl-C`. Бенчмарки не входят в `make test` и `make check`, чтобы не замедлять обычный TDD-цикл.

Vitest перезапускает затронутые тесты. Go использует watchexec + gotestsum: при изменении Go-файла повторно проверяется весь выбранный `DIR`, без использования кэша результатов тестов. Изменения корневых `go.mod` и `go.sum` также запускают проверку. Чем уже выбранная папка, тем короче цикл обратной связи.

### TypeScript-бенчмарки в файлах тестов

Обычные тесты и бенчмарки лежат вместе в `*_test.ts`. Для бенчмарка используй метку `Benchmark:` в имени теста и `bench` из его контекста (API Vitest 5):

```ts
it("Benchmark: getConcatenation", async ({ bench }) => {
  const nums: number[] = Array(1_000).fill(1);
  const concatenate = getConcatenation;

  await bench("1000 elements", () => concatenate(nums)).run();
});
```

Vitest сам выполняет прогрев, подбирает повторения и выводит статистику. Подготовка данных перед вызовом `bench` не входит в замер. Сохраняй импортированную функцию в локальную переменную перед замером, чтобы не измерять накладные расходы getter-ов модулей Vitest. Важно вызвать и дождаться `.run()` — иначе замер не выполняется.

`make test-ts` и `make watch-ts` исключают тесты с `Benchmark:`. `make bench-ts` и `make watch-bench-ts` выбирают только их; watcher выполняет начальный замер, остановка — `Ctrl-C`. Фильтр проверяет полное имя теста, включая `describe`, поэтому метку лучше ставить только в имени самого бенчмарка.

Без Make доступны `pnpm bench:run` (однократно) и `pnpm bench` (watch), по умолчанию для всего `src/`. Бенчмарки не входят в `make test` и `make check`.

Форматирование, линтинг и проверка типов работают по всему проекту. Если другое упражнение осталось с красными тестами или ошибками, работай через `DIR`; общий `make check` покажет эти ошибки. Vitest сам по себе не заменяет проверку типов — для неё есть `make typecheck`.
