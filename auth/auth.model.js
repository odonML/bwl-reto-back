const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: 'string',
        require: true,
        trim: true
    },
    email:{
        type: 'string',
        require: true,
        trim: true,
        unique: true
    },
    password:{
        type: 'string',
        require: true,
        trim: true
    },
    login:{
        type: 'string',
        require: true,
        trin: true
    }
},{
    timestamps: true
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
})
module.exports=userSchema;