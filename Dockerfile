# 1. Etapa de build
FROM node:22 AS build
WORKDIR /app

# Copia package.json e instala dependencias
COPY package*.json ./
RUN npm ci

# Copia todo el proyecto
COPY dist/Sentinel/browser .

# Compila Angular
RUN npm run build --prod

# 2. Etapa de servidor Nginx
FROM nginx:stable
WORKDIR /usr/share/nginx/html

# Limpia contenido por defecto
RUN rm -rf ./*

# Copia SOLO lo generado por Angular
COPY --from=build /app/dist/Sentinel/ ./

# Expone puerto 80 para Railway
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
