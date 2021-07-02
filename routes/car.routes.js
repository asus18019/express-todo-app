const Router = require('express');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');
const carController = require('../controllers/carController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/car', roleMiddleware(["USER", "ADMIN"]), carController.createCar);
router.get('/car',roleMiddleware(["USER", "ADMIN"]), carController.getUserCars);

module.exports = router;