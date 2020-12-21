const conexao = require('../infraestrutura/database/conexao');
const moment = require('moment');
const axios = require('axios');
const repositories = require('../repositories/atendimento')

class Atendimento {

    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteEhValido = ({tamanho}) => tamanho >= 5;
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: "data de agendamento deve ser igual ou maior a data atual"
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: "nome do cliente deve conter 5 ou mais letras"
            }
        ];
        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]

                return !campo.valido(parametro)
            })
    }
    adiciona(atendimento) {

        const dataCriacao = new Date();
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros);
        const existemErros = erros.length;

        if (!existemErros) {

            const atendimentoComData = { ...atendimento, dataCriacao, data }

            return repositories.adiciona(atendimentoComData)
                .then(resultados => {
                    return ({ id: resultados.insertId, ...atendimento })
                })

        } else {

            return new Promise((resolve, reject) => reject(erros))
        }
    }

    lista() {

        return repositories.lista()
    }

    buscaPorId(id) {

        return repositories.buscaPorId(id)
    }

    altera(id, valores) {
        if (valores.data) {
            const data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
            valores.data = data
        }

        return repositories.altera(id, valores)
    }

    deleta(id) {
        return repositories.deleta(id)
    }
}

module.exports = new Atendimento;