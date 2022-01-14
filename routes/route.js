const express = require("express"); //import do express
const router = express.Router(); //define app como express
const financeiro = require("../model/financeiro.js"); // import do modelo financeiro
router.get("/", (req, res) => {
  res.status(200).json({ message: "rota financeiro  ok" });
});

router.get("/listall", async (req, res) => {
  await financeiro
    .find({})
    .then((financeiro) => {
      //pega todo mundo do banco
      console.log(financeiro);
      res.status(200).json(financeiro);
    })
    .catch((err) => {
      res.status(204).json({ message: "Nada foi encontrado" });
      console.error(err);
    });
});

router.get("/listname/:Descricao", async (req, res) => {
  const id = req.params.Descricao; //recebendo Descricao por parametro
  await financeiro
    .find({ Descricao: id })
    .then((financeiro) => {
      //findOne retorna o primeiro que der match com o item passado
      console.log(financeiro);
      if (financeiro == null) {
        //validando se retorna null
        res.status(404).json({ message: "nao foi encontrado" });
      } else {
        res.status(200).json(financeiro);
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "Nada foi encontrado" });
      console.error(err);
    });
});

router.post("/add", async (req, res) => {
  //add nova financeiro no banco
  if (!req.body.Descricao || !req.body.Valor || !req.body.Atingido) {
    res.status(400).json({ message: "Preencha todos os campos" });
  }

  await financeiro
    .create(req.body)
    .then(() => {
      res.status(200).json({ message: "cadastrado com sucesso" });
    })
    .catch((err) => {
      res.status(400).json({ message: "algo esta errado" });
      console.error(err);
    });
});

router.put("/update/:id", async (req, res) => {
  //edita financeiro no banco
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "Não encontrado!" });
  } else if (!req.body.Descricao || !req.body.Valor || !req.body.Atingido) {
    res.status(400).json({ message: "Preencha todos os campos" });
  }

  await financeiro
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).json({ message: "alterado com sucesso" });
    })
    .catch((err) => {
      res.status(400).json({ message: "algo esta errado" });
      console.error(err);
    });
});

router.delete("/delete/:id", async (req, res) => {
  //edita financeiro no banco
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "Não encontrado!" });
  }

  await financeiro
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "deletado com sucesso" });
    })
    .catch((err) => {
      res.status(400).json({ message: "algo esta errado" });
      console.error(err);
    });
});

module.exports = router;
