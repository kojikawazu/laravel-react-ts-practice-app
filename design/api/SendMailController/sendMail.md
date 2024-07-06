# メール送信 API 設計書

## エンドポイント

-   URL: /send-mail
-   メソッド: POST

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}
        -   Content-Type: multipart/form-data

    -   ボディ

```json
{
    "username": "string",
    "email": "string",
    "subject": "string",
    "content": "string",
    "file": "file (optional)"
}
```

-   レスポンス

    -   ステータスコード:

        -   200 OK - メール送信成功
        -   400 Bad Request - バリデーションエラー
        -   500 Internal Server Error - サーバーエラー

    -   レスポンスボディ(成功時):

```json
{
    "message": "Email sent successfully."
}
```

    -   レスポンスボディ(失敗時):

```json
{
    "error": "string"
}
```
