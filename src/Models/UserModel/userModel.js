const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        require: true,
        lowercase: false,
    },
    cpf: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    photo: {
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
    totalRAtting: {
        type: Number,
        default: 0
    },
    totalVotes: {
        type: Number,
        default: 0,
    },
    ratting: {
        type: Number,
        default: 0,
    },
    balance: {
        type: Number,
    },
    totalDeliverys: {
        type: Number,
    },
    totalDemands: {
        type: Number,
    },
    active: {
        type: Boolean,
    },
    car:
        {
            brand: String,
            model: String,
            board: String,
            color: String
        } 
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});



mongoose.model('User', UserSchema);