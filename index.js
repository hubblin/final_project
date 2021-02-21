const express = require('express')
const app = express()
const port = 5000

const bodyPorser = require('body-parser')

const config = require('./config/key');

const { User } = require('./models/User')

//url코드를 가지고 올 수 있게
app.use(bodyPorser.urlencoded({extended: true}))
//json을 가지고 올 수 있게
app.use(bodyPorser.json())

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

//mongodb+srv://hokyun:<password>@finalplate.tgri0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.get('/', (req,res) => res.send('Hello World!'))

app.post('/register', (req,res) => {
    //회원가입시에 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.

    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, ()=>console.log(`Example app listening on port ${port}!`))