import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("GET /carros");
  res.send("GET /carros");
});

router.get("/precos", (req,res)=>{
  res.send("GET /precos")
})

export default router;
