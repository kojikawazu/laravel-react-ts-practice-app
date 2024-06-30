<?php

namespace App\Http\Controllers;

use App\Models\MarkdownPost;
use App\Models\MarkdownLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
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
            $post->image_path = $this->generatePresignedUrl($post->image_path);

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

        // 事前署名付きURLを生成
        $post->image_path = $this->generatePresignedUrl($post->image_path);

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
        $error = session('error');

        Log::debug('MarkdownController creator - session message: ' . ($message ?? 'none'));
        Log::debug('MarkdownController creator - session error: ' . ($error ?? 'none'));

        return Inertia::render('Markdown/MarkdownCreatorPage', [
            'message' => $message,
            'error' => $error,
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
        //Log::info('Request headers:', $request->headers->all());
        //Log::info('Request all:', $request->all());
        //Log::info('Request files:', $request->allFiles());

        $customMessages = [
            'content.required' => '投稿内容を入力してください。',
            'title.required' => 'タイトルを入力してください。',
            'title.max' => 'タイトルは255文字以内で入力してください。',
            'imageFile.required' => '画像を選択してください。',
            'imageFile.mimes' => '画像はjpg, jpeg, png, gif形式のみアップロード可能です。',
            'imageFile.max' => '画像のサイズが大きすぎます。',
        ];

        $data = $request->validate([
            'content' => 'required',
            'title' => 'required|string|max:255',
            'imageFile' => 'required|file|mimes:jpg,jpeg,png,gif|max:2048',
        ], $customMessages);

        Log::info('Request data validated: ' . json_encode($data));
        DB::beginTransaction();

        $post = new MarkdownPost();
        $post->content = $data['content'];
        $post->title = $data['title'];
        $post->user_id = Auth::id();

        try {
            if ($request->hasFile('imageFile')) {
                $file = $request->file('imageFile');
                Log::debug('File info:', [
                    'name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime' => $file->getMimeType(),
                    'path' => $file->path(),
                    'extension' => $file->extension(),
                ]);

                try {
                    // ファイル名をハッシュ化
                    $extension = $file->getClientOriginalExtension();
                    $hashedFileName = hash('sha256', $file->getClientOriginalName() . Str::random(10)) . '.' . $extension;
                    Log::debug('Hashed file name: ' . $hashedFileName);

                    // S3にアップロード
                    $directory = 'post';
                    $path = Storage::disk('s3')->putFileAs($directory, $file, $hashedFileName);
                    if ($path) {
                        Log::info('File stored at path: ' . $path);
                        // ファイルパスを保存(ファイル名のみ)
                        $post->image_path = str_replace($directory . '/', '', $path);
                        Log::info('File save path: ' . $post->image_path);
                    } else {
                        Log::error('File was not stored on S3');
                        return response()->json(['error' => 'File was not stored on S3'], 500);
                    }
                } catch (\Exception $e) {
                    Log::error('File upload to S3 failed: ' . $e->getMessage());
                    Log::error('Exception trace: ' . $e->getTraceAsString());
                    return response()->json(['error' => 'File upload failed: ' . $e->getMessage()], 500);
                }
            } else {
                Log::info('No file received in request');
            }

            Log::info('MarkdownController store MarkdownPost::store() before. ');
            $post->save();
            DB::commit();
            Log::info('MarkdownController store MarkdownPost::store() after: ' . json_encode($post));
    
            session()->flash('message', 'Post submitted successfully');            
            return Inertia::location(route('markdown.creator'));

        } catch (\Exception $e) {
            DB::rollBack();

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
        $error   = session('error');
    
        // 事前署名付きURLを生成
        $post->image_path = $this->generatePresignedUrl($post->image_path);

        Log::debug('MarkdownController editor - session message: ' . ($message ?? 'none'));
        Log::debug('MarkdownController editor - session error: ' . ($error ?? 'none'));

        return Inertia::render('Markdown/MarkdownEditorPage', [
            'post' => $post,
            'message' => $message,
            'error' => $error,
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
        $customMessages = [
            'content.required' => '投稿内容を入力してください。',
            'title.required' => 'タイトルを入力してください。',
            'title.max' => 'タイトルは255文字以内で入力してください。',
            'imageFile.required' => '画像を選択してください。',
            'imageFile.mimes' => '画像はjpg, jpeg, png, gif形式のみアップロード可能です。',
            'imageFile.max' => '画像のサイズが大きすぎます。',
        ];

        $data = $request->validate([
            'content' => 'required',
            'title' => 'required|string|max:255',
            'imageFile' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048',
        ], $customMessages);

        Log::info('Request data validated: ' . json_encode($data));
        DB::beginTransaction();

        try {
            Log::info('MarkdownController update MarkdownPost::find() before. ');
            $post = MarkdownPost::findOrFail($id);
            Log::info('MarkdownController update MarkdownPost::find() before: ' . json_encode($post));

            if ($request->hasFile('imageFile')) {
                $file = $request->file('imageFile');
                $post->image_path = $this->uploadToS3($file);
                $uploadedFilePath = $this->uploadToS3($file);
                if ($uploadedFilePath) {
                    $post->image_path = $uploadedFilePath;
                } 
            }

            $post->content = $data['content'];
            $post->title   = $data['title'];
            $post->user_id = Auth::id();
            $post->save();
            DB::commit();

            Log::info('MarkdownController update MarkdownPost::find() after: ' . json_encode($post));
    
            session()->flash('message', 'Post updated successfully');            
            return Inertia::location(route('markdown.editor', ['id' => $id]));

        } catch (\Exception $e) {
            DB::rollBack();
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
        DB::beginTransaction();

        try {
            Log::info('MarkdownController destroy MarkdownPost::find() before. ');

            $post = MarkdownPost::findOrFail($id);
            Log::info('MarkdownController destroy MarkdownPost::find() before: ' . json_encode($post));

            $post->delete();
            DB::commit();

            Log::info('MarkdownController destroy MarkdownPost::find() after: ' . json_encode($post));
    
            session()->flash('message', 'Post deleted successfully');
            return Inertia::location(route('markdown.index'));

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Post delete failed: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            session()->flash('error', 'Post delete failed');
            return Inertia::location(route('markdown.index'));
        }
    }

    /**
     * 事前署名付きURLを生成
     * 
     * @param string $image_path 画像パス
     * @return string 事前署名付きURL
     */
    private function generatePresignedUrl($image_path)
    {
        if ($image_path) {
            $tempImagePath = 'post/' . $image_path;
            $changeImagePath = Storage::disk('s3')->temporaryUrl($tempImagePath, now()->addMinutes(20));
        } else {
            $changeImagePath = null;
        }
    
        return $changeImagePath;
    }

    /**
     * S3にアップロード
     * 
     * @param \Illuminate\Http\UploadedFile $file
     * @return string|null
     */
    private function uploadToS3($file)
    {
        try {
            // ファイル名をハッシュ化
            $extension = $file->getClientOriginalExtension();
            $hashedFileName = hash('sha256', $file->getClientOriginalName() . Str::random(10)) . '.' . $extension;
            Log::debug('Hashed file name: ' . $hashedFileName);

            // S3にアップロード
            $directory = 'post';
            $path = Storage::disk('s3')->putFileAs($directory, $file, $hashedFileName);
            if ($path) {
                Log::info('File stored at path: ' . $path);
                $changeImagePath = str_replace($directory . '/', '', $path);
                Log::info('File save path: ' . $changeImagePath);
                return $changeImagePath;
            } else {
                Log::error('File was not stored on S3');
                return null;
            }
        } catch (\Exception $e) {
            Log::error('File upload to S3 failed: ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
            return null;
        }
    }
}
