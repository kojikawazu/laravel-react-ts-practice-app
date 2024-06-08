<?php

namespace App\Http\Controllers;

use App\Models\MarkdownPost;
use App\Models\MarkdownLike;
use Illuminate\Http\Request;
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
        Log::info('MarkdownController index start.');
        
        //$posts = MarkdownPost::all();
        $posts = MarkdownPost::with('likes')->get()->map(function($post) {
            $likeCounts = $post->likes->groupBy('emoji')->map(function($group) {
                return $group->count();
            });
        
            $post->likeCounts = $likeCounts;
            $userLike = $post->likes->where('user_id', Auth::id())->first();
            $post->currentEmoji = $userLike ? $userLike->emoji : null;
            return $post;
        });

        Log::info('MarkdownController index end.');
        return Inertia::render('Markdown/MarkdownListPage', [
            'posts' => $posts,
        ]);
    }

    /**
     * 詳細表示
     *
     * @param int $id
     * @return \Inertia\Response Markdown/MarkdownDetailPage
     */
    public function show($id)
    {
        Log::info('MarkdownController index start.');
        
        $post = MarkdownPost::findOrFail($id);

        Log::info('MarkdownController showshow end.');
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
        Log::info('MarkdownController creator start.');

        $message = session('message');
        Log::info('MarkdownController creator - session message: ' . ($message ?? 'none'));

        Log::info('MarkdownController creator end.');
        return Inertia::render('Markdown/MarkdownCreatorPage', [
            'message' => $message,
            'status' => session('status'),
        ]);
    }

    /**
     * 作成処理
     *
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
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
    
            session()->flash('message', 'Post submitted successfully');            
            Log::info('MarkdownController store end.');
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
     * @param int $id
     * @return \Inertia\Response Markdown/MarkdownEditorPage
     */
    public function editor($id)
    {
        Log::info('MarkdownController editor start.');

        $post    = MarkdownPost::findOrFail($id);
        $message = session('message');

        Log::info('MarkdownController editor end.');
        return Inertia::render('Markdown/MarkdownEditorPage', [
            'message' => $message,
            'post' => $post,
        ]);
    }
    
    /**
     * 更新処理
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Inertia\Response
     */
    public function update(Request $request, $id)
    {
        Log::info('MarkdownController update start.');

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
            Log::info('MarkdownController update end.');
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
     * @param int $id
     * @return \Inertia\Response
     */
    public function destroy($id)
    {
        Log::info('MarkdownController destroy start.');

        try {
            Log::info('MarkdownController destroy MarkdownPost::find() before. ');

            $post = MarkdownPost::findOrFail($id);
            Log::info('MarkdownController destroy MarkdownPost::find() before: ' . json_encode($post));

            $post->delete();

            Log::info('MarkdownController destroy MarkdownPost::find() after: ' . json_encode($post));
    
            session()->flash('message', 'Post deleted successfully');            
            Log::info('MarkdownController destroy end.');
            return Inertia::location(route('markdown.index'));

        } catch (\Exception $e) {
            Log::error('Post delete failed: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            session()->flash('error', 'Post delete failed');
            return Inertia::location(route('markdown.index'));
        }
    }

    /**
     * いいね処理
     *
     * @param \Illuminate\Http\Request $request
     * @param uuid $postId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function like(Request $request, $postId)
    {
        Log::info('MarkdownController like start.');

        $data = $request->validate([
            'emoji' => 'required|string',
        ]);

        Log::info('Request data validated: ' . json_encode($data));

        $like = MarkdownLike::updateOrCreate(
            [
                'post_id' => $postId,
                'user_id' => Auth::id(),
            ],
            [
                'emoji' => $request->emoji,
            ]
        );

        Log::info('Request data validated: ' . json_encode($like));
        return back();
    }

    /**
     * いいね解除処理
     *
     * @param uuid $postId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function unlike($postId)
    {
        Log::info('MarkdownController unlike start.');

        MarkdownLike::where('post_id', $postId)
            ->where('user_id', Auth::id())
            ->delete();

        Log::info('MarkdownController unlike end.');
        return back();
    }
}
