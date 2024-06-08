<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 

/**
 * マークダウン返信モデル
 */
class MarkdownReply extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'id';
    protected $keyType = 'string';

    protected $fillable = [
        'content',
        'user_id',
        'post_id',
        'parent_id'
    ];

    public function user()
    {
        // user 1 <- 多 markdown_reply
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        // markdown_post 1 <- 多 markdown_reply
        return $this->belongsTo(MarkdownPost::class);
    }

    public function parent()
    {
        // markdown_reply 1 <- 多 markdown_reply
        return $this->belongsTo(MarkdownReply::class, 'parent_id');
    }

    public function children()
    {
        // markdown_reply 1 <- 多 markdown_reply
        return $this->hasMany(MarkdownReply::class, 'parent_id');
    }
}
