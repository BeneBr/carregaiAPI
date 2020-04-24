const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async getUsers(req, res){
        try{
            const users = User.find();
            return res.status(200).send({message: "Get all users with sucess"});
        }catch(err){

        }
    }, 
    async updateImage(req, res){
        try{
            if(!req.body.cpfCnpj && !req.body.foto){
                return res.status(400).send({message: "ERRO NOS PARAMETROS"});
            }
            var update = await User.updateOne({cpfCnpj: req.body.cpfCnpj}, {$set: {foto: req.body.foto}});
            return res.status(201).send({message: "FOTO ATUALIZADA"});
            
        }catch(err){
            return res.status(400).send({message: "ERRO INEXPERADO"});
        }
    },
}

