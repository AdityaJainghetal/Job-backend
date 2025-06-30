const express = require('express');
const AdminModel = require('../Controller/Auth/RegisterController');
const router = express.Router();


router.post('/register', AdminModel.register);

router.post('/login', AdminModel.login );

router.post('/resetpassword', AdminModel.resetPassword)

router.get("/reset-password/:id", AdminModel.forgotPassword)


module.exports = router;
