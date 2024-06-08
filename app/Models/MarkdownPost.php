<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids; 

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
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(MarkdownLike::class);
    }

    public function replies()
    {
        return $this->hasMany(MarkdownReply::class);
    }
}
