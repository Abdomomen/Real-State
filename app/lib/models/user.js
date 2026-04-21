import { Schema } from "mongoose";
import mongoose from 'mongoose'

const User= new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:30
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validation:{
            match:[
                /^(([^<>()[\\]\\.,;:\s@"]+(\.[^<>()[\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email address"
            ]
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:6,
        max:100
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.models.UserReal|| mongoose.model('UserReal',User)