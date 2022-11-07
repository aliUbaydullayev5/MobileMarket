import {Router} from "express";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import {validationResult, check} from "express-validator";
import UserSchema from '../models/User.model.js'

const router = new Router()

router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
], async (req, res)=> {
    try{
        const error = validationResult(req)

        if (!error.isEmpty()){
            return res.status(400).json({
                errors: error.array(),
                message: 'min: 6'
            })
        }

        const {email, password} = req.body

        const condidate = await UserSchema.findOne({email})

        if (condidate) return res.status(400).json({message: 'Such a user exists'})

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await UserSchema({email, password: hashedPassword})
        await user.save()
        res.status(200).json({message: 'User has been successfully created'})

    }catch (e){
        res.status(400).json({message: '404 register'})
    }
})


router.post('/login', [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пороль').exists()
], async (req, res)=> {
    try{
        const error = validationResult(req)

        if (!error.isEmpty()){
            return res.status(400).json({
                errors: error.array(),
                message: 'min: 6'
            })
        }

        const {email, password} = req.body

        const user = await UserSchema.findOne({email})

        if (!user) return res.status(400).json({message: 'User not found'})

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(400).json({message: 'Invalid password'})

        const token = jwt.sign(
            {userId: user.id, userEmail: user.email},
            'sekret key',
            {expiresIn: '1h'}
        )
        res.json({token, user: user.email})

    }catch (e){
        res.status(400).json({message: '404'})
    }
})


export default router
