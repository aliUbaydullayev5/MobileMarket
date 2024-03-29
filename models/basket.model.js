import {Schema, model, Types} from 'mongoose'

const BasketSchema = new Schema({
    email: {type: String, required: true},
    img1: {type: String, required: true},
    img2: {type: String, required: true},
    img3: {type: String, required: true},
    img4: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    price: {type: String, required: true},
    type: {type: String, required: true},
    data: {type: Date, default: Date.now()},
    owner: {type: Types.ObjectId, ref: 'user'}

})

export default model('basket', BasketSchema)
