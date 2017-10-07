const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
    
app.use((req,res,next)=>{
var now = new Date().toString();
var log = (now +req.method + req.url);

console.log(log) ;
fs.appendFile('server.log', log+'\n',(err)=>{
if(err){
    console.log('unable to append to server.log');
 }
});
next();
});


// // challenge 6.
// app.use((req,res,next)=>{
// res.render('maintenance.hbs');    
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
return  text.toUpperCase();
});

app.get('/', (req,res)=>{
// res.send('<h1>hello express!</h1>');
// res.send({
//     name:'douglas',
//     likes: [
//     'Reading',
//     'GOD'
// ]
// });
res.render('home.hbs',{
    pageTitle:'home page',
    welcomeMessage:'hello,Welcome to my Home page!',
    currentYear: new Date().getFullYear()

});
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
    pageTitle:'About page',
    currentYear:new Date().getFullYear()
});
});

//challenge
app.get('/project',(req,res)=>{
     res.render('project.hbs',{
     pageTitle:'project',
     currentYear: new Date().getFullYear(),
     welcomeMwssage:'this the test rendered new page'
     });
 });

app.get('/bad',(req,res)=>{
     res.send({
        errorMessage: 'error handling this request'
        });
 });

 

app.listen(port,()=>{
    console.log('server is up on port:' + port);
});  