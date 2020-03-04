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
            if(!req.body.cpf && !req.body.photo){
                return res.status(400).send({message: "PARAMETER ERROR"});
            }
            var update = await User.updateOne({cpf: req.body.cpf}, {$set: {photo: req.body.photo}});
            user = await User.findOne({cpf: req.body.cpf});

            return res.status(201).send({message: "PHOTO UPLOADED", user, user});
            
        }catch(err){
            return res.status(400).send({message: "ERROR"});
        }
    }
}

