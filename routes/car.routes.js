const Router = require('express');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');
const carController = require('../controllers/carController');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/car', roleMiddleware(["USER", "ADMIN"]), carController.createCar);
module.exports = router;