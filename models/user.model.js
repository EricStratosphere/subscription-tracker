import mongoose from 'mongoose'

const userSchema = new mongoose.Schema( {
    name : {
        type : String,
        required : [true, 'User Name is required'],
        trim : true,
        minLength : 2,
        maxLength : 50
    },
    email : {
        type : String,
        required : [true, 'User Email is required'],
        unique : true,
        lowercase : true,
        minLength : 5,
        maxLength : 255,
        match : [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password : {
        type : String,
        required : [true, 'User Password is required'],
        minLength : 6,
    },
}, {timestamps : true});

const User = mongoose.model('User', userSchema);
//timestamps lets us know when the user has been created, updated or modified

export default User;