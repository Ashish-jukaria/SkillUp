//imports
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')
const mongoose = require("mongoose");
const dotenv=require('dotenv')
const { z, ZodError } =require("zod");
const  path=require('path')
const {
  AdminModel,
  UserModel,
  CoursesModel,
  UserCourseModel,
  
} = require("./db");
const { Auth, JWT_SECRET } = require("./auth");
const ObjectId = require("mongodb").ObjectId;
dotenv.config()
//db connections
mongoose.connect(
  process.env.MONGO_CONNECTION
);
//express object
app = express();

//middlewares on top
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


//admin
const usernameschema=z.string().min(5,{message:"Username Must be 5 chat atleast"}).toLowerCase()
const passwordschema=z.string().min(5,{message:"Password need to have 5 chat atleast"}).max(10,{message:"Password should not be more than 10 char"})
app.post("/admin/signup", async (req, res) => {
  try {
    username = usernameschema.parse(req.body.username);
    password = passwordschema.parse(req.body.password);
    hash_password=await bcrypt.hash(password,5)
    await AdminModel.create({
      name: username,
      password: hash_password
    });

    res.send("Admin Created");
  } catch (e) {
    res.send("Duplicate Username");
  }
});

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, "public", "sell.html"));
})

app.post("/admin/signin", async (req, res) => {
  try{
  username = usernameschema.parse(req.body.username);
  password = passwordschema.parse(req.body.password);
  user = await AdminModel.findOne({
    name: username,
  });
  verified_user=await bcrypt.compare(password,user.password)

  if (verified_user) {
    const token = jwt.sign({ id: user._id.toString()}, JWT_SECRET);

    res.json({
      token: token,
    });
  } else {
    res.send("Wrong Credintials");
  }
}catch(e){
  res.send("Wrong Credintials");
}});

//user

app.post("/user/signup", async (req, res) => {
  
  try {
  username = usernameschema.parse(req.body.username);
  password = passwordschema.parse(req.body.password);
  hash_password=await bcrypt.hash(password,5)
    await UserModel.create({
      name: username,
      password: hash_password,
    });

    res.send("User Created");
  } catch (e) {
    console.log(e.message)

    if (e instanceof ZodError){
      res.status(400).json({
        "message":e.errors.map(err=>err.message)

      })
    }
    else{
      res.json({
        "message":"Something Went Wrong Please Try again"
      });
    }
  
  }
});

app.post("/user/signin", async (req, res) => {
  try{
  username = usernameschema.parse(req.body.username);
  password = passwordschema.parse(req.body.password);

  user = await UserModel.findOne({
    name: username,
  });
  verified_user=bcrypt.compare(password,user.password)
  if (verified_user) {
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);

    res.json({
      token: token,
    });
  } else {
    res.send("Wrong Credintials");
  }
}
catch(e){
  res.send("Wrong Credintials");

}
});

//API Who need AUTH First
app.use(Auth)

// {
//     "title": "course title",
//     "description": "course description",
//     "price": 100,
//     "imageLink": "https://linktoimage.com",
//     "published": true
//   }

app.post("/admin/courses", async (req, res) => {
  const id = req.id;
  const { title, description, price, imageLink, published } = req.body;
  try {
    await CoursesModel.create({
      admin_id: id,
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
      published: published,
    });

    res.send("Course Added");
  } catch (e) {
    console.log(e.message)
    res.send("Error in Adding Course");
  }
});

app.put("/admin/courses/:id", async (req, res) => {
  const id = req.id;
  const course_id = req.params.id;
  const { title, description, price, imageLink, published } = req.body;
  try {
    await CoursesModel.findOneAndUpdate(
      {
        _id: new ObjectId(course_id),
      },
      {
        admin_id: id,
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: published,
      }
    );

    res.send("Course Updated");
  } catch (e) {
    console.log(e.message);
    res.send("Error in Course Update");
  }
});

app.get("/admin/courses", async (req, res) => {
  courses = await CoursesModel.find({
    admin_id:req.id
  });

  res.json({
    courses: courses,
  });
});

//users api

app.get("/user/courses", async (req, res) => {
  courses = await CoursesModel.find({
    published: true,
  });

  res.json({
    courses: courses,
  });
});

app.post("/user/courses/:id", async (req, res) => {
  const course_id = req.params.id;
  const user_id = req.id;
  console.log(typeof user_id);
  const course_data = await CoursesModel.findOne({
    _id: new ObjectId(course_id),
  });
  console.log(course_data);

  const courseToAdd = {
    title: course_data.title,
    description: course_data.description,
    price: course_data.price,
    imageLink: course_data.imageLink,
    published: course_data.published
};

  course_exist = await UserCourseModel.findOne({
    user_id: user_id,
  });
  console.log(course_exist);
  console.log("hola");
  try {
    if (course_exist) {
      console.log("hi");

      await UserCourseModel.updateOne({
        user_id: user_id,
        $push: { courses: courseToAdd },
      });
    } else {
      await UserCourseModel.create({
        user_id: user_id,
        courses: [courseToAdd],
      });
    }
    res.send("You have successfully Buyed the Course");
  } catch (e) {
    console.log(e.message);
    res.send("Error Buying Course");
  }
});

app.get("/user/purchaseCourses", async (req, res) => {
  const user_id = req.id;
  const user_course = await UserCourseModel.find({ user_id: user_id });
  res.json({
    courses: user_course,
  });
});
port=process.env.PORT||3000
app.listen(port, () => {
  console.log("server is running hola");
});
