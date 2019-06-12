FROM danlynn/ember-cli:3.9.0 as ember
WORKDIR /identity-x

ADD package.json yarn.lock /identity-x/
ADD packages /identity-x/packages
ADD services/manage /identity-x/services/manage
RUN yarn
WORKDIR /identity-x/services/manage
RUN ember build --env=production

FROM nginx:alpine
COPY --from=ember /identity-x/services/manage/dist /identity-x/services/manage/dist
COPY ./services/manage/nginx.conf /etc/nginx/conf.d/manage.conf
