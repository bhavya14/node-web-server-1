const express = require('express');
const hbs  = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('ScreamIt',(text)=>{
    return text.toUpperCase();
})

app.use((req,res,next)=>{

    var now  = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err)
            console.log('unable to append to server.log');
    });
    next(); // if we do not call next : everything after it won't work
});
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));



//request and response as arguments
app.get('/' , (req,res) => {

    res.render('home.hbs',{
        pageTitle : 'Home Page 123',
        welcomeMessage:'Welcome to the website',
       // currentYear : new Date().getFullYear()
    });
});

app.get('/about', (req,res)=>{
    res.render('about.hbs',{
        pageTitle : 'About Page',
        //currentYear : new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage : 'unable to handle request'
    })
})
app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});