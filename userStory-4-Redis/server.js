const express = require("express");
const app = express();
const http = require('http').createServer(app);

const exphps = require ('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
let client = redis.createClient();
client.on('connect',function(){
     console.log('connected to redis');
});
app.engine('handlebars', exphps({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.get('/',function(req,res,next){
    res.render('searchusers');
});
app.post('/users/data',function(req,res,next){
  let pnr = req.body.pnr;

    client.hgetall(pnr,function(err,obj){
     if(!obj){
       res.render('searchusers',{
          error: 'Customer doesnot exist with the given PNR Number'
       });
     }
     else{
        obj.pnr = pnr;
        res.render('details', {
            user: obj
        });
     }
  });
});



const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

app.use(express.static(__dirname + '/public'));

app.get('/user/chat', (req,res) =>{
    res.sendFile(__dirname + '/index.html');
})

function sendMsg(socket){
    client.lrange("mess", "0","-1", (err,data)=>{
        // console.log(data);
        data.forEach(e=>console.log(e))


        //  data.map(x=>{    
        //      const usernameMessage = x.split(":");
        //      const redisUsername = usernameMessage[0];2
        //      const redisMessage = usernameMessage[1];
        //      io.emit("message",{
        //          user: redisUsername,
        //          message: redisMessage
        //      });

        //  });
    });
}


const io = require("socket.io")(http);
io.on('connection',(socket)=>{
    console.log("Connected...");
    socket.on('message',({user,message})=>{
        //  console.log(message,user);
         socket.broadcast.emit('message',({message, user}));
         client.rpush("mess",`${user}:${message}`);
         sendMsg(socket);
         
    })
})
