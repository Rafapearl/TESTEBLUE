const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const Conn = require("./model/conn/index");

Conn(); //executa a func de conexao

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({ message: "API Rodando" });
});

const financeiroRouter = require("./routes/route");
app.use("/financeiro", financeiroRouter);

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
