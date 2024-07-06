# テーブルカラム一覧 API 設計書

## エンドポイント

-   URL: /table-columns
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
    "component": "Admin/Tables",
    "props": {
        "tableColumns": {
            "table_name_1": [
                "column_name_1",
                "column_name_2",
                ...
            ],
            "table_name_2": [
                "column_name_1",
                "column_name_2",
                ...
            ],
            ...
        }
    }
}
```
