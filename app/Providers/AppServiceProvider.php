<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // httpをhttpsにリダイレクトする
        if (env('APP_ENV') !== 'local') {
            URL::forceScheme('https');
        }

        // Inertiaの共有データ設定の追加
        // この変更により、サーバーサイドで設定されたセッションメッセージやエラーメッセージがInertiaを介して
        // フロントに渡される。
        Inertia::share([
            // エラーメッセージ
            'errors' => function () {
                return session()->get('errors')
                    ? session()->get('errors')->getBag('default')->getMessages()
                    : (object) [];
            },
            // セッションメッセージ
            'message' => function () {
                return session()->get('message') ? session()->get('message') : null;
            },
        ]);
    }
}
