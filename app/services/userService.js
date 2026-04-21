import ConnectDB from "@/app/lib/db";
import User from "@/app/lib/models/user";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AppError } from "@/app/lib/errors";
import { generateToken, generateRefreshToken } from "@/app/lib/jwt";
import Like from "../lib/models/likes";
import getUser from "../lib/getUser";
/**
 * Service to handle user-related logic with 1:1 parity with original API routes.
 */
export const userService = {
    /**
     * Registers a new user with exact logic from /api/auth/register.
     */
    async register(data) {
        await ConnectDB();

        const { name, email, password } = data;

        if (!name || !email || !password) {
            throw new AppError("Please provide name, email and password", 400);
        }

        const user = await User.findOne({ email });

        if (user) {
            throw new AppError("User already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user"
        });

        await newUser.save();

        const token = await generateToken({ id: newUser._id.toString(), email: newUser.email, role: newUser.role });
        const refreshToken = await generateRefreshToken({ id: newUser._id.toString(), email: newUser.email, role: newUser.role });

        return {
            success: true,
            message: "User registered successfully",
            user: { id: newUser._id.toString(), email: newUser.email, role: newUser.role },
            token,
            refreshToken
        };
    },

    /**
     * Authenticates a user with exact logic from /api/auth/login.
     */
    async login(data) {
        await ConnectDB();

        const { email, password } = data;

        if (!email || !password) {
            throw new AppError("Please provide email and password", 400);
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError("Invalid password", 401);
        }

        const token = await generateToken({ id: user._id.toString(), email: user.email, role: user.role });
        const refreshToken = await generateRefreshToken({ id: user._id.toString(), email: user.email, role: user.role });

        return {
            success: true,
            user: { id: user._id.toString(), email: user.email, role: user.role },
            token,
            refreshToken
        };
    },
    async getAllUsers(){
        await ConnectDB();
        const user= await getUser()
        if (!user || user.role !== "admin") throw new AppError("Unauthorized", 401);
        // get all except this admin
        const users = await User.find({_id:{$ne:user._id}}).lean().select("-password");
        return JSON.parse(JSON.stringify(users));
    },
    async getUserById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError("Invalid User ID format", 400);
        await ConnectDB();
        const user = await User.findById(id).lean();
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return JSON.parse(JSON.stringify(user));
    },
    async deleteUser(id){
        if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError("Invalid User ID format", 400);
        await ConnectDB();
        const user = await User.findById(id).lean();
        if (!user) {
            throw new AppError("User not found", 404);
        }
        if(user.role==="admin"){
            return { success: false, message: "Admin cannot be deleted" };
        }
        await mongoose.models.CommentReal.deleteMany({ user: id });
        await Like.deleteMany({ user: id });
        // Fix: user.remove() is deprecated in Mongoose v7+. Use deleteOne() instead.
        await User.findByIdAndDelete(id);
        return JSON.parse(JSON.stringify({ success: true, user }));
    },
    async getUserLikes(id){
        if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError("Invalid User ID format", 400);
        await ConnectDB();
        const user = await User.findById(id).lean();
        if (!user) throw new AppError("User not found", 404);
        
        const likes = await Like.find({user:id}).populate("building").sort({createdAt:-1}).lean();
        return JSON.parse(JSON.stringify({ 
            success: true, 
            user,
            likes
        }));
    },
    async getUserComments(id){
        if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError("Invalid User ID format", 400);
        await ConnectDB();
        const user = await User.findById(id).lean();
        if (!user) throw new AppError("User not found", 404);
        
        const comments = await mongoose.models.CommentReal.find({user:id}).populate("building").sort({createdAt:-1}).lean();
        return JSON.parse(JSON.stringify({ 
            success: true, 
            user,
            comments
        }));
    },
};

