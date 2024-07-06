# 投稿編集画面表示 API 設計書

## エンドポイント

-   URL: /markdown/editor/{id}
-   メソッド: GET

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}

    -   パスパラメータ:

        -   id - 投稿の UUID

-   レスポンス

    -   ステータスコード:

        -   200 OK - リクエスト成功
        -   404 Not Found - 投稿が存在しない場合

    -   レスポンスボディ:

```json
{
    "component": "Markdown/MarkdownEditorPage",
    "props": {
        "post": {
            "id": "uuid",
            "title": "string",
            "content": "string",
            "image_path": "string",
            "user_id": "bigint",
            "created_at": "timestamp",
            "updated_at": "timestamp"
        },
        "message": "string",
        "error": "string"
    }
}
```
