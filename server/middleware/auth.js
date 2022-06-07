const { User } = require('../models/User');

//로그인 인증 처리
const auth = (req, res, next)=> {
  const token = req.cookies.x_auth;

  //토큰으로 유저 찾기
  User.findByToken(token, (err, user)=> {
    if(err) return res.status(400).json({ success : false, err });

    //유저를 찾을 수 없다면
    if(!user) return res.status(204).json({ 
      isAuth : false, 
      err : "User Not Found" 
    });

    //유저를 찾았다면 토큰과 유저 정보 넘겨주기
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };