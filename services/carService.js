const User = require('../models/user');
const Car = require('../models/car');
const userService = require('../services/userService');

class carService {
    async getCars (userID) {
        const { cars: carsId } = await User.findById(userID);
        let cars = [];
        for (const car of carsId) {
            let carObj = await Car.findById(car)
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

    async isCarBelongsToUser(cars, carID) {
        let belongs = false;
        for (const car of cars) {
            if(car.toString() === carID) {
                belongs = true;
            }
        }
        return belongs;
    }
}

module.exports = new carService();