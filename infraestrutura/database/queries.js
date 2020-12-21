const conexao = require('./conexao')

const executaQuery = (query, parametros = '') => {

    return new Promise((resolve, reject) => {

        conexao.query(query, parametros, (erro, resultados) => {

            if(erro){
                reject(erro)
            } else {
                resolve(resultados)
            }
        })
    })
}

module.exports = executaQuery