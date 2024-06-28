<?php

namespace App\Http\Controllers;

use App\Models\MarkdownPost;
use App\Models\MarkdownLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use Inertia\Inertia;

/**
 * マークダウンコントローラー
 */
class MarkdownController extends Controller
{
    /**
     * 一覧表示
     *
     * @return \Inertia\Response Markdown/MarkdownListPage
     */
    public function index()
    {
        
        //$posts = MarkdownPost::all();
        $posts = MarkdownPost::with('likes')->get()->map(function($post) {
            $likeCounts = $post->likes->groupBy('emoji')->map(function($group) {
                return $group->count();
            });
        
            $post->likeCounts = $likeCounts;
            $userLike = $post->likes->where('user_id', Auth::id())->first();
            $post->currentEmoji = $userLike ? $userLike->emoji : null;

            // 事前署名付きURLを生成
            if ($post->image_path) {
                $imagePath = 'post/' . $post->image_path;
                $post->image_path = Storage::disk('s3')->temporaryUrl($imagePath, now()->addMinutes(20));
            } else {
                $post->image_path = null;
            }

            return $post;
        });

        return Inertia::render('Markdown/MarkdownListPage', [
            'posts' => $posts,
        ]);
    }

    /**
     * 詳細表示
     *
     * @param uuid $id
     * @return \Inertia\Response Markdown/MarkdownDetailPage
     */
    public function show($id)
    {
        
        // markdown_posts と markdown_replies テーブルを結合し、
        // 指定された ID の投稿とその返信を取得
        // + α として、返信の返信も取得
        $post = MarkdownPost::with(['replies' => function ($query) {
            $query->with('children');
        }])->findOrFail($id);

        return Inertia::render('Markdown/MarkdownDetailPage', [
            'post' => $post,
        ]);
    }

    /**
     * 作成画面表示
     *
     * @return \Inertia\Response Markdown/MarkdownCreatorPage
     */
    public function creator()
    {

        $message = session('message');
        Log::info('MarkdownController creator - session message: ' . ($message ?? 'none'));

        return Inertia::render('Markdown/MarkdownCreatorPage', [
            'message' => $message,
            'status' => session('status'),
        ]);
    }

    /**
     * 作成実行処理
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function store(Request $request)
    {

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
    
            session()->flash('message', 'Post submitted successfully');            
            return Inertia::location(route('markdown.creator'));

        } catch (\Exception $e) {
            Log::error('Post creation failed: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            session()->flash('error', 'Post creation failed');
            return Inertia::location(route('markdown.creator'));
        }
    }

    /**
     * 編集画面表示
     *
     * @param uuid $id
     * @return \Inertia\Response Markdown/MarkdownEditorPage
     */
    public function editor($id)
    {

        $post    = MarkdownPost::findOrFail($id);
        $message = session('message');

        return Inertia::render('Markdown/MarkdownEditorPage', [
            'message' => $message,
            'post' => $post,
        ]);
    }
    
    /**
     * 更新実行処理
     *
     * @param \Illuminate\Http\Request $request
     * @param uuid $id
     * @return \Inertia\Response
     */
    public function update(Request $request, $id)
    {

        $data = $request->validate([
            'content' => 'required',
        ]);

        Log::info('Request data validated: ' . json_encode($data));

        try {
            Log::info('MarkdownController update MarkdownPost::find() before. ');

            $post = MarkdownPost::findOrFail($id);
            Log::info('MarkdownController update MarkdownPost::find() before: ' . json_encode($post));

            $post->update([
                'content' => $data['content'],
            ]);

            Log::info('MarkdownController update MarkdownPost::find() after: ' . json_encode($post));
    
            session()->flash('message', 'Post updated successfully');            
            return Inertia::location(route('markdown.editor', ['id' => $id]));

        } catch (\Exception $e) {
            Log::error('Post update failed: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            session()->flash('error', 'Post update failed');
            return Inertia::location(route('markdown.editor', ['id' => $id]));
        }
    }

    /**
     * 削除処理
     *
     * @param uuid $id
     * @return \Inertia\Response
     */
    public function destroy($id)
    {

        try {
            Log::info('MarkdownController destroy MarkdownPost::find() before. ');

            $post = MarkdownPost::findOrFail($id);
            Log::info('MarkdownController destroy MarkdownPost::find() before: ' . json_encode($post));

            $post->delete();

            Log::info('MarkdownController destroy MarkdownPost::find() after: ' . json_encode($post));
    
            session()->flash('message', 'Post deleted successfully');
            return Inertia::location(route('markdown.index'));

        } catch (\Exception $e) {
            Log::error('Post delete failed: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            session()->flash('error', 'Post delete failed');
            return Inertia::location(route('markdown.index'));
        }
    }
}
