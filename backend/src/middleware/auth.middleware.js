

import jwt from "jsonwebtoken"
import User from "../models/user.model"

// next parameter calls the next function (i.e. updateProfile in route) if protect successfuly finishes
export const protectRoute = async (req,res,next) => {


    try {
        
        //contain cookie in variable if exists
        // jwt addresses how cookie was called ? named ? in controller
        const token = res.cookie.jwt;

        if(!token) {
            return res.status(401).json({message: "No token provided - unauthorized."})
        }

        const decoded  = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(401).json({message: "Invalid token - unauthorized."})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message: "User not found."});
        }

        req.user = user;

        next()

    } catch (error) {
        
        console.log("Error in middleware protectRoute:", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }

    
}

