const express=require("express");
const app=express();
//const port=8080;
const port = process.env.PORT || 3000; // ✅ Important for Render
const path=require("path");
const {v4: uuidv4}=require('uuid');
const methodOverride = require('method-override')



app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts =[// first step make post
        {
            id:uuidv4(),
            username:"Jhon Show",
            content:"Winter is coming"
        },
        {
            id:uuidv4(),
            username:"Walter White",
            content:"Say my name ------ say my name"
            
        },
        { 
            id:uuidv4(),
             username:"Karnick",
            content:"Mahool pura 'WAVvvy' "
            
        },
        {
            id:uuidv4(),
           username: "Mayank",
            content:"Bhai bhot galat kr diya"
            
        },
        {
            id:uuidv4(),
            username:"luv",
            content:"mai bina matlab Gyan deta hun"
        }
    ]

app.get("/posts",(req, res)=>{
    res.render("index.ejs",{ posts});
    
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req, res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
    console.log(id);
});

app.get("/posts/:id",(req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    //console.log(id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req, res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
    // res.send("delete succes");
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});