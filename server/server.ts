const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

const { MongoClient } = require("mongodb");

let db;
// const url = process.env.VITE_MONGODB_URI;
const url =
  "mongodb+srv://admin:UQvL75MeO63Wy6MW@cluster0.xqvz8ke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(url);

new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("Guestbook");

    app.listen(5005, () => {
      console.log("http://localhost:5005 에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
