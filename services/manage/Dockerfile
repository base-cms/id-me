FROM danlynn/ember-cli:3.9.0 as ember
WORKDIR /id-me
COPY package.json yarn.lock /id-me/
COPY ./services/manage /id-me/services/manage/
RUN yarn
WORKDIR /id-me/services/manage
RUN node_modules/.bin/ember build --env=production


FROM node:10.15
ENV NODE_ENV production
ADD ./ /id-me
WORKDIR /id-me

# Create volume for management app assets
VOLUME /id-me/services/manage/dist
COPY --from=ember /id-me/services/manage/dist /id-me/services/manage/dist/manage

# Create volume for management app config
VOLUME /etc/nginx/conf.d
COPY ./services/manage/nginx.conf /etc/nginx/conf.d/manage.conf

RUN yarn --production
