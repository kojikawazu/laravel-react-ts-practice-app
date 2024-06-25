<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 

/**
 * Markdownいいねモデル
 */
class MarkdownLike extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'post_id',
        'emoji',
    ];

    public function user()
    {
        // user 1 <- 多 markdown_like
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        // post 1 <- 多 markdown_like
        return $this->belongsTo(MarkdownPost::class, 'post_id', 'id');
    }
}
