import express from "express";
import { promises as fs, write } from "fs";
const { readFile } = fs;
import _ from "lodash";

global.fileName = "cars.json";
const router = express.Router();
const readCarsFile = async () => JSON.parse(await readFile(fileName));

const getOrderedBrandList = async () => {
  const data = await readCarsFile();
  const result = data
    .map((cars) => {
      return { marca: cars.brand, total: cars.models.length };
    })
    .sort((a, b) => a.total - b.total);

  const resultToArray = Object.values(_.groupBy(result, "total"));
  let newList = [];
  resultToArray.forEach((obj) => {
    newList.push({ total: obj[0].total, marcas: obj.map((a) => a.marca) });
  });

  return newList;
};

router.get("/maisModelos", async (req, res, next) => {
  try {
    let data = _.last(await getOrderedBrandList());
    const { total } = data;
    const result = data.marcas.map((obj) => {
      obj = `${obj} - ${total}`;
      return obj;
    });

    logger.info(JSON.stringify(result));
    res.send(JSON.stringify(result));
    logger.info("GET /maisModelos");
  } catch (error) {
    next(error);
  }
});

router.get("/menosModelos", async (req, res, next) => {
  try {
    let data = _.first(await getOrderedBrandList());
    const { total } = data;
    const result = data.marcas.map((obj) => {
      obj = `${obj} - ${total}`;
      return obj;
    });

    logger.info(JSON.stringify(result));
    res.send(JSON.stringify(result));
    logger.info("GET /menosModelos");
  } catch (error) {
    next(error);
  }
});

router.get("/listaMaisModelos/:count", async (req, res, next) => {
  try {
    const data = await getOrderedBrandList();
    const parsedData = [];
    data.reverse().forEach((a) => {
      a.marcas.sort().forEach((b) => {
        parsedData.push(`${b} - ${a.total}`);
      });
    });
    const result = parsedData.slice(0, req.params.count);
    res.send(JSON.stringify(result));
    logger.info("GET /listaMaisModelos");
  } catch (error) {
    next(error);
  }
});

router.get("/listaMenosModelos/:count", async (req, res, next) => {
  try {
    const data = await getOrderedBrandList();
    const parsedData = [];
    data.forEach((a) => {
      a.marcas.sort().forEach((b) => {
        parsedData.push(`${b} - ${a.total}`);
      });
    });
    const result = parsedData.slice(0, req.params.count);
    res.send(JSON.stringify(result));
    logger.info("GET /listaMenosModelos");
  } catch (error) {
    next(error);
  }
});

router.post("/listaModelos", async (req, res, next) => {
  try {
    let { nomeMarca } = req.body;
    if (!nomeMarca) {
      throw new Error("O parametro nomeMarca é obrigatório.");
    }
    const data = await readCarsFile();
    let result = data.find(
      (obj) => obj.brand.toLowerCase() === nomeMarca.toLowerCase()
    );

    !result ? res.send([]) : res.send(result.models);
    logger.info("POST /listaModelos");
  } catch (error) {
    next(error);
  }
});

// Tratamentos de erro
router.use("", (error, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} => ${error.message}`);
  res.status(400).send({ error: error.message });
});

export default router;
