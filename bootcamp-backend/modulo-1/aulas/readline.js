import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("digite um numero: ", (data) => {
  console.log(data);
  rl.close();
});
