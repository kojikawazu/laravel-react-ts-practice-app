# 投稿更新実行処理 API 設計書

## エンドポイント

-   URL: /markdown/{id}
-   メソッド: POST

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}
        -   Content-Type: multipart/form-data

    -   パスパラメータ:

        -   id - 更新する投稿の UUID

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
        -   404 Not Found - 投稿が存在しない場合
        -   500 Internal Server Error - サーバーエラー

    -   レスポンスヘッダー (リダイレクト成功時):

        -   Location: /markdown/editor/{id}

    -   レスポンスボディ (エラー時):

```json
{
    "error": "string"
}
```
