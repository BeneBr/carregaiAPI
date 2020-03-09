const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/key');
const nodemailer = require('nodemailer');

module.exports = {
    async register(req, res){
        try{
            if(!req.body.fullName || !req.body.cpf || !req.body.phone || !req.body.password || !req.body.email){
                return res.status(400).send({message: "Parameter Error"})
            }
            var userExist = await User.find({cpf: req.body.cpf});
            if(userExist.length > 0){
               return res.status(401).send({message: "User Already Exists"}); 
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
    async forgotPassword(req, res){
        try{
            if(!req.body.cpf){
                return res.status(400).send({message: "PARAMETER ERROR"});
            }
            var user = await User.findOne({cpf: req.body.cpf});
            var userEmail = await user.email;
            if(user == null){
                res.status(401).send({message: "USER NOT FOUND"});
            }else{
                const digit1 = Math.floor(Math.random() * 9).toString();
                const digit2 = Math.floor(Math.random() * 9).toString();
                const digit3 = Math.floor(Math.random() * 9).toString();
                const digit4 = Math.floor(Math.random() * 9).toString();
                const digit5 = Math.floor(Math.random() * 9).toString();
                const code = digit1+digit2+digit3+digit4+digit5;

                var update = await User.updateOne({cpf: req.body.cpf}, {$set: {codeVerification: code}});
                
               var transport = nodemailer.createTransport({host: 'smtp.mailtrap.io', port: '2525', auth: {user:'aa1edc4caa03fd',pass:'96d7d6cfeb67ea'}});
               var mailOptions = {from: 'naoresponder@carregaai.com.br', to: userEmail, subject: 'CODIGO DE VERIFICAÇÃO', text: code} 
               
               transport.sendMail(mailOptions, function(err,info){
                if(err){
                    return res.status(400).send({message: "ERROR"});
                }else{
                    return res.status(200).send({email: userEmail});
                }
               });
               
            }
            }catch(err){
                console.log(err);
        }
    },
    async codeVerify(req, res){
        try{
            if(!req.body.cpf || !req.body.code){
                return res.status(400).send({message: "PARAMETER ERROR"});
            }
            var user = await User.findOne({cpf: req.body.cpf});
            const codeVerification = await user.codeVerification;
            if(req.body.codeVerification != codeVerification){
                return res.status(200).send({message: "CODE OK"});
            }    
            return res.status(404).send({message: "CODE NOT FOUND"});
        }catch(err){
            console.log(err);
        }
    }
}