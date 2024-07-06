# USERS テーブル定義

| カラム名          | データ型  | 制約          | 説明                     |
| ----------------- | --------- | ------------- | ------------------------ |
| id                | bigint    | PRIMARY KEY   | ユーザー ID              |
| name              | varchar   | NOT NULL      | ユーザー名               |
| email             | varchar   | NOT NULL      | ユーザーのメールアドレス |
| email_verified_at | timestamp | NULLABLE      | メール確認日時           |
| password          | varchar   | NOT NULL      | パスワード               |
| remember_token    | varchar   | NULLABLE      | トークン                 |
| created_at        | timestamp | NOT NULL      | 作成日時                 |
| updated_at        | timestamp | NOT NULL      | 更新日時                 |
| is_admin          | boolean   | DEFAULT false | 管理者フラグ             |

# MARKDOWN_POSTS テーブル定義

| カラム名   | データ型  | 制約        | 説明        |
| ---------- | --------- | ----------- | ----------- |
| id         | uuid      | PRIMARY KEY | 投稿 ID     |
| content    | text      | NOT NULL    | 投稿内容    |
| user_id    | bigint    | FOREIGN KEY | ユーザー ID |
| created_at | timestamp | NOT NULL    | 作成日時    |
| updated_at | timestamp | NOT NULL    | 更新日時    |
| title      | varchar   | NOT NULL    | タイトル    |
| image_path | varchar   | NULLABLE    | 画像パス    |

# MARKDOWN_LIKES テーブル定義

| カラム名   | データ型  | 制約        | 説明           |
| ---------- | --------- | ----------- | -------------- |
| id         | uuid      | PRIMARY KEY | いいね ID      |
| user_id    | bigint    | FOREIGN KEY | ユーザー ID    |
| created_at | timestamp | NOT NULL    | 作成日時       |
| updated_at | timestamp | NOT NULL    | 更新日時       |
| post_id    | uuid      | FOREIGN KEY | 投稿 ID        |
| emoji      | varchar   | NOT NULL    | いいねの絵文字 |

# MARKDOWN_REPLIES テーブル定義

| カラム名   | データ型  | 制約                  | 説明        |
| ---------- | --------- | --------------------- | ----------- |
| id         | uuid      | PRIMARY KEY           | 返信 ID     |
| content    | text      | NOT NULL              | 返信内容    |
| user_id    | bigint    | FOREIGN KEY           | ユーザー ID |
| created_at | timestamp | NOT NULL              | 作成日時    |
| updated_at | timestamp | NOT NULL              | 更新日時    |
| post_id    | uuid      | FOREIGN KEY           | 投稿 ID     |
| parent_id  | uuid      | NULLABLE, FOREIGN KEY | 親返信 ID   |
