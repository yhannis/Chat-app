

import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req,res) =>  {

    const {fullName, email, password} = req.body;

    try {

        if(!fullName || !email || !password){
            res.status(400).json({message: "All fields are required bro"});
        }

        //check password length
        if(password.length < 6){
            res.status(400).json({message: "Password must be at least 6 characters :p"});
        }
        

        //check if user already exists
        const user = await User.findOne({email})

        if (user) return res.status(400).json({message: "User already exists dumbas"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt); // generate hash password

        const newUser = new User({ //create a new instance of user model
            fullName,
            email,
            password: hashedPassword
        })

        if(newUser) {
            //generate jwt token
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

        } else {
            res.status(400).json({message: "Invalid user data"});
        }
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const login = async (req,res) => {
    
    const {email, password} = req.body

    try {
        
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({message: "Invalid credentials hajaja"})
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched) {
            return res.status(400).json({message: "Invalid credentials hajaja"})
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in login controller ", error.message);
        res.status(500).json({ message: "Internal Server Error "});

    }
}

export const logout = (req,res) => {
    
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully!"})
    } catch (error) {
        
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateProfile = async (req,res) => {

    
}