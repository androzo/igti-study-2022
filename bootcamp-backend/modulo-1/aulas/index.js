import { promises as fs } from "fs";
import ev from "./events.js";

async function init() {
  try {
    await fs.writeFile("teste.txt", "começo \n");
    await fs.appendFile("teste.txt", "test123 \n");
    const data = await fs.readFile("teste.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function writeReadJson() {
  try {
    const arrayCarros = ["Gol", "Vectra", "Uno"];
    const obj = {
      carros: arrayCarros,
    };

    await fs.writeFile("teste.json", JSON.stringify(obj));
    const data = JSON.parse(await fs.readFile("teste.json"));
    data.carros.push("Sandero");
    console.log(data);
    await fs.writeFile("teste.json", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

ev.on("testEvent", () => {
  console.log("oie");
});

ev.emit("testEvent", "alala");
// init();
// writeReadJson();
