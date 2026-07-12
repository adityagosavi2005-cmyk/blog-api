const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { generateToken } = require("../utils/jwt");

const register = async (req, res) =>{
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    const { name, username, email, password } = req.body;

        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username or Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            } 
        });
    } catch (error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    } 
};


const login = async (req, res) => {
    try {

        // Check validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Extract login credentials
        const { login, password } = req.body;

        // Find user using username OR email
        const user = await User.findOne({
            $or: [
                { email: login },
                { username: login }
            ]
        });

        // User not found
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Wrong password
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT
        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const profile = async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        user: req.user
    });

};

module.exports = {
    register,
    login,
    profile
};