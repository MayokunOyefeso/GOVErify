const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userEmailSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    role: {type: String},
})

const userSchema = new Schema({
    role: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    entryDate: {type:Date, default:Date.now}
})

const taskSchema = new Schema({
    title: {type: String, required: true},
    description:  {type: String, required: true},
    students:  {type: Array, required: true},
    url: {type: String},
    dueDate: {type: Date},
    isCompleted: {type: Boolean}
})


const Emails = mongoose.model("Emails", userEmailSchema, 'user_emails')
const Users = mongoose.model("Users", userSchema, 'users')
const Tasks = mongoose.model("Tasks", taskSchema, 'tasks')

const mySchemas = {'Emails':Emails ,'Users': Users, 'Tasks': Tasks}

module.exports = mySchemas