const dotenv = require('dotenv').config()
const ejs = require('ejs')
const mongoose = require('mongoose')
const express = require('express')
const app = express();
app.set("view engine", "ejs" )
app.use(express.urlencoded({extened: true}))
app.use(express.static("public"))
const Model = require('./model/scheme')

    
   

      // Route
    app.get('/',(req, res)=>{
         res.status(200).render('index.ejs',{title: 'Registration'})
})

     // Creating users and validations
    app.post('/users', async(req, res)=>{
         try{
          const checkIfExit = await Model.findOne({name: req.body.name});

          if(checkIfExit){
        res.send(`<h3>user with this name  ${req.body.name} is already existing</h3>
                  Click here to sign up with another information ' <a href= '/'>Click</a>`);
    } 
        const user = await new Model({
        name: req.body.name,
        skill: req.body.skill,
        password: req.body.password
    });
        user.save()
        res.status(200).redirect('/dashboard');
         
}
        catch(err){
            console.log(err)
    };
});
         // Routes
      app.get('/dashboard', async(req, res)=>{
        try{
        const user = (await Model.find()).reverse()
             console.log(user)
         res.render('dashboard', {name: user[0].name})   
}

        catch(err){
        console.log(err)
    }
})

















const PORT =process.env.PORT ||3000
const uri =process.env.uri
mongoose.connect(uri,  {useUnifiedTopology: true})
    .then((result)=>{
         app.listen(PORT, ()=> {
         console.log('listening on port 5500')
 })
         console.log('DB connected')
})
    .catch((err)=>{
        console.log(err)
})















