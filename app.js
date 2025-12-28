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

let summit_artists = [
    { name: 'PUNPEE', song: 'タイムマシーンにのって', year: 2006 },
    { name: 'BIM', song: 'Bonita', year: 2012 },
    { name: 'OMSB', song: '大衆', year: 2009 }
];

let komeda_menu = [
    { name: 'シロノワール クルミッ子', type: 'デザート', review: '限定シロノワールの中で一番好き' },
    { name: 'キャラメルオーレ クルミッ子', type: 'ドリンク', review: '甘くておいしい' },
    { name: 'アイスオーレ', type: 'ドリンク', review: '甘み入りがおいしかった' },
    { name: 'カビゴンのサルサチキンカツパン', type: 'スナック', review: 'ピリ辛でおいしい' },
    { name: '小倉トースト', type: 'スナック', review: 'あんことバターがおいしい' },
    { name: 'アイスココア', type: 'ドリンク', review: '上に乗ってるソフトクリームがでかい' },
    { name: 'たっぷりたまごのピザトースト', type: 'スナック', review: '量があって満足' },
    { name: 'ミックスサンド', type: 'スナック', review: '途中で飽きた' },
    { name: 'ごちそうカスタード', type: 'デザート', review: '今のケーキの中で一番好き' },
    { name: 'クロネージュ', type: 'デザート', review: '他にないような味' },
    { name: 'フラッペ ブルーベリーヨーグルト', type: 'ドリンク', review: 'さっぱりめでおいしい' },
    { name: 'エビカツパン', type: 'フード', review: 'カツパンの中で一番好き' }
];

app.get("/", (req, res) => {
    res.send(`
        <h2>トップページ</h2>
        <ul>
            <li><a href="/movies">1. 映画鑑賞記録</a></li>
            <li><a href="/summit">2. SUMMIT所属アーティスト</a></li>
            <li><a href="/komeda">3. コメダ珈琲店食べたメニュー</a></li>
        </ul>
    `);
});

app.get("/movies", (req, res) => {
    res.render('movies', { data: movie_logs });
});

app.get("/movies/create", (req, res) => {
    res.redirect('/public/movies_new.html');
});

app.post("/movies/create", (req, res) => {
    const title = req.body.title;
    const director = req.body.director;
    const rating = req.body.rating;
    const memo = req.body.memo;

    movie_logs.push({
        title: title,
        director: director,
        rating: rating,
        memo: memo
    });

    res.redirect('/movies');
});

app.get("/movies/:id", (req, res) => {
    const id = req.params.id;
    const movie = movie_logs[id];

    if (movie === undefined) {
        return res.status(404).send("指定されたIDのデータは見つかりません。<a href='/movies'>一覧に戻る</a>");
    }

    res.render('movies_detail', { id: id, data: movie });
});

app.get("/movies/edit/:id", (req, res) => {
    const id = req.params.id;
    const movie = movie_logs[id];

    if (movie === undefined) {
        return res.status(404).send("データが見つかりません。");
    }

    res.render('movies_edit', { id: id, data: movie });
});

app.post("/movies/update/:id", (req, res) => {
    const id = req.params.id;
    
    movie_logs[id] = {
        title: req.body.title,
        director: req.body.director,
        rating: req.body.rating,
        memo: req.body.memo
    };

    res.redirect('/movies');
});

app.post("/movies/delete/:id", (req, res) => {
    const id = req.params.id;
    movie_logs.splice(id, 1);
    res.redirect('/movies');
});

app.get("/summit", (req, res) => {
    res.render('summit', { data: summit_artists });
});

app.get("/summit/create", (req, res) => {
    res.redirect('/public/summit_new.html');
});

app.post("/summit/create", (req, res) => {
    summit_artists.push({
        name: req.body.name,
        song: req.body.song,
        year: req.body.year
    });
    res.redirect('/summit');
});

app.get("/summit/:id", (req, res) => {
    const id = req.params.id;
    const artist = summit_artists[id];
    if (artist === undefined) {
        return res.status(404).send("データが見つかりません。<a href='/summit'>一覧に戻る</a>");
    }
    res.render('summit_detail', { id: id, data: artist });
});

app.get("/summit/edit/:id", (req, res) => {
    const id = req.params.id;
    const artist = summit_artists[id];
    if (artist === undefined) {
        return res.status(404).send("データが見つかりません。");
    }
    res.render('summit_edit', { id: id, data: artist });
});

app.post("/summit/update/:id", (req, res) => {
    const id = req.params.id;
    summit_artists[id] = {
        name: req.body.name,
        song: req.body.song,
        year: req.body.year
    };
    res.redirect('/summit');
});

app.post("/summit/delete/:id", (req, res) => {
    const id = req.params.id;
    summit_artists.splice(id, 1);
    res.redirect('/summit');
});

app.get("/komeda", (req, res) => {
    res.render('komeda', { data: komeda_menu });
});

app.get("/komeda/create", (req, res) => {
    res.redirect('/public/komeda_new.html');
});

app.post("/komeda/create", (req, res) => {
    komeda_menu.push({
        name: req.body.name,
        type: req.body.type,
        review: req.body.review
    });
    res.redirect('/komeda');
});

app.get("/komeda/:id", (req, res) => {
    const id = req.params.id;
    const menu = komeda_menu[id];
    if (menu === undefined) {
        return res.status(404).send("データが見つかりません。<a href='/komeda'>一覧に戻る</a>");
    }
    res.render('komeda_detail', { id: id, data: menu });
});

app.get("/komeda/edit/:id", (req, res) => {
    const id = req.params.id;
    const menu = komeda_menu[id];
    if (menu === undefined) {
        return res.status(404).send("データが見つかりません。");
    }
    res.render('komeda_edit', { id: id, data: menu });
});

app.post("/komeda/update/:id", (req, res) => {
    const id = req.params.id;
    komeda_menu[id] = {
        name: req.body.name,
        type: req.body.type,
        review: req.body.review
    };
    res.redirect('/komeda');
});

app.post("/komeda/delete/:id", (req, res) => {
    const id = req.params.id;
    komeda_menu.splice(id, 1);
    res.redirect('/komeda');
});

app.use((req, res, next) => {
    res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Server listening on port 8080!"));