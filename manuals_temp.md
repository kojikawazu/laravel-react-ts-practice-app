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

docker exec -it laravel-app php artisan migrate:fresh --seed
```

# Controller の追加

```bash
docker exec -it laravel-app php artisan make:controller HomeController
docker exec -it laravel-app php artisan make:controller MessageController
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

# Event の追加

```bash
docker exec -it laravel-app php artisan make:observer MessageObserver
```

# その他のインストール

```bash
docker exec -it laravel-app npm i @headlessui/react @heroicons/react daisyui emoji-picker-react react-markdown uuid
docker exec -it laravel-app npm i laravel-echo
docker exec -it laravel-app npm i -D pusher-js
```

# Reverb の起動

```bash
docker exec -it laravel-app php artisan reverb:start --debug
```

# URL

-   Headless UI

https://headlessui.com/

-   Heroicon

https://heroicons.com/

-   Daisy UI

https://daisyui.com/

-   Laravel 10 broadcast

https://readouble.com/laravel/10.x/ja/broadcasting.html
