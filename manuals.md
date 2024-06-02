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

# Heroku デプロイ前準備

```php
use Illuminate\Support\Facades\URL;

# 省略

/**
 * Bootstrap any application services.
 */
public function boot(): void
{
    if (env('APP_ENV') !== 'local') {
        URL::forceScheme('https');
    }
}
```

```bash
# node.jsのビルドパック追加
heroku buildpacks:add --index 1 heroku/nodejs --app laravel-react-ts-practice-app
# ビルドパックリストの確認(PHP, Node.js)
heroku buildpacks --app laravel-react-ts-practice-app
```

# Heroku CLI でデプロイ

```bash
# Herokuへ初期デプロイしましょう
heroku login
heroku git:remote -a laravel-react-practice-app
git push heroku main

# マイグレーションしましょう
heroku run php artisan migrate

# DBはVercel使いましょう
```

# URL

-   Interia

https://inertiajs.com/pages
