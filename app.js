"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let movie_logs = [
    { title: 'インセプション', director: 'クリストファー・ノーラン', rating: 5, memo: 'ラストが衝撃的' },
    { title: 'RRR', director: 'S.S.ラージャマウリ', rating: 5, memo: 'ナートゥダンス最高' },
    { title: 'ゴジラ-1.0', director: '山崎貴', rating: 4, memo: '迫力がすごい' }
];

app.get("/", (req, res) => {
    res.send('トップページです。<br><a href="/movies">映画鑑賞記録へ</a>');
});

app.get("/movies", (req, res) => {
    res.render('movies', { data: movie_logs });
});

app.get("/movies/:id", (req, res) => {
    const id = req.params.id;
    const movie = movie_logs[id];
    res.render('movies_detail', { id: id, data: movie });
});

app.use((req, res, next) => {
    res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Server listening on port 8080!"));