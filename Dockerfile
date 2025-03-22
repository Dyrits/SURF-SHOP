FROM denoland/deno:latest

WORKDIR /app

COPY ./ ./

RUN deno cache app.js

CMD ["deno", "task", "watch"]