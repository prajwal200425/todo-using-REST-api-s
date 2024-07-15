const express = require("express");
const app = express();
const port = 3000;
let path = require("path");
const { v4: uuidv4 } = require("uuid");
 const method_override = require("method-override");
 app.use(method_override("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
 let list = [
    {
        id : uuidv4(),
        title : "coding",
        note : "Building Restfull apis."
    },
    {
        id : uuidv4(),
        title : "diet",
        note : "i want to done weigth gaining deit."
    },
    {
        id : uuidv4(),
        title : "Social Media",
        note : "i need to post something new feeds on istagram."
    },
 ]

app.get("/list", (req ,res) => {
   res.render("list.ejs" , {list});
})

app.get("/list/new" , (req , res)=> {
    res.render("new.ejs");
})

app.post("/list", (req , res) => {
    let {title , note} = req.body;
    let id = uuidv4();

    list.push({id, title , note});
 
   res.redirect("/list");
})

app.get("/list/show/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let lists = list.find((p) => id === p.id);
    console.log(lists);
    res.render("show.ejs", {lists });
  });
  
  
  
  app.delete("/list/:id", (req , res) => {
    let { id } = req.params;
   list = list.filter((p) => id !== p.id);
      res.redirect("/list");
  })
app.listen(port , () => {
    console.log("server running at ",port);
})