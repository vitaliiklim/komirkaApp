# ---- Build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# Кешуємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо весь код і збираємо
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# ---- Production stage ----
FROM nginx:alpine

# Копіюємо зібраний React-app
COPY --from=build /app/build /usr/share/nginx/html

# Копіюємо свій кастомний конфіг для SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
