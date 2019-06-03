FROM danlynn/ember-cli:3.9.0 as ember
WORKDIR /id-me
COPY package.json yarn.lock /id-me/
COPY ./services/manage /id-me/services/manage/
RUN yarn
WORKDIR /id-me/services/manage
RUN ember build --env=production

FROM nginx:alpine
COPY --from=ember /id-me/services/manage/dist /id-me/services/manage/dist
COPY ./services/manage/nginx.conf /etc/nginx/conf.d/manage.conf
