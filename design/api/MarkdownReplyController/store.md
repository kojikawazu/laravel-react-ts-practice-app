# 返信登録処理 API 設計書

## エンドポイント

-   URL: /markdown/{postId}/reply
-   メソッド: POST

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}
        -   Content-Type: application/json

    -   パスパラメータ:

        -   postId - 返信を登録する投稿の UUID

    -   ボディ:

```json
{
    "content": "string",
    "parent_id": "uuid (nullable)"
}
```

-   レスポンス

    -   ステータスコード:

        -   302 Found - リダイレクト成功
        -   400 Bad Request - バリデーションエラー
        -   404 Not Found - 投稿が存在しない場合
        -   500 Internal Server Error - サーバーエラー

    -   レスポンスボディ (エラー時):

```json
{
    "error": "string"
}
```
