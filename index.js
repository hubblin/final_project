const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hokyun:qwer1234@finalplate.tgri0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

//mongodb+srv://hokyun:<password>@finalplate.tgri0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.get('/', (req,res) => res.send('Hello World!'))

app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))