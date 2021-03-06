const User = require('../models/user');
const Car = require('../models/car');
const userService = require('../services/userService');
const {validationResult} = require("express-validator");

class carService {
    async getCars (userID) {
        const { cars: carsId } = await User.findById(userID);
        let cars = [];
        for (const car of carsId) {
            let carObj = await this.getCar(car)
            if(carObj !== null){
                cars.push(carObj);
            }
        }
        return cars;
    }

    async createCar(req, userID) {
        const {title, model, color, weight} = req.body;
        const newCar = new Car({
            title,
            model,
            color,
            weight
        })
        await newCar.save();
        await userService.setCarIDtoUser(userID, newCar);
        return newCar;
    };

    async deleteCar(carID, userID) {
        const user = await User.findById(userID);
        user.cars = user.cars.filter(car => car.toString() !== carID);
        user.save();
        await Car.findByIdAndDelete(carID);
        return await this.getCars(userID);
    }

    async updateCar(req, carID) {
        let updates = req.body;
        delete updates._id;
        const car = await Car.findByIdAndUpdate(carID, updates);
        await car.save()
        return await this.getCar(carID);
    }

    async getCar(carID){
        return Car.findById(carID);
    }

    async isCarBelongsToUser(cars, carID) {
        let belongs = false;
        for (const car of cars) {
            if(car.toString() === carID) {
                belongs = true;
            }
        }
        return belongs;
    }

    checkForValidationErrors(req) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return errors
        }
        return false
    }
}

module.exports = new carService();