const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const authSchema = new mongoose.Schema(
    {
        profileImage: String,
        name: {
            type: String,
            required: [true, "Please provide the name"]
        },
        email: {
            type: String,
            required: [true, "Please provide the email"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide the valid email']
        },
        password: {
            type: String,
            required: [true, 'Provide the password'],
            minlength: 8,
            select: false
        },
        confirmPassword: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function (el) {
                    return el === this.password;
                }
            }
        },
    },
    { timestamps: true }
)

//this is a function that will be worked before saving the data in DB this will actually encrypt the data
authSchema.pre('save', async function (next) {
    //Only run this function if password was actually modified
    if (!this.isModified('password')) return next()

    //hash the password with the salt 12
    this.password = await bcrypt.hash(this.password, 12)

    //delete the passwordConfirm field
    this.confirmPassword = undefined

    next()
})

authSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', authSchema)

module.exports = User;