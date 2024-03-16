require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000


const mongoose = require('mongoose')

const Cliente = mongoose.model('Cliente', {
    nome: String,
    sobrenome: String,
    idade: String,
    email: String,
    senha: String
})


app.use(express.json())


app.post("/", async (req, res) => {
    const cliente = new Cliente({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        email: req.body.email,
        senha: req.body.senha
    });

    await cliente.save()
    res.send(cliente)
})


app.get("/", async (req, res) => {
    const clientes = await Cliente.find()
    return res.send(clientes)
})


app.put("/:id", async(req, res) => {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        email: req.body.email,
        senha: req.body.senha
    }, {
        new: true
    })

    return res.send(cliente)
})


app.delete("/:id", async (req, res) => {
    const cliente = await Cliente.findOneAndDelete({_id:req.params.id})
    return res.send(cliente)
})


app.listen(port, () => {
    mongoose.connect(process.env.STRINGCONNECTION)
    console.log('Servidor Iniciado')
})