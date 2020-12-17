const fs = require('fs')

fs.createReadStream('./assets/doguinho.jpeg')
    .pipe(fs.createWriteStream('./assets/doguinho-stream.jpeg'))
    .on('finish', () => console.log('a imagem foi escrita com sucesso'))