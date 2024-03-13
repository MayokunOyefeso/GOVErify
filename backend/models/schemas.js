const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userEmailSchema = new Schema({
    email: {type: String},
    role: {type: String},
})

const userSchema = new Schema({
    role: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    entryDate: {type:Date, default:Date.now}
})

const adminSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    entryDate: {type:Date, default:Date.now}
})

const Emails = mongoose.model("Emails", userEmailSchema, 'user_emails')
const Users = mongoose.model("Users", userSchema, 'users')
const Admins = mongoose.model("Admins", adminSchema, 'admins')

const mySchemas = {'Emails':Emails ,'Users': Users, 'Admins': Admins}

module.exports = mySchemas