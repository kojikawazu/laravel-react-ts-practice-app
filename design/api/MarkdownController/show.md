# 投稿詳細表示 API 設計書

## エンドポイント

-   URL: /markdown/{id}
-   メソッド: GET

-   リクエスト

    -   ヘッダー:
        -   Authorization: Bearer {token}

-   レスポンス

    -   ステータスコード:

        -   200 OK - リクエスト成功
        -   404 Not Found - 指定された ID の投稿が見つからない場合

    -   レスポンスボディ:

```json
{
    "component": "Markdown/MarkdownDetailPage",
    "props": {
        "post": {
            "id": "uuid",
            "title": "string",
            "content": "string",
            "image_path": "string",
            "user_id": "bigint",
            "created_at": "timestamp",
            "updated_at": "timestamp",
            "replies": [
                {
                    "id": "uuid",
                    "content": "string",
                    "user_id": "bigint",
                    "post_id": "uuid",
                    "created_at": "timestamp",
                    "updated_at": "timestamp",
                    "children": [
                        {
                            "id": "uuid",
                            "content": "string",
                            "user_id": "bigint",
                            "post_id": "uuid",
                            "parent_id": "uuid",
                            "created_at": "timestamp",
                            "updated_at": "timestamp"
                        }
                    ]
                }
            ]
        }
    }
}
```
