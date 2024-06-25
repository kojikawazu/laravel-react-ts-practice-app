<?php

namespace Database\Factories;

use App\Models\MarkdownPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarkdownPostFactory extends Factory
{
    // このファクトリーが生成するモデルクラスを指定
    protected $model = MarkdownPost::class;

    // モデルインスタンス生成時に使用するデータの定義
    public function definition()
    {
        return [
            'content' => $this->faker->paragraph,
            'user_id' => User::factory(),
        ];
    }
}