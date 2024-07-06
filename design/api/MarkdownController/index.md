# 投稿一覧表示 API 設計書

## エンドポイント

-   URL: /markdown
-   メソッド: GET

-   リクエスト

    -   ヘッダー:
        -   Authorization: Bearer {token}

-   レスポンス

    -   ステータスコード:

        -   200 OK - リクエスト成功

    -   レスポンスボディ:

```json
{
    "component": "Markdown/MarkdownListPage",
    "props": {
        "posts": {
            "current_page": "int",
            "data": [
                {
                    "id": "uuid",
                    "title": "string",
                    "content": "string",
                    "image_path": "string",
                    "user_id": "bigint",
                    "created_at": "timestamp",
                    "updated_at": "timestamp",
                    "likeCounts": {
                        "emoji1": "int",
                        "emoji2": "int"
                    },
                    "currentEmoji": "string"
                }
            ],
            "first_page_url": "string",
            "from": "int",
            "last_page": "int",
            "last_page_url": "string",
            "links": [
                {
                    "url": "string",
                    "label": "string",
                    "active": "boolean"
                }
            ],
            "next_page_url": "string",
            "path": "string",
            "per_page": "int",
            "prev_page_url": "string",
            "to": "int",
            "total": "int"
        }
    }
}
```
