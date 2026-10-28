#!/usr/bin/env bash
set -Eeuo pipefail

REMOTE_ROOT="${REMOTE_ROOT:-/www/wwwroot/sf6soultion-runtime}"
REMOTE_ARCHIVE="${REMOTE_ARCHIVE:-/opt/sf6soultion-release.tar.gz}"
REMOTE_ENV="${REMOTE_ENV:-/opt/sf6soultion.env}"
PM2_APP="${PM2_APP:-sf6soultion}"
APP_PORT="${APP_PORT:-5789}"
RELEASE_ID="$(date -u +%Y%m%d%H%M%S)"
RELEASES_DIR="$REMOTE_ROOT/releases"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
CURRENT_LINK="$REMOTE_ROOT/current"

command -v node >/dev/null 2>&1 || { echo "Node.js is not installed" >&2; exit 1; }
command -v pm2 >/dev/null 2>&1 || { echo "PM2 is not installed" >&2; exit 1; }
[[ -f "$REMOTE_ARCHIVE" ]] || { echo "Release archive not found: $REMOTE_ARCHIVE" >&2; exit 1; }
[[ -f "$REMOTE_ENV" ]] || { echo "Runtime env file not found: $REMOTE_ENV" >&2; exit 1; }

mkdir -p "$RELEASE_DIR"
tar -xzf "$REMOTE_ARCHIVE" -C "$RELEASE_DIR"
cp "$REMOTE_ENV" "$RELEASE_DIR/.env.local"
chmod 600 "$RELEASE_DIR/.env.local"

[[ -f "$RELEASE_DIR/server.js" ]] || { echo "Invalid release: server.js missing" >&2; exit 1; }

ln -sfn "$RELEASE_DIR" "$REMOTE_ROOT/current.new"
mv -Tf "$REMOTE_ROOT/current.new" "$CURRENT_LINK"

if pm2 describe "$PM2_APP" >/dev/null 2>&1; then
  pm2 delete "$PM2_APP"
fi

PORT="$APP_PORT" HOSTNAME="127.0.0.1" NODE_ENV="production" \
  pm2 start "$CURRENT_LINK/server.js" --name "$PM2_APP" --cwd "$CURRENT_LINK" --time
pm2 save

for attempt in {1..20}; do
  if curl --fail --silent --show-error "http://127.0.0.1:$APP_PORT/" >/dev/null; then
    echo "Health check passed on port $APP_PORT"
    break
  fi
  if [[ "$attempt" -eq 20 ]]; then
    echo "Health check failed" >&2
    pm2 logs "$PM2_APP" --lines 80 --nostream || true
    exit 1
  fi
  sleep 1
done

find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
  | sort -nr \
  | tail -n +4 \
  | cut -d' ' -f2- \
  | xargs -r rm -rf

rm -f "$REMOTE_ARCHIVE"
echo "Active release: $RELEASE_DIR"
