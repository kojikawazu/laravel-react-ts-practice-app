<?php

namespace Tests\Unit\Models;

use App\Models\MarkdownReply;
use App\Models\User;
use App\Models\MarkdownPost;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MarkdownReplyTest extends BaseTestCase
{
    use RefreshDatabase;

    // 返信が正しく作成されるかテスト
    public function test_markdown_reply_can_be_created(): void
    {
        $user = User::factory()->create();
        $post = MarkdownPost::factory()->create();

        $replyData = [
            'content' => 'test reply',
            'user_id' => $user->id,
            'post_id' => $post->id,
            'parent_id' => null
        ];

        $reply = MarkdownReply::create($replyData);

        $this->assertInstanceOf(MarkdownReply::class, $reply);
        $this->assertEquals($replyData['content'], $reply->content);
        $this->assertEquals($replyData['user_id'], $reply->user_id);
        $this->assertEquals($replyData['post_id'], $reply->post_id);
        $this->assertNull($reply->parent_id);
        $this->assertDatabaseHas('markdown_replies', ['content' => 'test reply']);
    }

    // 返信が正しく更新されるかテスト
    public function test_markdown_reply_can_be_updated(): void
    {
        $reply = MarkdownReply::factory()->create();
        $updatedContent = 'update reply content';

        $reply->content = $updatedContent;
        $reply->save();

        $this->assertEquals($updatedContent, $reply->content);
        $this->assertDatabaseHas('markdown_replies', ['id' => $reply->id, 'content' => $updatedContent]);
    }

    // 返信が正しく削除されることをテスト
    public function test_markdown_reply_can_be_deleted(): void
    {
        $reply = MarkdownReply::factory()->create();
        $replyId = $reply->id;

        $reply->delete();

        $this->assertDatabaseMissing('markdown_replies', ['id' => $replyId]);
    }

    // 返信がユーザーに属していることをテスト
    public function test_markdown_reply_belongs_to_user(): void
    {
        $reply = MarkdownReply::factory()->create();

        $this->assertInstanceOf(User::class, $reply->user);
    }

    // 返信が投稿に属していることをテスト
    public function test_markdown_reply_belongs_to_post(): void
    {
        $reply = MarkdownReply::factory()->create();

        $this->assertInstanceOf(MarkdownPost::class, $reply->post);
    }

    // 返信が親返信を持つことをテスト
    public function test_markdown_reply_belongs_to_parent(): void
    {
        $parentReply = MarkdownReply::factory()->create();
        $childReply = MarkdownReply::factory()->create(['parent_id' => $parentReply->id]);

        $this->assertInstanceOf(MarkdownReply::class, $childReply->parent);
        $this->assertEquals($parentReply->id, $childReply->parent->id);
    }

    // 返信が子返信を持つことをテスト
    public function test_markdown_reply_has_many_children(): void
    {
        $parentReply = MarkdownReply::factory()->create();
        $childReply1 = MarkdownReply::factory()->create(['parent_id' => $parentReply->id]);
        $childReply2 = MarkdownReply::factory()->create(['parent_id' => $parentReply->id]);

        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $parentReply->children);
        $this->assertCount(2, $parentReply->children);
    }

    // 返信作成時のバリデーションエラーテスト
    public function test_markdown_reply_creation_validation_errors(): void
    {
        $this->expectException(\Illuminate\Database\QueryException::class);

        // 不正なデータで返信を作成
        MarkdownReply::create(['content' => null, 'user_id' => null, 'post_id' => null]);
    }
}
