# いいね解除処理 API 設計書

## エンドポイント

-   URL: /markdown/{postId}/unlike
-   メソッド: DELETE

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}

    -   パスパラメータ:

        -   postId - いいねを解除する投稿の UUID

-   レスポンス

    -   ステータスコード:

        -   302 Found - リダイレクト成功
        -   404 Not Found - 投稿が存在しない場合
        -   500 Internal Server Error - サーバーエラー

    -   レスポンスボディ (エラー時):

```json
{
    "error": "string"
}
```
