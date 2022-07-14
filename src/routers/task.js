const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// GET  /tasks?completed=true
// GET /tasks?limit=1?skip=0
// GET /tasks/sortBy=createdAt_asc        Field || Order
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    
    if(req.query.Completed){
        match.Completed = req.query.Completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const task = await Task.find({ 
        //     owner: req.user._id,
        //     Completed:match.Completed
        // })
        // res.send(task)

        // Other Approch
        await req.user.populate({path:'tasks',
        match,
        options:{
            limit: parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }   
    })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

 
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        } 
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowUpdates = ['description', 'Completed']
    const isValidOperation = updates.every((task) => allowUpdates.includes(task))

    if (!isValidOperation) {
        return res.send('Invalid Updates')
    }

    // const task = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        // const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id })
    try {
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router