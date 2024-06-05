<?php

namespace App\Http\Controllers;

use App\Models\MarkdownPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MarkdownController extends Controller
{
    public function index()
    {
        return inertia('Markdown/MarkdownPage', [
            'message' => session('message'),
        ]);
    }

    public function store()
    {
        $data = request()->validate([
            'content' => 'required',
        ]);

        $post = MarkdownPost::create([
            'content' => $data['content'],
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('markdown.index')->with('message', 'Post submitted successfully');
    }
}
