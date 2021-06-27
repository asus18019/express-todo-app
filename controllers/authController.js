const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const { secret } = require('../config');

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: 'username already exist'});
            }
            const userRole = await Role.findOne({value: "USER"});
            const hashPassword = bcrypt.hashSync(password, 8);
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: 'Registered'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    };

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors});
            }
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                res.status(400).json({message: `User ${username} not found in system`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                res.status(400).json({message: `Invalid credentials`});
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token: token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    };

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Get user error'});
        }
    };
}

module.exports = new AuthController();