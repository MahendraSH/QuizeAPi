const moongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new moongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name!'],
        trim: true,
        maxlength: [30, 'Your name cannot exceed 20 characters'],
        minLenght: [3, 'Your name must be at least 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email!'],
        validator: [validator.isEmail, 'Please enter a valid email!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password!'],
        minLenght: [6, 'Your password must be at least 6 characters'],
        select: false,
    },

    role: {
        type: String,
        default: 'user',
    },

    createAt: {
        type: Date,
        default: Date.now,
    },


    resetPasswordToken: String,
    resetPasswordExpire: Date,

});


//   encrypt password before saving 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const SALT_KEY = Number(process.env.SALT_KEY) || 10;
    this.password = await bcrypt.hash(this.password, SALT_KEY);

});
//  compare password 
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//  jwttoken generate 

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};



// userSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//     return resetToken;
// };

//  genreate rested token using crypto
userSchema.methods.generateResetToken = function () {
    const restToken = crypto.randomBytes(Number(process.env.crytoToken_Random_bufferSize)).toString('hex');
    this.resetPasswordToken = crypto.createHash(process.env.crypto_algo).update(restToken).digest('hex');
    this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);

    return restToken;
}


module.exports = moongoose.model('User', userSchema);   