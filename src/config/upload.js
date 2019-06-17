/*
    Configurações de upload do arquivo de imagem
    Para salvar na pasta uploads
*/

const multer = require('multer');
//Formata os caminhos da maneira correta, entre ambientes windows e unix
const path = require('path'); 

/*
    Exportando configurações do multer
    filename: para salvar o nome exato do arquivo de imagem
*/
module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    }),
}
