#!/bin/bash -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR=$(cd ${SCRIPT_DIR}/..; pwd)

UNAME=$(uname)

if [[ "$UNAME" == 'Darwin' ]]; then
    export DOCKER_COMPOSE_CMD="docker-compose"
else
    export DOCKER_COMPOSE_CMD="docker-compose -f docker-compose.yml -f docker-compose.traefik.yml"
fi
