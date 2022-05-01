import express from "express";

const app = express();
app.use(express.json());

app.use("/images/", express.static("aulas/public"));

app.listen(3000, () => {
  console.log("API started");
});
