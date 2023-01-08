const jwt = require('jsonwebtoken')

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET

const verify_user = (req, res, next) => {
    try {
        var token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Please login to perform this action."})

        if(token.startsWith("Bearer")){
            token = token.split(" ")[1]
        }

        jwt.verify(token, ACCESS_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "You are not authorized to access this information."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const verify_admin = (req, res, next) => {
    try {
        var token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Please login to perform this action."})

        if(token.startsWith("Bearer")){
            token = token.split(" ")[1]
        }

        jwt.verify(token, ACCESS_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "You are not authorized to access this information."})

            if(user.role !== "admin") return res.status(400).json({msg: "You are not authorized to access this information."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const verify_refresh = (req, res, next) => {
    try {
        var token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Please login to perform this action."})

        if(token.startsWith("Bearer")){
            token = token.split(" ")[1]
        }

        jwt.verify(token, REFRESH_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "You are not authorized to access this information."})

            req.user = user
            next()
        })
    }
    catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = {
    verify_user, verify_admin, verify_refresh
}