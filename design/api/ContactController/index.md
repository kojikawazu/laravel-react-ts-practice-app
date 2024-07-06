# お問い合わせ画面表示 API 設計書

## エンドポイント

-   URL: /contact
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
    "component": "Contact/Contact",
    "props": {}
}
```
