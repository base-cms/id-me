#!/bin/bash
set -e

IMAGE=basecms/identity-x-$1-service:$2
echo -e "  Installing deployment utility."
yarn global add @endeavorb2b/rancher2cli --silent --no-progress 2>&1 >/dev/null
echo -e "  Triggering deployment."
r2 dl basecms-identity-x-service $1 $IMAGE

if [ -z "$3" ]; then
payload="{
  \"deployment\": {
    \"revision\": \"\`$2\`\",
    \"user\": \"TravisCD\"
  }
}"
curl -f -X POST --data "$payload" \
  -H 'Content-type: application/json' \
  -H "X-Api-Key:$NR_APIKEY" \
  https://api.newrelic.com/v2/applications/$3/deployments.json
fi
