const express=require('express');
const path=require('path');
const app=express();
const port=process.env.port || 5000;
const logger=require('./middleware/logger')
const expresshbs=require('express-handlebars');
const members=require('./Members');
//static json pages]
//app.use(express.static(path.join(__dirname,'public')));


//body -parser inbuilt one
 app.use(express.json());
app.use(express.urlencoded({extended:false})) 

//handlebars
app.engine('handlebars', expresshbs({defaultLayout:"main"}));
app.set('view engine', 'handlebars');


app.get('/',(req,res)=>res.render('index',{
    tittle: "Members details",
    members

}))

    


//init middleware
//app.use(logger);

/* app.get('/',function(req,res){
    //res.send('<h3>Hello World!!!</h3>');
    res.sendFile(path.join(__dirname,'public','index.html'))
    
}) */


app.use('/api/members',require('./api/members_api'));


app.listen(port,()=>console.log(`Server started and running on port ${port}`));
