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

# Heroku CLI で heroku リポジトリの設定

```bash
heroku login
heroku git:remote -a laravel-react-practice-app
```

# Heroku プロジェクトに環境変数を設定

```bash
# 以下シェルスクリプトをカスタマイズし、heroku
deploy_env_temp.sh
```

# Heroku へデプロイ

```bash
# デプロイ開始
git push heroku main

# マイグレーションしましょう
heroku run php artisan migrate
```
