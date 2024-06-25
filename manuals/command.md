# Controller の追加

```bash
docker exec -it laravel-app php artisan make:controller HomeController
docker exec -it laravel-app php artisan make:controller ContactController
docker exec -it laravel-app php artisan make:controller SendMailController
docker exec -it laravel-app php artisan make:controller MarkdownController
docker exec -it laravel-app php artisan make:controller MarkdownLikeController
docker exec -it laravel-app php artisan make:controller MarkdownReplyController
```

# Migration の追加

```bash
docker exec -it laravel-app php artisan make:migration create_markdown_posts_table
docker exec -it laravel-app php artisan make:migration create_markdown_likes_table
docker exec -it laravel-app php artisan make:migration create_markdown_replies_table

docker exec -it laravel-app php artisan make:migration update_tables_to_use_uuid --table=users
docker exec -it laravel-app php artisan make:migration update_tables_to_use_uuid --table=markdown_posts
docker exec -it laravel-app php artisan make:migration update_tables_to_use_uuid --table=markdown_likes
docker exec -it laravel-app php artisan make:migration update_tables_to_use_uuid --table=markdown_replies

docker exec -it laravel-app php artisan make:migration add_emoji_to_markdown_likes_table --table=markdown_likes
docker exec -it laravel-app php artisan make:migration change_parent_id_to_markdown_replies_table --table=markdown_replies
```

# Model の追加

```bash
docker exec -it laravel-app php artisan make:model MarkdownPost
docker exec -it laravel-app php artisan make:model MarkdownLike
docker exec -it laravel-app php artisan make:model MarkdownReply
```

# マイグレーションの実行

```bash
docker exec -it laravel-app php artisan migrate:reset
docker exec -it laravel-app php artisan migrate
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

# React Testing Library のインストール

vitest を利用する。

```bash
docker exec -it laravel-app npm i --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

# その他インストール

```bash
docker exec -it laravel-app npm i zod react-spinners react-toastify
docker exec -it laravel-app npm install @uiw/react-md-editor react-markdown emoji-mart
```

# その他

```bash
haru@LAPTOP-QGU4MK3B:~/laravel-react-ts-practice-app$ docker exec -it laravel-db psql -U root -d laravel_react_db
psql (13.14 (Debian 13.14-1.pgdg120+2))
Type "help" for help.

laravel_react_db=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION
laravel_react_db=#
```

# URL

-   Resend.com

https://resend.com/docs/send-with-laravel

https://www.youtube.com/watch?v=xUTeIIt982w

-   お名前.com

https://www.onamae.com/domain/navi/dns_manage/select

-   Resend.com

https://resend.com/domains/fcff855e-89b6-418d-a840-7f1d3c9d78fd
