const express = require("express")
const app = express()
const hbs = require("hbs")
const path = require("path")
const bcrypt = require("bcryptjs")

require("../src/db/conn")
const shopuser = require("../src/moudle/register")
const port = process.env.PORT||7000

const tamplate_path = path.join(__dirname , "../template/views")
const partials_path = path.join(__dirname , "../template/partials")

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.set("view engine" , "hbs")
app.set("views" , tamplate_path)
hbs.registerPartials(partials_path)

app.get("/" , (req , res)=>{
    res.render("login")
})
app.get("/signup" , (req , res)=>{
    res.render("signup")
})
app.get("/login" , (req , res)=>{
    res.render("login")
})

app.get("/" , (req , res)=>{
    res.send("hy my name jitendra saini")
})


// create a new user un our database
app.post("/register" , async (req , res) =>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

      if(password == cpassword){
        const shopUser = new  shopuser({
            Name:req.body.name,
            Email:req.body.email,
            Phone_Number:req.body.phone,
            Password:password,
            Confirm_password:cpassword
        })
        
        console.log("the success part " + shopUser);

        const token = await shopUser.generateAuthToken;
        
        console.log("the token part" + token);


        const  registered = await shopUser.save()
        res.status(201).render("index")
        
    }else{
          res.send("password are not matching")
    }

    } catch (error) {
        res.status(400).send(error)
        console.log(error.message);
        
    }
})

//login check
app.post("/login" ,async (req , res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

       const usermail = await shopuser.findOne({
        Email :email
       });
        
        const ismatch =await bcrypt.compare(password , usermail.Password)

        if (ismatch) {
            res.status(201).render("index")

        } else {
            res.send("invalid your password detail")
        }
    }catch{
         res.status(201).send("invalid your email detail")
    }
})



app.listen(port , ()=>{
    console.log(`server listening on the port ${port}`)
})