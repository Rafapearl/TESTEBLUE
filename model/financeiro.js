const mongoose = require("mongoose"); //importando o mongoose

const financeiroModel = new mongoose.Schema({
  //criando nosso modelo do banco
  Descricao: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
  Valor: { type: Number, required: true },
  Atingido: { type: Boolean, required: true },
  dataCriacao: { type: Date, default: Date.now }, //default, valor padrao caso nao seja passado
});

const financeiro = mongoose.model("financeiro", financeiroModel); // a criacao do modelo na colection financeiro

module.exports = financeiro; //exportando o modelo pronto
