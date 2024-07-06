# 返信更新処理 API 設計書

## エンドポイント

-   URL: /markdown/reply/{replyId}
-   メソッド: PUT

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}
        -   Content-Type: application/json

    -   パスパラメータ:

        -   replyId - 更新する返信の UUID

    -   ボディ:

```json
{
    "content": "string"
}
```

-   レスポンス

    -   ステータスコード:

        -   302 Found - リダイレクト成功
        -   400 Bad Request - バリデーションエラー
        -   404 Not Found - 返信が存在しない場合
        -   500 Internal Server Error - サーバーエラー

    -   レスポンスボディ (エラー時):

```json
{
    "error": "string"
}
```
