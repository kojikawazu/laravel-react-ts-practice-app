<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 

/**
 * マークダウン投稿モデル
 */
class MarkdownPost extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'id';
    protected $keyType = 'string';

    protected $fillable = [
        'content',
        'user_id',
        'likes_count',
        'replies'
    ];

    public function user()
    {
        // user 1 <- 多 markdown_post
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        // markdown_post 1 <- 多 markdown_like
        return $this->hasMany(MarkdownLike::class, 'post_id', 'id');
    }

    public function replies()
    {
        // markdown_post 1 <- 多 markdown_reply
        return $this->hasMany(MarkdownReply::class, 'post_id')->whereNull('parent_id');
    }
}
