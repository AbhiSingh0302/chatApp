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
        console.log(chat[val]);
        // fs.readFile('chat.txt', 'utf8', function(err, data){
        //     if(err){
        //         console.log(err);
        //         return err;
        //     }
        //     fs.writeFileSync("chat.txt",data+chat[val]);
        // });
        fs.appendFile("chat.txt",chat[val]+",",err => {
            if(err){
                throw err;
            }
            console.log("updated");
        });
    })
    res.redirect("/");
})

app.use('/',(req,res,next)=>{
    // fs.writeFileSync("chat.txt",`${localStorage.getItem("username")}: `)
    // console.log(localStorage.getItem("username"));
    let chat = req.body;
    Object.keys(chat).forEach(val=>{
        // fs.writeFileSync("chat.txt",chat[val]+": ");
        fs.appendFile("chat.txt",chat[val]+": ",err => {
            if(err){
                throw err;
            }
            console.log("updated");
        });
        console.log(chat[val]);
    })
    res.send('<form action="/chat" method="POST"><input type="text" name="chat" placeholder="type something..."><button>Send</button></form>')
})

app.listen(3000);