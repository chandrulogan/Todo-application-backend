const jwt = require('jsonwebtoken');
const User = require('../models/authModels');
const appError = require('../utils/appError');
const { generateToken } = require('../middleware/verifyToken');

// const signToken = id => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//     });
// };

generateToken()

exports.signup = async (req, res, next) => {
    try {
        if (req.body.password.length >= 8) {
            const newUser = await User.create({
                profileImage: req.body.profileImage,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
            });

            const token = generateToken(newUser._id, newUser.email);

            res.status(200).json({
                status: "Success",
                token: token,
                data: {
                    user: newUser
                }
            });
        } else {
            res.status(201).json({
                status: "fail",
                data: {
                    message: "Password length must be greater than 8"
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: "fail",
            data: {
                message: "User already registered"
            }
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new appError('Unable to receive the email and password to the server!', 400));
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(401).json({
                status: "success",
                message: "Incorrect email or password",
            });
        } else{
            const token = generateToken(user._id, user.email);;

            res.status(200).json({
                status: "success",
                token: token,
                data: user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "fail",
            data: {
                message: "Internal server error"
            }
        });
    }
};
