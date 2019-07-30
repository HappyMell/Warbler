const db = require("../models");
const jwt = require("jsonwebtoken");

require("dotenv").config({
    path: '../.env'
});


exports.signin = async function (req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, image} = user       
        let isMatch = await user.comparePassword(req.body.password)
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                image
                  }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                image,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid email or password."
            });
        }
    } catch (e) {
        return next({
            status: 400,
            message: "Invalid email or password."
        })
    }
}

exports.signup = async function (req, res, next) {
    try {
        let user = await db.User.create(req.body);   
      
        let { id, username, image } = user;
        let token = jwt.sign({
            id,
            username,
            image: result.secure_url
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
           image,
            token
        })

    } catch (err) {                
        if (err.code === 11000) {
            err.message = "Sorry, that username and / or email is taken."
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

