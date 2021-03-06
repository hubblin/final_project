const express = require('express')
const app = express()
const port = 5000

const bodyPorser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key');



const userRouter = require('./routes/user');
const mainRouter = require('./routes/main')


//url코드를 가지고 올 수 있게
app.use(bodyPorser.urlencoded({limit:"50mb",extended: true}))
//json을 가지고 올 수 있게
app.use(bodyPorser.json({limit: "50mb"}))

app.use(cookieParser());



const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))


app.use('/api/', mainRouter)
app.use('/api/users', userRouter)



app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))