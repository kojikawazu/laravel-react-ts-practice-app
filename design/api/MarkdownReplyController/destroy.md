# 返信削除処理 API 設計書

## エンドポイント

-   URL: /markdown/reply/{replyId}
-   メソッド: DELETE

-   リクエスト

    -   ヘッダー:

        -   Authorization: Bearer {token}

    -   パスパラメータ:

        -   replyId - 削除する返信の UUID

    -   ボディ:

```json
{
    "content": "string"
}
```

-   レスポンス

    -   ステータスコード:

        -   302 Found - リダイレクト成功
        -   404 Not Found - 返信が存在しない場合
        -   500 Internal Server Error - サーバーエラー

    -   レスポンスボディ (エラー時):

```json
{
    "error": "string"
}
```
