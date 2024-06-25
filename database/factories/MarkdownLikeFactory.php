<?php

namespace Database\Factories;

use App\Models\MarkdownLike;
use App\Models\User;
use App\Models\MarkdownPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarkdownLikeFactory extends Factory
{
    protected $model = MarkdownLike::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'post_id' => MarkdownPost::factory(),
            'emoji' => $this->faker->randomElement(['👍', '❤️', '😊', '😂', '😯', '😢', '😡']),
        ];
    }
}