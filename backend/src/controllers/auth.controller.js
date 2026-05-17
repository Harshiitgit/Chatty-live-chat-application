import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../database/models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { fullName, username, email, password } = req.body;
    try {
        if(!fullName || !username || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        // Validate full name
        if (fullName.trim().length < 2) {
            return res.status(400).json({ message: "Full name must be at least 2 characters" });
        }

        if (fullName.trim().length > 100) {
            return res.status(400).json({ message: "Full name must not exceed 100 characters" });
        }

        // Validate username format
        const usernameRegex = /^[a-zA-Z0-9][a-zA-Z0-9._@-]{2,19}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ 
                message: "Username must be 3-20 characters and can only contain letters, numbers, underscores, hyphens, dots, and @ symbol. Must start with a letter or number." 
            });
        }

        // Check for consecutive special characters
        if (/[._@-]{2,}/.test(username)) {
            return res.status(400).json({ 
                message: "Username cannot have consecutive special characters" 
            });
        }

        // Validate email format - RFC 5322 compliant
        const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Invalid email format. Please enter a valid email address (e.g., user@example.com)" 
            });
        }

        if (email.length > 254) {
            return res.status(400).json({ 
                message: "Email is too long" 
            });
        }

        // Additional email validations
        if (/\s/.test(email)) {
            return res.status(400).json({ 
                message: "Email cannot contain spaces" 
            });
        }

        const [localPart, domain] = email.split("@");
        
        if (localPart.length > 64) {
            return res.status(400).json({ 
                message: "Email local part is too long" 
            });
        }

        if (localPart.startsWith(".") || localPart.endsWith(".")) {
            return res.status(400).json({ 
                message: "Email local part cannot start or end with a dot" 
            });
        }

        if (/\.\./.test(localPart)) {
            return res.status(400).json({ 
                message: "Email cannot have consecutive dots" 
            });
        }

        if (domain.startsWith("-") || domain.endsWith("-")) {
            return res.status(400).json({ 
                message: "Email domain cannot start or end with hyphen" 
            });
        }

        // Correct password length check
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if username already exists  
        const existingUsername = await User.findOne({ username: username.toLowerCase() });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Check if email already exists  
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            username: username.toLowerCase(),
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Save user and generate token
        if (newUser) {
            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({"message":"Invalid Credentials"})
        }

        const isValidPass = await bcrypt.compare(password,user.password);
        if(!isValidPass){
            return res.status(400).json({"message":"Invalid Credentials"})
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({"message":"Internal Server Error!"})
    }
};

export const logout = (req, res) => {
try {
    res.cookie("jwt","",{maxAge:0});
    return res.status(200).json({"message":"Logout successfully!"});
} catch (error) {
    console.log("Error in Logout Controller",error.message);
    return res.status(500).json({ message: "Internal Server Error" }); 
}
};

export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(400).json({"message":"Profile Pic is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in update Profile",error);
        return res.status(500).json({"message":"Internal Server Error"});
    }
};

export const checkAuth = async (req,res) =>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("error in check auth");
        return res.status(500).json({"message":"Internal Server Error."});
    }
}