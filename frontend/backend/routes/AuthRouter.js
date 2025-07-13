const { signup, login } = require('../controller/AuthController');
const { signupValidation, loginValidation } = require('../middleware/AuthMiddleware');

const router = require('express').Router();

router.post('/login',loginValidation,login);

router.post('/signup',signupValidation,signup);//jb request valid hai to hi signup me jayega

module.exports = router;