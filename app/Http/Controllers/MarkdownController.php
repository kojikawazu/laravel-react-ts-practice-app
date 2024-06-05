<?php

namespace App\Http\Controllers;

use App\Models\MarkdownPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Log;
use Illuminate\Support\Facades\Auth;

class MarkdownController extends Controller
{
    public function index()
    {
        Log::info('MarkdownController index start. ');

        Log::info('MarkdownController index end. ');
        return inertia('Markdown/MarkdownPage', [
            'message' => session('message'),
        ]);
    }

    public function store(Request $request)
    {
        Log::info('MarkdownController store start. ');

        $data = $request->validate([
            'content' => 'required',
        ]);

        try {
            Log::info('MarkdownController store MarkdownPost::create() before. ');

            $post = MarkdownPost::create([
                'content' => $data['content'],
                'user_id' => Auth::id(),
            ]);
    
            Log::info('MarkdownController store end. ');
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
