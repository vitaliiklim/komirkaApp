# збірка React-додатку
FROM node:18-alpine AS build
WORKDIR /app

# копіюємо package.json та package-lock.json для скорочення кешу
COPY package*.json ./
COPY .env ./
# встановлюємо залежності за lock-файлом
RUN npm install 

# копіюємо весь код та збираємо production-бандл
COPY . .
RUN npm run build

# runtime-стадія на базі Nginx
FROM nginx:alpine
# копіюємо зібрані статичні файли в директорію Nginx
COPY --from=build /app/build /usr/share/nginx/html

# відкриваємо порт 80
EXPOSE 80

# запускаємо Nginx у foreground
CMD ["nginx", "-g", "daemon off;"]
