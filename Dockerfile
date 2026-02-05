FROM node:20 AS build-stage
WORKDIR /app

RUN apt-get update && apt-get install -y git

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .
RUN npm install
RUN npm run build

FROM httpd:2.4

# Habilitar mod_rewrite (CLAVE para SPA)
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' conf/httpd.conf

# Habilitar módulos de proxy
RUN sed -i \
    -e 's/#LoadModule proxy_module/LoadModule proxy_module/' \
    -e 's/#LoadModule proxy_http_module/LoadModule proxy_http_module/' \
    conf/httpd.conf

# Copiar config custom de Apache
RUN mkdir -p /usr/local/apache2/conf/extra
COPY apache.conf /usr/local/apache2/conf/extra/apache.conf
RUN echo "Include conf/extra/apache.conf" >> /usr/local/apache2/conf/httpd.conf

# Copiar build de Vite (incluye .htaccess desde public/)
COPY --from=build-stage /app/dist/ /usr/local/apache2/htdocs/

EXPOSE 80
