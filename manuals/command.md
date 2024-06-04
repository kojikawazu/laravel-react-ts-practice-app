# Controller の追加

```bash
docker exec -it laravel-app php artisan make:controller HomeController
docker exec -it laravel-app php artisan make:controller ContactController
docker exec -it laravel-app php artisan make:controller SendMailController
docker exec -it laravel-app php artisan make:controller MarkdownController
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

# Resend のインストール

```bash
#docker exec -it laravel-app composer require phpmailer/phpmailer
docker exec -it laravel-app composer require resend/resend-laravel
```

# その他インストール

```bash
docker exec -it laravel-app npm i zod react-spinners react-toastify
docker exec -it laravel-app npm install @uiw/react-md-editor react-markdown emoji-mart
```

# URL

-   Resend.com

https://resend.com/docs/send-with-laravel

https://www.youtube.com/watch?v=xUTeIIt982w

-   お名前.com

https://www.onamae.com/domain/navi/dns_manage/select

-   Resend.com

https://resend.com/domains/fcff855e-89b6-418d-a840-7f1d3c9d78fd
