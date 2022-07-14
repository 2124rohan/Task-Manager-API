const express = require('express')
require('./database/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()

const port = process.env.PORT 

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log('server is running on port '+ port)
})

// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async ()=>{
//     const task = await Task.findById('62c18f157ac2d02b78f6292e')
//     await task.populate('owner')

//     console.log(task.owner)
//     const user = await User.findById('62c18aee9771bfee73f1b064')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }
// main()

// app.use( (req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })
 
// app.use((req,res,next)=>{
//     if(req.method){
//         res.status(503).send('Site is Under Maintenace. Please try again later!')
//     }else{
//         next()
//     }
// })


