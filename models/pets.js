const conexao = require('../infraestrutura/conexao');
const uploadoDeArquivos = require('../files/uploadDeArquivos')

class Pets{

    lista(res){
        const sql = 'SELECT * FROM Pets;'
        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    adiciona(pet, res){
        const sql = 'INSERT INTO Pets SET ?';
        uploadoDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                const novoPet = {nome: pet.nome, imagem: novoCaminho}
                conexao.query(sql, novoPet, (erro, resultados) => {
                    if(erro){
                        res.status(400).json(erro)
                    } else {
                        res.status(201).json({id:resultados.insertId, ...novoPet})
                    }
                })
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Pets WHERE id=${id}`
        conexao.query(sql,(erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                const petEncontrado = resultados[0]
                if(petEncontrado){
                    res.status(200).json(petEncontrado);
                } else {
                    res.status(404).json({mensagem: "Nao há pets com o id passado"})
                }
            }
        })
    }

    altera(id, conteudo, res){
        const sql = 'UPDATE Pets SET ? WHERE id=?'
        conexao.query(sql, [conteudo, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(conteudo)
            }
        })
    }

    deleta(id, res){
        const sql = 'DELETE FROM Pets  WHERE id=?'
        conexao.query(sql, id, (erro) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Pets;