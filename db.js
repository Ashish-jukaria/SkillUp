const mongoose=require('mongoose')
const Schema =  mongoose.Schema;


const Admin=new Schema({
    name:{type:String,required:true,unique:true},
    password: {type:String,required:true},

})

const User=new Schema({
    name:{type:String,required:true,unique:true},
    password : {type:String,required:true},
})

// { 
//     "title": "course title", 
//     "description": "course description", 
//     "price": 100, 
//     "imageLink": "https://linktoimage.com", 
//     "published": true 
//   }

const Courses=new Schema({
    admin_id:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    imageLink:{type:String,required:true},
    published:{type:Boolean,required:true}
})

const UserCourse=new Schema({
    user_id:{type:String,required:true},
    courses:[{ 
        title:{type:String,required:true},
        description:{type:String,required:true},
        price:{type:Number,required:true},
        imageLink:{type:String,required:true},
        published:{type:Boolean,required:true}}]
})


const AdminModel= mongoose.model('Admin',Admin);
const UserModel= mongoose.model('User',User);
const CoursesModel=mongoose.model('Courses',Courses)
const UserCourseModel=mongoose.model('UserCourse',UserCourse)

module.exports={
    AdminModel : AdminModel,
    UserModel:UserModel,
    CoursesModel:CoursesModel,
    UserCourseModel:UserCourseModel
}

