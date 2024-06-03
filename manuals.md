# Laravel 11 の立ち上げ

```bash
composer create-project --prefer-dist laravel/laravel:^11.0 laravel11-react-messanger-app
```

# マイグレーション

```bash
docker exec -it laravel-app php artisan migrate
```

# Laravel Breeze のインストール

```bash
docker exec -it laravel-app composer require laravel/breeze --dev
docker exec -it laravel-app php artisan breeze:install
```

# URL

-   Interia

https://inertiajs.com/pages

-   shadcn/ui

https://ui.shadcn.com/docs/installation/laravel
