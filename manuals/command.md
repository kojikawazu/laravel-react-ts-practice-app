# Laravel 11 broadcast のインストール

```bash
docker exec -it laravel-app php artisan install:broadcasting
```

# Model の追加

```bash
docker exec -it laravel-app php artisan make:model Group -m
docker exec -it laravel-app php artisan make:model Conversation -m
docker exec -it laravel-app php artisan make:model Message -m
docker exec -it laravel-app php artisan make:model MessageAttachment -m

docker exec -it laravel-app php artisan make:migration add_messengers_to_users_table --table=users

docker exec -it laravel-app php artisan make:factory GroupFactory
docker exec -it laravel-app php artisan make:factory MessageFactory
```

# Seeder の実行

```bash
docker exec -it laravel-app php artisan migrate:fresh --seed
```

# Controller の追加

```bash
docker exec -it laravel-app php artisan make:controller HomeController
docker exec -it laravel-app php artisan make:controller ContactController
docker exec -it laravel-app php artisan make:controller SendMailController
```

# Resource の追加

```bash
docker exec -it laravel-app php artisan make:resource UserResource
docker exec -it laravel-app php artisan make:resource MessageResource
docker exec -it laravel-app php artisan make:resource MessageAttachmentResource
```

# Request の追加

```bash
docker exec -it laravel-app php artisan make:request StoreMessageRequest
```

# Event の追加

```bash
docker exec -it laravel-app php artisan make:event SocketMessage
```

# Observer の追加

```bash
docker exec -it laravel-app php artisan make:observer MessageObserver
```

# Shadcn/ui の追加

```bash
# まずは初期化
docker exec -it laravel-app npx shadcn-ui@latest init

# コンポーネントの追加
docker exec -it laravel-app npx shadcn-ui@latest add input
docker exec -it laravel-app npx shadcn-ui@latest add button
docker exec -it laravel-app npx shadcn-ui@latest add form
docker exec -it laravel-app npx shadcn-ui@latest add textarea
```

# PHPMailer のインストール

PHP で類似の機能を実装するライブラリ

```bash
#docker exec -it laravel-app composer require phpmailer/phpmailer
docker exec -it laravel-app composer require resend/resend-laravel

```

# その他インストール

```bash
docker exec -it laravel-app npm i zod react-spinners react-toastify
```

# URL

-   Resend.com

https://resend.com/docs/send-with-laravel

https://www.youtube.com/watch?v=xUTeIIt982w

-   お名前.com

https://www.onamae.com/domain/navi/dns_manage/select

-   Resend.com

https://resend.com/domains/fcff855e-89b6-418d-a840-7f1d3c9d78fd
