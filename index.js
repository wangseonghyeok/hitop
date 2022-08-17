const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
const axios = require("axios");

const corsOption = {
  origin: "http://127.0.0.1:5502",
  credentials: true,
};

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8099);
const PORT = app.get("port");

app.use(express.static(path.join(__dirname, "/public"))); // 정적파일 css,js,images 등등을 서비스 해주는 경로 잡아주기.....
app.use(express.json()); // json을 리턴할려면
app.get("/", (req, res) => {
  //res.json({ name: "장성호" });
  //res.sendFile(path.join(__dirname, "/views/index.html"));
  res.render("index");
});
app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/introduce", (req, res) => {
  res.render("introduce", { title: "회사소개", mainTitle: "company" });
});

app.get("/greeting", (req, res) => {
  res.render("greeting", { title: "인사말", mainTitle: "company" });
});
app.get("/list", (req, res) => {
  //res.send("list입니당.");
  //res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5502");
  //res.header("Access-Control-Allow-Origin", "*");
  res.json([
    { title: "타이틀 01", contents: "내용1입니다." },
    { title: "타이틀 02", contents: "내용2입니다." },
    { title: "타이틀 03", contents: "내용3입니다." },
    { title: "타이틀 04", contents: "내용4입니다." },
    { title: "타이틀 05", contents: "내용5입니다." },
  ]);
});
app.get("/naver", (req, res) => {
  //여기서 naver에 검색을 요청해서
  // 결과를
  // Promise
  console.log(req.query);
  const queryTxt = encodeURIComponent(req.query.movieTitle);
  axios({
    url: `https://openapi.naver.com/v1/search/movie.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": "5vUtAmLfmqV7l_2Q4E2p",
      "X-Naver-Client-Secret": "Oq5AQ8LPzt",
    },
  }).then(function (response) {
    //console.log(response.data);
    res.json(response.data);
  });
  //res.json();
});
app.get("/movie", (req, res) => {
  res.render("naver");
});
// 404 routing오류....
app.use((req, res, next) => {
  res.status(404).render("404");
});
app.use((err, req, res, next) => {
  res.status(500).render("error", { msg: "An unknown error occurred." });
});
app.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
