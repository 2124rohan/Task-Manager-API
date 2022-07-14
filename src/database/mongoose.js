const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// const me = new User({
//     name1:'      Rohan   ',
//     email:'Rohan@gmail.com    ',
//     password:'Passwor!@3'
// })

// me.save().then((me)=>{
//     console.log("Data Is Saved",me)
// }).catch((error)=>{
//     console.log('Error',error)
// })



// const data = new task({
//     description:'New Task One        ',
    
// })

// data.save().then((result)=>{
//     console.log('data is Saved in the tasks',result)
// }).catch((error)=>{
//     console.log(error)
// })