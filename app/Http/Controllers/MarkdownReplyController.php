<?php

namespace App\Http\Controllers;

use App\Models\MarkdownReply;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use Illuminate\Http\Request;

/**
 * マークダウン返信コントローラー
 */
class MarkdownReplyController extends Controller
{
    /**
     * 返信登録
     * @param \Illuminate\Http\Request $request
     * @param uuid $postId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, $postId)
    {
        Log::info('Request data: ', $request->all());

        try {
            // バリデーションを試みる
            $validatedData = $request->validate([
                'content' => 'required',
                'parent_id' => 'nullable|exists:markdown_replies,id',
            ]);

            Log::info('Validated request data: ', $validatedData);

            // データの保存
            MarkdownReply::create([
                'content' => $validatedData['content'],
                'post_id' => $postId,
                'parent_id' => $validatedData['parent_id'],
                'user_id' => Auth::id(),
            ]);

            Log::info('MarkdownReply created successfully.');

            Log::info('MarkdownReplyController store end.');
            return back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            // バリデーションエラーをログに出力
            Log::error('Validation failed: ', $e->errors());
            return back()->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('An unexpected error occurred: ' . $e->getMessage());
            return back()->withErrors(['msg' => 'An unexpected error occurred.']);
        }
    }

    /**
     * 返信更新
     * @param \Illuminate\Http\Request $request
     * @param uuid $replyId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $replyId)
    {

        $request->validate([
            'content' => 'required',
        ]);

        $reply = MarkdownReply::findOrFail($replyId);
        $reply->update([
            'content' => $request->input('content'),
        ]);

        return back();
    }

    /**
     * 返信削除
     * @param uuid $replyId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($replyId)
    {
        $reply = MarkdownReply::findOrFail($replyId);
        $reply->delete();

        return back();
    }
}
