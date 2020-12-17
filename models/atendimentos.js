const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = new Date();
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: "data de agendamento deve ser igual ou maior a data atual"
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: "nome do cliente deve conter 5 ou mais letras"
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(!existemErros){

            const atendimentoComData = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?';
    
            conexao.query(sql, atendimentoComData, (erro, resultado) => {
                if(erro){
                    res.status(400).json(erro);
                } else {
                    res.status(201).json({id:resultado.insertId, ...atendimento});
                }
            })
        } else {
            res.status(400).json(erros);
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE Atendimentos.id=${id}`;

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            } else {
                const atendimento = resultados[0]
                if(atendimento){
                    res.status(200).json(atendimento)
                } else {
                    res.status(404).json({
                        mensagem: "atendimento nao encontrado"
                    })
                }
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json({id, ...valores})
            }
        });
    }

    deleta(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento;