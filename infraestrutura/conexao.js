const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'luis.sena',
    database: "agenda_petshop"
});

module.exports = conexao;