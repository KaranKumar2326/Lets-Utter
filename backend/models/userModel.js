const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default:""

    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true  
    }       

},{
    timestamps: true
});

module.exports = mongoose.model('User', userModel);