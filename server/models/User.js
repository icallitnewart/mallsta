const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
    } else {
        next();
    }
});

//로그인시 입력한 비밀번호를 암호화시켜서 비교
userSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, (err, isMatch)=> {
        if(err) return cb(err);
        //비밀번호가 일치한다면
        cb(null, isMatch);
    });
};

//로그인시 토큰 생성
userSchema.methods.generateToken = function(cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save((err, userInfo)=> {
        if(err) return cb(err);
        cb(null, userInfo);
    });
};

//로그인 인증시 토큰으로 유저 찾기
userSchema.statics.findByToken = function(token, cb) {
    const user = this;

    //토큰 복호화
    jwt.verify(token, 'secretToken', (err, decoded)=> {
        //DB에서 해당 유저 찾기
        user.findOne({ 
            "_id" : decoded, 
            "token" : token 
        }, (err,userInfo)=> {
            if(err) return cb(err);
            cb(null, userInfo);
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };