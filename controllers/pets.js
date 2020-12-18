const Pets = require('../models/pets');

module.exports = app => {
    app.get('/pets', (req, res) => Pets.lista(res))

    app.post('/pets', (req, res) => Pets.adiciona(req.body,res))

    app.get('/pets/:id', (req, res) => {
        const id = req.params.id;
        Pets.buscaPorId(id, res);
    })

    app.patch('/pets/:id', (req, res) => {
        const id = req.params.id;
        const conteudo = req.body;
        
        Pets.altera(id, conteudo, res);
    })

    app.delete('/pets/:id', (req, res) => {
        const id = req.params.id;
        Pets.deleta(id, res);
    })
}