# 投稿作成画面表示 API 設計書

## エンドポイント

-   URL: /markdown/creators
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
    "component": "Markdown/MarkdownCreatorPage",
    "props": {
        "message": "string",
        "error": "string",
        "status": "string"
    }
}
```
