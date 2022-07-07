const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter a username'],
        lowercase: true
    },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password:{
        type: String,
        required:[true, 'Please enter a password'],
        minlength: [6, 'minimum password length is 6 characters']
    },
    role:{
        type: String,
        required:[true, 'Please enter a role'],
    },
    pno:{
        type: String,
        required:[true, 'Please enter a Contact number'],
          
    },
    imageURL:{
        type: String
    },

    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
       
    
});

//fire a function after doc saved to db
userSchema.post('save', function(doc,next){
    // console.log('new user was created:',doc);
    next();
   })
   
//fire a function before doc saved to db
   
userSchema.pre('save',async function(next){
    const salt = await  bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt); 
    next();
})

//static method to login user:

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if (user){
        const auth= await  bcrypt.compare(password,user.password);
      if(auth){
          return user;
      }
      throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('User',userSchema);

module.exports= User;