const Router = require('express');
const router = Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers);

router.post('/registration', [
    check('username', 'username is empty').notEmpty(),
    check('password', 'incorrect password length').isLength({min: 4, max: 20})
], authController.registration);

router.post('/login', [
    check('username', 'username is empty').notEmpty(),
], authController.login);

module.exports = router;