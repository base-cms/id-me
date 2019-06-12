#!/bin/bash
set -e
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

[[ -f "services/$1/Dockerfile" ]] && cp "services/$1/Dockerfile" Dockerfile
docker build -t "$1:$2" --build-arg SERVICE=$1 .

docker tag "$1:$2" "basecms/identity-x-$1-service:$2"
docker push "basecms/identity-x-$1-service:$2"
docker image rm "$1:$2"
