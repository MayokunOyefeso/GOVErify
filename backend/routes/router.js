const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

router.post('/users', async(req, res) => {
    const {role, username, email} = req.body
    const userData = {role:role, username: username, email: email}
    const newUser = new schemas.Users(userData)
    const saveUser = await newUser.save()

    if (saveUser) {
        res.send('Account Created Successfuly!')
    }
    res.end()
})


router.post('/user_emails', async(req, res) => {
    const {firstname, lastname, role, email} = req.body
    const emailData = {firstname:firstname, lastname:lastname, role:role, email: email}
    const newUser = new schemas.Emails(emailData)
    const saveUser = await newUser.save()
    res.end()
})

router.post('/tasks', async(req, res) => {
    const {title, description, students, url, dueDate} = req.body
    const taskData = {title:title, description:description, students:students, url:url, dueDate:dueDate}
    const newTask = new schemas.Tasks(taskData)
    const saveTask = await newTask.save()
    res.end()
})

router.get('/user_emails', async(req, res) => {
    const userEmails = schemas.Emails

    const emailData = await userEmails.find({}).exec()

    if (emailData) {
        res.send(JSON.stringify(emailData));
    }

})

router.get('/users', async(req, res) => {
    const users = schemas.Users

    const userData = await users.find({}).exec()

    if (userData) {
        res.send(JSON.stringify(userData));
    }

})

router.get('/tasks', async(req, res) => {
    const tasks = schemas.Tasks

    const taskData = await tasks.find({}).exec()

    if (taskData) {
        res.send(JSON.stringify(taskData));
    }

})

module.exports = router