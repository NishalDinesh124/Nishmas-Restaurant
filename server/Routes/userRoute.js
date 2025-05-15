
const {register,login,} = require('../Controllers/userController')
const router = require('express').Router();

router.post("/login", login);
router.post("/register", register)

module.exports = router;