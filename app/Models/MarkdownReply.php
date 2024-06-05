<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class MarkdownReply extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'user_id',
        'post_id',
        'parent_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(MarkdownPost::class);
    }

    public function parent()
    {
        return $this->belongsTo(MarkdownReply::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(MarkdownReply::class, 'parent_id');
    }
}
