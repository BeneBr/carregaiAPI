const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/key');

module.exports = {
    async register(req, res){
        try{
            if(!req.body.fullName || !req.body.cpf || !req.body.phone || !req.body.password || !req.body.email){
                return res.status(400).send({message: "Parameter Error"})
            }
            var userExist = await User.find({cpf: req.body.cpf});
            if(userExist.length > 0){
               return res.status(400).send({message: "User Already Exists"}); 
            }else{
                const user = await User.create(req.body);
                return res.status(201).send({message: "Created with sucess"});
            }
        }catch(err){
            return res.status(400).send({error: "Bad request"});
        }
    },
    async login(req, res){
        try{
            if(!req.body.cpf || !req.body.password){
                return res.status(400).send({message: "Parameter Error"});
            }
            var user = await User.findOne({cpf: req.body.cpf});
            if(!user){
                return res.status(400).send({message: "USER NOT FOUND"});
            }
            if(!await bcrypt.compare(req.body.password, user.password)){
                return res.status(400).send({message: "INVALID PASSWORD"});
            }
            const userData = {fullName: user.fullName, cpf: user.cpf, ratting: user.ratting, photo: user.photo, phone: user.phone, email: user.email};
            const token = jwt.sign({cpf: user.cpf, id: user.id}, authConfig.secret, {expiresIn: 1800});
            user.password = undefined;
            return res.status(200).send({message: 'SUCESS LOGIN',token: token, user: userData});

        }catch(err){
            return res.status(400).send(err);
        }
    },
}