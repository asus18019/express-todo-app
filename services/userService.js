const { secret } = require('../config');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

class userService {
     getAuthUserIDByToken(req) {
        const token = req.headers.authorization.split(' ')[1];
        const {id} = jwt.verify(token, secret);
        return id;
    }

     async setCarIDtoUser(userID, car) {
        const user = await User.findById(userID);
        user.cars.push(car._id);
        await user.save();
        return user;
    }
}

module.exports = new userService();