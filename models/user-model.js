const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    local: {
		username: String,
        password: String,
        name:String,
        email:String,
        phonenumber:String,
        address:String,
        avatar:String,
        role:String
    },
    google: {
    username: String,
    googleId: String,
    thumbnail: String,
    },
    facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	}
   
});

userSchema.pre('save',function(next){
    var user=this;
    if(!user.isModified('local.password')) return next();

    bcrypt.hash(user.local.password,null,null,function(err,hash){
        if(err) return next(err);
        user.local.password=hash;
        next();
    });
});

userSchema.methods.comparePassword=function(password){
    var user=this;
    return bcrypt.compareSync(password,user.local.password);
}

const User = mongoose.model('user', userSchema);

module.exports = User;
