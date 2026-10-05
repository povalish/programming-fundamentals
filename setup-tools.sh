#!/bin/sh
# Install pinned official release binaries into this repository only.
set -eu
cd "$(dirname "$0")"

watchexec_version=2.7.4
golangci_version=2.14.0

case "$(uname -s)" in
  Darwin) go_os=darwin; rust_os=apple-darwin ;;
  Linux) go_os=linux; rust_os=unknown-linux-musl ;;
  *) printf 'Supported systems: macOS and Linux.\n' >&2; exit 1 ;;
esac
case "$(uname -m)" in
  arm64|aarch64) go_arch=arm64; rust_arch=aarch64 ;;
  x86_64|amd64) go_arch=amd64; rust_arch=x86_64 ;;
  *) printf 'Supported architectures: arm64 and x86_64.\n' >&2; exit 1 ;;
esac

mkdir -p .tools
task_tmp=$(mktemp -d)
trap 'rm -rf "$task_tmp"' EXIT HUP INT TERM

verify() {
  archive=$1
  checksum_file=$2
  expected=$(awk -v name="$archive" '$2 == name || $2 == "*" name { print $1 }' "$task_tmp/$checksum_file")
  if command -v sha256sum >/dev/null 2>&1; then
    actual=$(sha256sum "$task_tmp/$archive" | awk '{print $1}')
  else
    actual=$(shasum -a 256 "$task_tmp/$archive" | awk '{print $1}')
  fi
  if [ -z "$expected" ] || [ "$actual" != "$expected" ]; then
    printf 'Checksum mismatch: %s\n' "$archive" >&2
    exit 1
  fi
}

if [ ! -x .tools/watchexec ] || ! .tools/watchexec --version | grep -Fq "watchexec $watchexec_version"; then
  archive="watchexec-$watchexec_version-$rust_arch-$rust_os.tar.xz"
  base="https://github.com/watchexec/watchexec/releases/download/v$watchexec_version"
  curl -fL --retry 3 "$base/$archive" -o "$task_tmp/$archive"
  curl -fsSL --retry 3 "$base/SHA256SUMS" -o "$task_tmp/watchexec-checksums"
  verify "$archive" watchexec-checksums
  mkdir "$task_tmp/watchexec"
  tar -xJf "$task_tmp/$archive" -C "$task_tmp/watchexec" --strip-components=1
  install -m 755 "$task_tmp/watchexec/watchexec" .tools/watchexec
fi

if [ ! -x .tools/golangci-lint ] || ! .tools/golangci-lint version | grep -Fq "version $golangci_version"; then
  archive="golangci-lint-$golangci_version-$go_os-$go_arch.tar.gz"
  base="https://github.com/golangci/golangci-lint/releases/download/v$golangci_version"
  curl -fL --retry 3 "$base/$archive" -o "$task_tmp/$archive"
  curl -fsSL --retry 3 "$base/golangci-lint-$golangci_version-checksums.txt" -o "$task_tmp/golangci-checksums"
  verify "$archive" golangci-checksums
  mkdir "$task_tmp/golangci"
  tar -xzf "$task_tmp/$archive" -C "$task_tmp/golangci" --strip-components=1
  install -m 755 "$task_tmp/golangci/golangci-lint" .tools/golangci-lint
fi

.tools/watchexec --version
.tools/golangci-lint version
