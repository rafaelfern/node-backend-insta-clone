const mongoose = require('mongoose');
//  Caso seja use SLQ é necessário usar o Sequelize.
/*
    timestamps:true cria dois campos em cada registro da base.
    createdAt e updateAt.

    Para trabalhar com imagens é necessário usar multpart form ao invés do JSON
    no insomnia

    Antes de testar a API no Insomnia é necessário a instalação do multer,
    que é uma lib que lida com dados multipart form 
*/
const PostSchema = new mongoose.Schema(
    {
        author: String,
        place: String,
        description: String,
        hashtags: String,
        image: String,
        likes: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Post', PostSchema);