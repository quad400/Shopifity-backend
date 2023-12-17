const express = require("express");
const { 
    register, 
    login, 
    getUserById, 
    getUser,
    deleteUser,
    updateUser
} = require("../controllers/userCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/:id', getUserById)
router.get('', isAuthenticated,getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


module.exports = router;