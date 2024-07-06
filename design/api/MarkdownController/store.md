# 投稿作成実行処理 API 設計書

## エンドポイント

-   URL: /markdown
-   メソッド: POST

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}
        -   Content-Type: multipart/form-data

    -   ボディ:

```json
{
    "title": "string",
    "content": "string",
    "imageFile": "file"
}
```

-   レスポンス

    -   ステータスコード:

        -   302 Found - リダイレクト成功
        -   400 Bad Request - バリデーションエラー
        -   500 Internal Server Error - サーバーエラー

    -   レスポンスヘッダー (リダイレクト成功時):

        -   Location: /markdown/creator

    -   レスポンスボディ (エラー時):

```json
{
    "error": "string"
}
```
