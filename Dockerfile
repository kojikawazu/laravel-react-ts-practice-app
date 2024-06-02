FROM php:8.2-fpm

# システムの更新と必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    procps \
    net-tools \
    nodejs \
    npm \
    libssl-dev \
    libpq-dev

# Dockerizeをインストール
RUN curl -L https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar -C /usr/local/bin -xzv

# PHP拡張機能のインストール
RUN docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリを設定
WORKDIR /var/www

# プロジェクトファイルをコピー
COPY . .

# Composerの依存関係をインストール
RUN composer install --no-dev --optimize-autoloader

# npmの依存関係をインストールしてビルド
RUN npm install && npm run build

# Nginxの設定
COPY ./nginx/default.conf /etc/nginx/sites-available/default

# 既存のシンボリックリンクを削除してから新しいリンクを作成
RUN rm /etc/nginx/sites-enabled/default && \
    ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# 権限設定 
RUN chown -R www-data:www-data \
    /var/www/storage \
    /var/www/bootstrap/cache

# スタートアップコマンドを定義
CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]

# php-fpmはPHP FastCGI Process Managerを起動するコマンド
# nginx -g 'daemon off;'はnginxをデーモンとして起動するコマンド

EXPOSE 80
