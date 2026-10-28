#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export APP_DIR
export DEPLOY_HOST="${DEPLOY_HOST:-root@94.249.174.172}"
export REMOTE_ROOT="${REMOTE_ROOT:-/www/wwwroot/sf6soultion-runtime}"
export REMOTE_ARCHIVE="${REMOTE_ARCHIVE:-/opt/sf6soultion-release.tar.gz}"
export REMOTE_ENV="${REMOTE_ENV:-/opt/sf6soultion.env}"
export PM2_APP="${PM2_APP:-sf6soultion}"
export APP_PORT="${APP_PORT:-5789}"
export DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}"

cd "$APP_DIR"

echo "SF6 Soultion one-command production deployment"
echo "Source: $APP_DIR"
echo "Branch: $DEPLOY_BRANCH"
echo "Target: $DEPLOY_HOST"
echo "Port: $APP_PORT"

git fetch origin "$DEPLOY_BRANCH"
git checkout "$DEPLOY_BRANCH"
git pull --ff-only origin "$DEPLOY_BRANCH"

exec bash "$APP_DIR/scripts/build-and-deploy.sh"
