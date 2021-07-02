const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const carController = require('../controllers/carController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/car', roleMiddleware(["USER", "ADMIN"]), carController.createCarByUser);
router.get('/car', roleMiddleware(["USER", "ADMIN"]), carController.getUserCars);
router.delete('/car', [
    check('_id', 'car _id is empty').isLength({min: 1})
], roleMiddleware(["USER", "ADMIN"]), carController.deleteCarByUser);

module.exports = router;