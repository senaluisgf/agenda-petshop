const axios = require('axios');
const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(resultados => res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros))
    });

    app.post('/atendimentos', (req, res) => {
        Atendimento.adiciona(req.body)
            .then(resultados => res.status(201).json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id)
            .then(async (resultados) => {
                const atendimento = resultados[0]
                if (atendimento) {
                    const cpf = atendimento.cliente
                    api = `http://localhost:8082/${cpf}`
                    const { data } = await axios.get(api)
                    atendimento.cliente = data
                    res.status(200).json(atendimento)
                } else {
                    res.status(400).json("Atendimento nao encontrado")
                }
            })
            .catch(erro => res.status(400).json(erro))
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.altera(id, req.body)
            .then(resultados => {
                res.status(200).json(req.body)
            })
            .catch(erro => res.status(400).json(erro))
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.deleta(id)
            .then(resultados => {
                res.status(200).json(resultados)
            })
            .catch(erro => res.status(400).json(erro))
    })
}