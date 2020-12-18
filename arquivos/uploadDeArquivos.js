const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeArquivo, callbackImagemSalva) => {

    const tipo = path.extname(caminho)
    const tiposValidos = ['jpeg', 'png', 'jpg']
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if(tipoEhValido){
        const caminhoNovo = `./assets/imagens/${nomeArquivo}${tipo}`
        
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(caminhoNovo))
        .on('finish', () => callbackImagemSalva(false, caminhoNovo))
    } else {
        console.log("Erro! Tipo invalido!");
        const erro = 'Tipo é inválido'
        callbackImagemSalva({erro})
    }
}
