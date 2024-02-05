const express = require('express');
const app = express()
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json())

const posts = [
    {
        username : 'Haresh',
        title : 'Post 1'
    },
    {
        username : 'Kyoko',
        title : 'Post 2'
    }
]

app.get("/posts",authenticateToken , (req, res) =>{
    console.log(req.user)
    //res.json({jj : req.user.name})
    res.json(posts.filter(post => post.username === req.user.name))
})  


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user;
        console.log(user);
        next()
    })
}

app.listen(3000);