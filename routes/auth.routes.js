const {Router, json} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const e = require('express')
const router = Router()


// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password, minimum 6 charts length!').isLength({
            min: 6
        })
    ],
    async (req, res) => {

    try {
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Uncorected form value',
            })
        }

        const {email, password} = req.body



        const candidate = await User.findOne({ email })
        if(candidate){
            return res.status(400).json({
                message: 'User with that email is already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User ({
            email,
            password: hashedPassword
        })
        await user.save();

        res.status(201).json({
            message: 'User created!'
        })

    } catch (e) {
        // console.error();
        res.status(500),json({
            message: 'smth going wrong! try one more time',
            original_message: e.message
        })
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Type correct email!').normalizeEmail().isEmail(),
        check('password', 'Type correct password!').exists()
    ],  

    async (req, res) => {
        try {

            const errors = validationResult(req)
            console.log(req.body);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Uncorected form data'
                })
            }
    
            const {email, password} = req.body
            const user = await User.findOne( { email } )
            if(!user){
                res.status(400).json({
                    message: 'User with this email or password not exists!'
                })
            }

            const isMatch = await bcrypt.compare(password, user .password)
            if(!isMatch){
                res.status(400).json({
                    message: 'User with this email or password not exists!'
                })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {
                    expiresIn: '1h'
                }
            )

            res.json({
                token,
                userId: user.id 
            })

        } catch (e) {
            res.status(500),json({
                message: 'smth going wrong! try one more time',
                original_message: e.message
            })
        }
})

module.exports = router;