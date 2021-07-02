const Car = require('../models/car');
const User = require('../models/user');
const { secret } = require('../config');
const jwt = require('jsonwebtoken');

const getAuthUserID = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = jwt.verify(token, secret);
    return id;
}

const setCarIDtoUser = async (userID, car) => {
    const user = await User.findById(userID);
    user.cars.push(car._id);
    await user.save();
    return user;
}

class carController {
    async createCar (req, res) {
        try {
            const userID = getAuthUserID(req);
            const { title, model, color, weight } = req.body;
            const newCar = new Car({
                title,
                model,
                color,
                weight
            })
            await newCar.save();
            const user = await setCarIDtoUser(userID, newCar);
            res.json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Create car error', errors: e});
        }
    };
}

module.exports = new carController();