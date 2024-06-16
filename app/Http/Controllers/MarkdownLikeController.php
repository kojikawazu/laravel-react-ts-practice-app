<?php

namespace App\Http\Controllers;

use App\Models\MarkdownLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use Inertia\Inertia;

/**
 * マークダウンいいねコントローラー
 */
class MarkdownLikeController extends Controller
{
    /**
     * いいね処理
     *
     * @param \Illuminate\Http\Request $request
     * @param uuid $postId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function like(Request $request, $postId)
    {

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

        MarkdownLike::where('post_id', $postId)
            ->where('user_id', Auth::id())
            ->delete();

        return back();
    }
}
