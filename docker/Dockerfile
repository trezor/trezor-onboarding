FROM node:10.15.1

ARG BUILD_TYPE=production

WORKDIR /trezor-onboarding

COPY package.json /trezor-onboarding
COPY yarn.lock /trezor-onboarding

RUN yarn install

COPY . /trezor-onboarding

RUN yarn run build:${BUILD_TYPE}

EXPOSE 8080
CMD [ "yarn", "run", "dev" ]
