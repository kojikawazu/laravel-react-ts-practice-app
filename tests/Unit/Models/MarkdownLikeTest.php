<?php

namespace Tests\Unit\Models;

use App\Models\MarkdownLike;
use App\Models\User;
use App\Models\MarkdownPost;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MarkdownLikeTest extends BaseTestCase
{
    use RefreshDatabase;

    // いいねが正しく作成されるかテスト
    public function test_markdown_like_can_be_created(): void
    {
        $user = User::factory()->create();
        $post = MarkdownPost::factory()->create();

        $likeData = [
            'user_id' => $user->id,
            'post_id' => $post->id,
            'emoji' => '👍',
        ];

        $like = MarkdownLike::create($likeData);

        $this->assertInstanceOf(MarkdownLike::class, $like);
        $this->assertEquals($likeData['user_id'], $like->user_id);
        $this->assertEquals($likeData['post_id'], $like->post_id);
        $this->assertEquals($likeData['emoji'], $like->emoji);
        $this->assertDatabaseHas('markdown_likes', ['post_id' => $post->id, 'emoji' => '👍']);
    }

    // いいねが正しく更新されるかテスト
    public function test_markdown_like_can_be_updated(): void
    {
        $like = MarkdownLike::factory()->create();
        $updatedEmoji = '❤️';

        $like->emoji = $updatedEmoji;
        $like->save();

        $this->assertEquals($updatedEmoji, $like->emoji);
        $this->assertDatabaseHas('markdown_likes', ['id' => $like->id, 'emoji' => '❤️']);
    }

    // いいねが正しく削除されるかテスト
    public function test_markdown_like_can_be_deleted(): void
    {
        $like = MarkdownLike::factory()->create();
        $likeId = $like->id;

        $like->delete();

        $this->assertDatabaseMissing('markdown_likes', ['id' => $likeId]);
    }

    // いいねがユーザーに属しているかテスト
    public function test_markdown_like_belongs_to_user(): void
    {
        $like = MarkdownLike::factory()->create();

        $this->assertInstanceOf(User::class, $like->user);
    }

    // いいねが投稿に属しているかテスト
    public function test_markdown_like_belongs_to_post(): void
    {
        $like = MarkdownLike::factory()->create();

        $this->assertInstanceOf(MarkdownPost::class, $like->post);
    }

    // いいね作成時のバリデーションエラーテスト
    public function test_markdown_like_creation_validation_errors(): void
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        MarkdownLike::create(['user_id' => null, 'post_id' => null, 'emoji' => null]);
    }
}
