FROM node:10.15
WORKDIR /identity-x
ENV NODE_ENV production
ARG SERVICE

ADD package.json yarn.lock /identity-x/
ADD packages /identity-x/packages
ADD services/$SERVICE /identity-x/services/$SERVICE
RUN yarn --production --pure-lockfile

WORKDIR /identity-x/services/$SERVICE
ENTRYPOINT [ "./node_modules/.bin/micro", "-l", "tcp://0.0.0.0:80" ]
