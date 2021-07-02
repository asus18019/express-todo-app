const carService = require('../services/carService');
const userService = require('../services/userService');
const {validationResult} = require("express-validator");

class carController {
    async createCarByUser(req, res) {
        try {
            const userID = userService.getAuthUserIDByToken(req);
            const car = await carService.createCar(req, userID);
            res.json(car);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Create car error', errors: e});
        }
    }

    async getUserCars(req, res) {
        try{
            const authUserID = userService.getAuthUserIDByToken(req);
            const cars = await carService.getCars(authUserID);
            res.json(cars);
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Get car error', errors: e});
        }
    }

    async deleteCarByUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: errors});
            }
            const { _id: carID } = req.body;
            const userID = userService.getAuthUserIDByToken(req);
            const cars = await carService.deleteCar(carID, userID);
            if(!cars) {
                return res.status(400).json({message: 'Car not belongs to auth user'});
            }
            res.json(cars);
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Delete car error', errors: e});
        }
    }
}

module.exports = new carController();