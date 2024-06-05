<?php

namespace App\Http\Controllers;

use App\Models\MarkdownPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use Inertia\Inertia;

class MarkdownController extends Controller
{
    public function index()
    {
        Log::info('MarkdownController index start.');

        $message = session('message');
        Log::info('MarkdownController index - session message: ' . ($message ?? 'none'));

        Log::info('MarkdownController index end.');
        return Inertia::render('Markdown/MarkdownPage', [
            'message' => $message,
        ]);
    }

    public function store(Request $request)
    {
        Log::info('MarkdownController store start. ');

        $data = $request->validate([
            'content' => 'required',
        ]);

        Log::info('Request data validated: ' . json_encode($data));

        try {
            Log::info('MarkdownController store MarkdownPost::create() before. ');

            $post = MarkdownPost::create([
                'content' => $data['content'],
                'user_id' => Auth::id(),
            ]);

            Log::info('MarkdownController store MarkdownPost::create() after: ' . json_encode($post));
    
            Log::info('MarkdownController store end. ');
            return redirect()
                ->route('markdown.index')
                ->with('message', 'Post submitted successfully');
        } catch (\Exception $e) {
            Log::error('Post creation failed: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return redirect()
                ->route('markdown.index')
                ->with('error', 'Post creation failed');
        }
    }
}
