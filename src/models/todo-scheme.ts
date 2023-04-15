import mongoose, { Schema } from 'mongoose';

try {
    const dbconnect:string = "mongodb://127.0.0.1:27017/mydata?retryWrites=true&w=majority"
    mongoose.connect(dbconnect)
    mongoose.connection.on('open',()=>{
        console.log('DB Connect !')
    })
} catch (error) {
    mongoose.connection.on('Error',(err)=>{
        console.log(err)
    })
}
const todoScheme: Schema = new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    duty:{type:String},
},
{
    versionKey:false,
    timestamps:true
})
const todoApp = mongoose.model('user', todoScheme)
export {
    todoApp
}