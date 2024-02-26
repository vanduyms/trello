import express from "express";

const app = express();

const hostname = 'localhost';
const port = 8017

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
});

app.listen(port, hostname, () => {
  console.log(`Hello, this server is running on ${port}`);
})