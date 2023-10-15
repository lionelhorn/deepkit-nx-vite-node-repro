FROM node:18-alpine AS base
RUN apk --no-cache add g++ gcc git libgcc libstdc++ linux-headers make python3
RUN apk --no-cache add wget

FROM base as builder
RUN npm i -g npm@latest; \
 npm install -g pnpm; \
 pnpm --version;

WORKDIR /app/
COPY ./patches/ ./patches/
COPY package.json pnpm-lock.yaml ./
COPY ./deps/ ./deps/
COPY ./src/ ./src/

RUN pnpm install

FROM builder
WORKDIR /app
COPY --from=builder /app /app

ENV APP_kernel_host=0.0.0.0
EXPOSE 8080

CMD sh

# Locally
# docker login ghcr.io/lionelhorn/
# docker build -f .\Dockerfile -t ghcr.io/lionelhorn/example-app:0.0.4 .
# docker push ghcr.io/lionelhorn/example-app:0.0.4

# remote server
# docker login ghcr.io/lionelhorn/
# docker push ghcr.io/lionelhorn/example-app:0.0.4
# docker run -p 0.0.0.0:8080:8080 ghcr.io/lionelhorn/example-app:0.0.4