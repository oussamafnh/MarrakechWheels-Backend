import mongoose from "mongoose";




const Userschema = new mongoose.Schema({
    username:{ type :String , required: true},
    email : { type :String , required: true},
    authentication:{
        password : { type :String, required: true , select:false},
        salt:{type :String, required: true ,select : false},
        sessionToken : { type :String, select:false},
    },
    profile_pic_url: { type: String , default: 'https://res.cloudinary.com/dhdjakjos/image/upload/v1704043714/user-profile-icon-avatar-or-person-vector-46431870_hmpabo.jpg'},
    age: { type: Number },
    citizenship: { type: String },
    sexe : { type: String },
    created_at: { type: Date, default: Date.now }
});


export const UserModel = mongoose.model('User', Userschema);



export const getUsers =() => UserModel.find();
export const getUserByEmail =(email : string) => UserModel.findOne({ email });
export const getUserBySessionToken =(sessionToken : string) => UserModel.findOne({
    'authentication.sessionToken' : sessionToken,
});

export const getUserById = (id:string) => UserModel.findById(id);

export const createUser = (values:Record<string , any>) => UserModel.create(values);

export const updateUser = (id:string, values:Record<string, any>) => new UserModel(values)
    .save().then((user)=>user.toObject());

export const deleteUserById = (id:string) => UserModel.findByIdAndDelete({_id: id});

export const updateUserById = (id:string, values:Record<string , any>) => UserModel.findByIdAndUpdate(id , values);