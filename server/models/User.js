const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    username : {
        type: String,
        trim: true,
        unique: true,
        minlength: 4,
        required: true
    },
    email : {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password : {
        type: String,
        minlength: 8,
        required: true
    },
    role : {
        type: Number,   
        default: 0
        //0: 일반 유저, 1: 관리자
    },
    cart : {
        type: Array,
        default: []
    },
    purchaseHistory : {
        type : Array,
        default : []
    },
    storeOwner : {
        type: Boolean,
        default : false
    },
    token : {
        type : String
    },
    tokenExp : {
        type: Number
    }
});

//회원가입 완료 전에 비밀번호 암호화 진행
userSchema.pre('save', function(next) {
    const user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt)=> {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash)=> {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        });
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };