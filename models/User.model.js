import {Schema, model, Types} from 'mongoose'

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    basket: {type: Types.ObjectId, ref: 'basket'}
})

export default model('userq', UserSchema)
