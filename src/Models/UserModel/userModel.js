const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    nomeRazao: {
        type: String,
        require: true,
        lowercase: false,
    },
    cpfCnpj: {
        type: String,
        require: true,
    },
    telefone: {
        type: String,
        require: true,
    },
    empresa:{
        type: Boolean,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    foto:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    email : {
        type: String,
        require: true
    },
    totalPontos: {
        type: Number,
        default: 0.0
    },
    VotosTotais: {
        type: Number,
        default: 0,
    },
    pontos: {
        type: Number,
        default: 0.0,
    },
    saldo: {
        type: Number,
    },
    totalEntregas: {
        type: Number,
    },
    totalDemandas: {
        type: Number,
    },
    ativo: {
        type: Boolean,
    },
    codeVerification: {
        type: String,
    },
    veiculo:
        {
            marca: String,
            modelo: String,
            placa: String,
            color: String
        } 
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});



mongoose.model('User', UserSchema);