<?php

namespace Tests\Unit\Models;

use App\Models\MarkdownPost;
use App\Models\User;
use App\Models\MarkdownLike;
use App\Models\MarkdownReply;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MarkdownPostTest extends BaseTestCase
{
    use RefreshDatabase;

    // markdown投稿が正しく作成されること
    public function test_markdown_post_can_be_created()
    {
        // まずはユーザーの作成
        $user = User::factory()->create();
    
        $postData = [
            'content' => 'Test markdown content',
            'user_id' => $user->id,
        ];

        // markdown投稿を作成
        $post = MarkdownPost::create($postData);

        $this->assertInstanceOf(MarkdownPost::class, $post);
        $this->assertEquals($postData['content'], $post->content);
        $this->assertEquals($postData['user_id'], $post->user_id);
        $this->assertIsString($post->id);
        $this->assertDatabaseHas('markdown_posts', ['content' => 'Test markdown content']);
    }

    // markdown投稿がユーザーに属しているかテスト
    public function test_markdown_post_belongs_to_user()
    {
        $post = MarkdownPost::factory()->create();
        
        $this->assertInstanceOf(User::class, $post->user);
    }

    // markdown投稿が複数のいいねを持っているかテスト
    public function test_markdown_post_has_many_likes()
    {
        $post = MarkdownPost::factory()->create();
        MarkdownLike::factory()->count(3)->create(['post_id' => $post->id]);

        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $post->likes);
        $this->assertCount(3, $post->likes);
    }

    // markdown投稿が複数の返信を持っているかテスト
    public function test_markdown_post_has_many_replies()
    {
        $post1 = MarkdownPost::factory()->create();
        $post2 = MarkdownPost::factory()->create();
        
        // トップレベルの返信を2つ作成
        $reply1 = MarkdownReply::factory()->create(['post_id' => $post1->id, 'parent_id' => null]);
        $reply2 = MarkdownReply::factory()->create(['post_id' => $post1->id, 'parent_id' => null]);

        // reply1 に対する子返信を1つ作成
        $childReply = MarkdownReply::factory()->create(['post_id' => $post1->id, 'parent_id' => $reply1->id]);

        // post1 に関連するトップレベルの返信の数をテスト
        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $post1->replies);
        $this->assertCount(2, $post1->replies);

        // reply1 に関連する子返信の数をテスト
        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $reply1->children);
        $this->assertCount(1, $reply1->children);
    }

    // fillable属性が正しいかテスト
    public function test_fillable_attributes()
    {
        $fillable = ['content', 'user_id', 'likes_count', 'replies'];
        $post = new MarkdownPost;

        $this->assertEquals($fillable, $post->getFillable());
    }

    // ネストされた返信テスト
    public function test_nested_replies()
    {
        $post = MarkdownPost::factory()->create();

        // トップレベルの返信を1つ作成
        $reply1 = MarkdownReply::factory()->create(['post_id' => $post->id, 'parent_id' => null]);

        // reply1 に対する子返信を1つ作成
        $childReply1 = MarkdownReply::factory()->create(['post_id' => $post->id, 'parent_id' => $reply1->id]);

        // childReply1 に対する子返信を1つ作成
        $grandChildReply = MarkdownReply::factory()->create(['post_id' => $post->id, 'parent_id' => $childReply1->id]);

        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $reply1->children);
        $this->assertCount(1, $reply1->children);
        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $childReply1->children);
        $this->assertCount(1, $childReply1->children);
    }

    // いいねの数が正しく増減するかテスト
    public function test_likes_count()
    {
        $post = MarkdownPost::factory()->create();
        $initialLikesCount = $post->likes()->count();

        MarkdownLike::factory()->create(['post_id' => $post->id]);
        $this->assertEquals($initialLikesCount + 1, $post->likes()->count());

        $like = $post->likes()->first();
        $like->delete();
        $this->assertEquals($initialLikesCount, $post->likes()->count());
    }

    // ユーザーとのリレーションシップのテスト
    public function test_user_relationship()
    {
        $user = User::factory()->create();
        $post = MarkdownPost::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $post->user);
        $this->assertEquals($user->id, $post->user->id);

        $user->delete();
        $this->assertDatabaseMissing('markdown_posts', ['id' => $post->id]);
    }

    // 返信が正しい投稿に属しているかテスト
    public function test_reply_belongs_to_correct_post()
    {
        $post1 = MarkdownPost::factory()->create();
        $post2 = MarkdownPost::factory()->create();

        $reply = MarkdownReply::factory()->create(['post_id' => $post1->id, 'parent_id' => null]);
        $this->assertEquals($post1->id, $reply->post->id);
        $this->assertNotEquals($post2->id, $reply->post->id);
    }

     // markdown投稿が更新されることをテスト
     public function test_markdown_post_can_be_updated()
     {
         $post = MarkdownPost::factory()->create();
         $updatedContent = 'Updated content';
 
         $post->content = $updatedContent;
         $post->save();
 
         $this->assertEquals($updatedContent, $post->content);
         $this->assertDatabaseHas('markdown_posts', ['content' => 'Updated content']);
     }
 
     // markdown投稿が削除されることをテスト
     public function test_markdown_post_can_be_deleted()
     {
         $post = MarkdownPost::factory()->create();
         $postId = $post->id;
 
         $post->delete();
 
         $this->assertDatabaseMissing('markdown_posts', ['id' => $postId]);
     }
 
     // バリデーションエラーのテスト
     public function test_markdown_post_validation_errors()
     {
         $this->expectException(\Illuminate\Database\QueryException::class);
 
         // 不正なデータで投稿を作成
         MarkdownPost::create(['content' => null, 'user_id' => null]);
     }
}