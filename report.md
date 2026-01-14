```mermaid
stateDiagram-v2
    direction LR

    state "/" as Top
    state "/komeda" as List
    state "/public/komeda_new.html" as New
    state "/komeda/:id" as Detail
    state "/komeda/edit/:id" as Edit

    [*] --> Top
    Top --> List : 3.コメダアプリ選択

    List --> New : 新規登録リンク
    List --> Detail : 詳細リンク

    New --> List : 登録ボタン(POST)

    Detail --> Edit : 編集ボタン
    Detail --> List : 削除ボタン(POST)

    Edit --> List : 更新ボタン(POST)
```