import {Router} from 'express'
import authMiddleWare from "../middleWare/auth.middleWare.js"
import ProductSchema from '../models/product.model.js'
import BasketSchema from '../models/basket.model.js'

const router = new Router()

// ---------- GET all Products

router.get('/' , async (req, res)=> {
    try{
        const products = await ProductSchema.find()
        res.json(products)
    }catch (e){
        res.status(400).json({message: '404'})
    }
})




// ---------- GET all Products from Basket

router.get('/basket', authMiddleWare, async (req, res)=> {
    try{
        const basket = await BasketSchema.find({email: req.user.userEmail})
        res.json(basket)
    }catch (e){
        res.status(400).json({message: '404'})
    }
})



// ---------- GET one Product of Products

router.get('/:id', async (req, res)=> {
    try{
        const product = await ProductSchema.find({_id: req.params.id})
        res.json(product)
    }catch (err){
        res.status(500).json({message: '404'})
    }
})


// ---------- POST one Product to

router.post('/addProduct', authMiddleWare, async (req, res)=> {
    try{
        if (req.user.userEmail !== 'admin@admin.com') return res.status(401).json({message: 'only ADMIN'})
        const {title, desc, price, type, img1, img2, img3, img4} = req.body

        const product = new ProductSchema({img1, img2, img3, img4, title, desc, price, type})

        await product.save()
        res.status(201).json({message: 'Success fully saved', data: product})
    }catch (e){
        res.status(400).json({message: 'error addProduct'})
    }
})


// ---------- POST add new Product to basket

router.post('/addToBasket', authMiddleWare, async (req, res)=> {
    try{
        const {productId} = req.body
        const product = await ProductSchema.find({_id: productId})
        const basket = new BasketSchema({
            productId: product[0]._id,
            email: req.user.userEmail,
            img1: product[0].img1,
            img2: product[0].img2,
            img3: product[0].img3,
            img4: product[0].img4,
            title: product[0].title,
            desc: product[0].desc,
            price: product[0].price,
            type: product[0].type,
            data: product[0].data,
            owner: product[0].owner
        })
        await basket.save()
        res.status(201).json({message: 'Success fully saved'})
    }catch (e){
        res.status(400).json({message: '404'})
    }
})



// ---------- POST add new Product to basket

router.post('/delete', authMiddleWare, async (req, res)=> {
    try{
        const {productId} = req.body
        await BasketSchema.deleteOne({_id: productId})
        res.status(201).json({message: 'Success fully deleted'})
    }catch (e){
        res.status(400).json({message: '404'})
    }
})



export default router
