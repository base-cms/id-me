FROM node:10.15
ENV NODE_ENV production
ADD ./ /id-me
WORKDIR /id-me

RUN yarn --production

WORKDIR /id-me/services/membership
ENTRYPOINT [ "./node_modules/.bin/micro" ]
