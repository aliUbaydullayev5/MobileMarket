import express, {json} from 'express'
import mongoose from "mongoose"
import cors from 'cors'
import router from "./routers/auth.router.js";
import productRouter from './routers/product.router.js'
const PORT = process.env.PORT || 8081



// Connect to Server (MongoDB AWS Frankfurt)

mongoose.connect('mongodb+srv://ali:python20050302@cluster0.xoezlf8.mongodb.net/?retryWrites=true&w=majority')
    .then(()=> console.log(`Server successfully connected to Server`))
    .catch((err)=> console.log(`UPS, Server do not connected ); => ${err}`))

const app = express()
app.use(cors())
app.use(json())



// Project

app.use('/api', router, productRouter)

app.get('/test', (req, res)=> {
    res.send('Server is Working')
})



app.listen(PORT, ()=> console.log(`Server has been started on PORT: ${PORT}`))