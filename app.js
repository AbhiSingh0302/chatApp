const express = require('express');

const bodyParser = require('body-parser');

const fs = require('fs');

const localStorage = require('localStorage');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.use('/login',(req,res,next)=>{
    res.send('<form action="/" method="POST" onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)"><input id="username" type="text" name="username" placeholder="username"><button>Login</button></form>')
})

app.use('/chat',(req,res,next)=>{
    let chat = req.body;
    Object.keys(chat).forEach(val=>{
        fs.appendFile("chat.txt",user+": "+chat[val]+",",err => {
            if(err){
                throw err;
            }
            console.log("updated");
        });
    })
    res.redirect("/");
})
let user;
app.use('/',(req,res,next)=>{
    let userchat = req.body;
    Object.keys(userchat).forEach(val=>{
        user = userchat[val];
    })
    fs.readFile('chat.txt', 'utf8', function(err, data){
        if(err){
            return err;
        }
        return res.send(`<p>${data}</p><form action="/chat" method="POST"><input type="text" name="chat" placeholder="type something..."><button>Send</button></form>`)
    });
})

app.listen(3000);