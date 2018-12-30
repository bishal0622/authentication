const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const env=require('dotenv').config({path: './.env'}).parsed;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: [ 'USER','DOCTOR', 'ADMIN' ]
    }
});

UserSchema.methods = {
    generateToken() {
        return jwt.sign({ _id: this._id, username: this.username }, env.SECRET);
    }
};

UserSchema.statics = {
    async userExists(username) {
        try {
            const user = await this.findOne({ username });
            if (user) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }
};

module.exports = mongoose.model('User', UserSchema);
