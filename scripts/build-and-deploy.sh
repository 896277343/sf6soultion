#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
DEPLOY_HOST="${DEPLOY_HOST:-root@94.249.174.172}"
REMOTE_ROOT="${REMOTE_ROOT:-/www/wwwroot/sf6soultion-runtime}"
REMOTE_ARCHIVE="${REMOTE_ARCHIVE:-/opt/sf6soultion-release.tar.gz}"
REMOTE_ACTIVATE="${REMOTE_ACTIVATE:-/opt/sf6soultion-remote-activate.sh}"
REMOTE_ENV="${REMOTE_ENV:-/opt/sf6soultion.env}"
PM2_APP="${PM2_APP:-sf6soultion}"
APP_PORT="${APP_PORT:-5789}"
BUILD_DIR="$APP_DIR/.deploy"
STAGE_DIR="$BUILD_DIR/release"
ARCHIVE="$BUILD_DIR/sf6soultion-release.tar.gz"

for command in npm tar ssh scp; do
  command -v "$command" >/dev/null 2>&1 || {
    echo "Missing required command: $command" >&2
    exit 1
  }
done

if [[ ! -f "$APP_DIR/.env.local" ]]; then
  echo "Missing $APP_DIR/.env.local" >&2
  echo "Create it from .env.example before building." >&2
  exit 1
fi

cd "$APP_DIR"
rm -rf "$BUILD_DIR"
mkdir -p "$STAGE_DIR"

echo "[1/5] Installing locked dependencies"
npm ci

echo "[2/5] Building Next.js standalone release"
npm run build

STANDALONE_DIR="$APP_DIR/.next-local/standalone"
if [[ ! -f "$STANDALONE_DIR/server.js" ]]; then
  echo "Standalone server not found: $STANDALONE_DIR/server.js" >&2
  exit 1
fi

echo "[3/5] Packaging release"
cp -a "$STANDALONE_DIR/." "$STAGE_DIR/"
mkdir -p "$STAGE_DIR/.next-local/static"
cp -a "$APP_DIR/.next-local/static/." "$STAGE_DIR/.next-local/static/"
cp -a "$APP_DIR/public" "$STAGE_DIR/public"
tar -czf "$ARCHIVE" -C "$STAGE_DIR" .

echo "[4/5] Uploading release to $DEPLOY_HOST"
scp "$ARCHIVE" "$DEPLOY_HOST:$REMOTE_ARCHIVE"
scp "$APP_DIR/scripts/remote-activate.sh" "$DEPLOY_HOST:$REMOTE_ACTIVATE"

echo "[5/5] Activating release"
ssh "$DEPLOY_HOST" \
  "REMOTE_ROOT='$REMOTE_ROOT' REMOTE_ARCHIVE='$REMOTE_ARCHIVE' REMOTE_ENV='$REMOTE_ENV' PM2_APP='$PM2_APP' APP_PORT='$APP_PORT' bash '$REMOTE_ACTIVATE'"

echo "Deployment complete: $DEPLOY_HOST ($PM2_APP on port $APP_PORT)"
