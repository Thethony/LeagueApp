const User = require('../Models/User');
async function SaveUser(name, email, password) {
    let obj = new User({
        name: name,
        email: email,
        password: password
    });
    await obj.save();
}

async function GetUser(id) {
    let user = await User.findOne({ _id: id }).exec();
    return user;
}
async function AuthUser(email,password) {
    let user = await User.findOne({ email: email,password:password }).exec();
    return user;
}
async function GetUserByEmail(email) {
    let user = await User.findOne({ email: email }).exec();
    if(user){
        return true;
    }
    return false;
}
async function GetAllUsers() {
    let users = await User.find({}).exec();
    return users;
}
module.exports = {
    SaveUser,
    GetUser,
    GetAllUsers,
    GetUserByEmail,
    AuthUser
};