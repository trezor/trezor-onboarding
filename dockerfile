FROM node:10.13
RUN apt-get update && \
  apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb

# versions of local tools
RUN node -v
# NPM version should already be pretty new (> 6.4.0)
RUN npm -v
RUN yarn -v

RUN apt-get update && apt-get install -y curl xvfb chromium

RUN ln -s /usr/bin/xvfb-chromium /usr/bin/google-chrome
RUN ln -s /usr/bin/xvfb-chromium /usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

WORKDIR /usr/src/app/server
RUN yarn
WORKDIR /usr/src/app

RUN yarn build:development

CMD ["./test-e2e.sh"]
