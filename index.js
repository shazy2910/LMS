if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cookieParser = require("cookie-parser");
const {
  requireAuth,
  checkUser
} = require("./middleware/authMiddleware");
const Task = require("./models/Task");
const User = require("./models/User")

const port = process.env.PORT || 3000;

const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));

//set view engine:
app.set("view engine", "ejs");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/LMS_Project';


  mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {console.log("Connected to MongoDB");})
  .catch((err) => console.log(err));

app.use('*', checkUser);

app.get("/", (req, res) => res.render("home", {
  title: "Code Dojo"
}));
app.get("/courses", requireAuth, (req, res) =>
  res.render("courses", {
    title: "Courses"
  })
);
app.get("/usertasks", requireAuth, async(req, res, next) => {

  try{

    const user = await User.findById(res.locals.user._id).populate('tasks')
    const userTasks = user.tasks;
    res.render("usertasks", {title: "Tasks", tasks: userTasks})
  }catch(err){
    next(err);
  }  
  //Check which user logged in
  //Retrieve that user and populate his tasks
  //Pass tasks to template


});

app.use(authRoutes);


app.listen(port , ()=>{
  console.log(`Listening on ${port}`);
})

app.use((err,req,res,next)=>{
  console.log(err);
  res.status(500).send("Something went wrong");
})