const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

//Exportando objeto que vai ter os métodos do controller
module.exports = {

    //Toda a rota da aplicação é um middleware
    async index(req, res) {
        // - Significa ordem decrescente
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body
        const { filename: image }  = req.file;
        //console.log(req.body);
        //console.log(req.file); //Mostra as informações do arquivo, no caso da imagem

        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            )
        //detela a imagem grande depois de redimensiona-la
        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image,
        });

        //Quando um novo post for enviado, emite uma info pra todos os usuários conectados à aplicação
        req.io.emit('post', post);

        return res.json(post);
    }
};