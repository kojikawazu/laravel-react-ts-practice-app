<?php

namespace App\Http\Controllers;

use App\Models\MarkdownPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MarkdownController extends Controller
{
    public function index()
    {
        return inertia('Markdown/MarkdownPage', [
            'message' => session('message'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'content' => 'required',
        ]);

        try {
            $post = MarkdownPost::create([
                'content' => $data['content'],
                'user_id' => Auth::id(),
            ]);
    
            return redirect()
                ->route('markdown.index')
                ->with('message', 'Post submitted successfully');
        } catch (\Exception $e) {
            Log::error('Post creation failed: ' . $e->getMessage());
            return redirect()
                ->route('markdown.index')
                ->with('error', 'Post creation failed');
        }
    }
}
