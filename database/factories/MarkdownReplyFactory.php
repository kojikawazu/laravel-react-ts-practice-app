<?php

namespace Database\Factories;

use App\Models\MarkdownReply;
use App\Models\User;
use App\Models\MarkdownPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class MarkdownReplyFactory extends Factory
{
    protected $model = MarkdownReply::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'post_id' => MarkdownPost::factory(),
            'content' => $this->faker->paragraph,
            'parent_id' => null,
        ];
    }
}