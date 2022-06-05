const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

//회원가입
router.post("/register", (req, res)=> {
    const user = new User(req.body);

    user.save((err, userInfo)=> {
        if(err) return res.status(400).json({ success : false, err});
        return res.status(200).json({ success : true, userInfo })
    });
});

module.exports = router;