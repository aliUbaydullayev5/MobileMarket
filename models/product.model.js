import {Schema, model} from "mongoose";

const ProductSchema = new Schema({
    img1: {type: String, required: true},
    img2: {type: String, required: true},
    img3: {type: String, required: true},
    img4: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    price: {type: String, required: true},
    type: {type: String, required: true},
    data: {type: Date, default: Date.now()},
})

export default model('product', ProductSchema)
