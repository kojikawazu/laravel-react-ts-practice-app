# いいね処理 API 設計書

## エンドポイント

-   URL: /markdown/{postId}/like
-   メソッド: POST

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}
        -   Content-Type: application/json

    -   パスパラメータ:

        -   postId - いいねを付ける投稿の UUID

    -   ボディ:

```json
{
    "emoji": "string"
}
```

-   レスポンス

    -   ステータスコード:

        -   302 Found - リダイレクト成功
        -   400 Bad Request - バリデーションエラー
        -   500 Internal Server Error - サーバーエラー

    -   レスポンスヘッダー (リダイレクト成功時):

        -   Location: /markdown

    -   レスポンスボディ (エラー時):

```json
{
    "error": "string"
}
```
