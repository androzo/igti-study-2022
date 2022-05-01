import express from "express";
import carrosRouter from "./expressRouter.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}]-${req.method}-${req.ip}-${req.path}`
  );
  next();
});

app.use("/carros", carrosRouter);

app.all("/testeAll", (req, res) => {
  res.send(req.method);
});

app.get("/teste+", (_, res) => {
  res.send("works");
});

app.get("/teste12?", (_, res) => {
  res.send("works");
});

app.get("/teste1(ing)?", (_, res) => {
  res.send("works");
});

// parametros na rota
app.get("/testParam/:id", (req, res) => {
  res.send(req.params.id);
});

// expressao regular
app.get(/.*Red$/, (req, res) => {
  res.send("/.*Red$/");
});

// params via query
app.get("/testeQuery", (req, res) => {
  res.send(req.query);
});

//next
app.get(
  "/testMultipleHandlers",
  (req, res, next) => {
    console.log("callback 1");
    next();
  },
  (req, res) => {
    console.log("callback 2");
    res.end();
  }
);

// next com array
const callback1 = (req, res, next) => {
  console.log("callback 1");
  next();
};

const callback2 = (req, res, next) => {
  console.log("callback 2");
  res.end();
};

const callback3 = (req, res, next) => {
  console.log("callback 3");
  res.end();
};

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

//route

app
  .route("/routes")
  .get((req, res) => {
    res.send("GET");
  })
  .post((req, res) => {
    res.send("POST");
  })
  .delete((req, res) => {
    res.send("DELETE");
  });

app.listen(3000, () => {
  console.log("API has just started");
});
