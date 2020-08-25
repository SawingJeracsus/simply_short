const auth = require('../middleware/auth.middleware')
const {Router} = require('express')
const Link = require('../models/Link');
const { model } = require("mongoose");
const config = require('config')
const shortid = require('shortid')
const path = require('path')
const router = Router()

if(process.env.NODE_ENV === "production"){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = shortid.generate(from)
        const existing = await Link.findOne({ from })
        if (existing) {
            res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId 
        })
        await link.save()
        res.status(201, {
            link
        })

    } catch (e) {
        res.status(500).json({
            message: 'smth going wrong! try one more time',
            original_message: e.message
        })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId }) 
        res.json(links)
    } catch (e) {
        res.status(500).json({
            message: 'smth going wrong! try one more time',
            original_message: e.message
        })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const links = await Link.findById(req.params.id) 
        // console.log(links)
        res.json(links)

    } catch (e) {
        res.status(500).json({
            message: 'smth going wrong! try one more time',
            original_message: e.message
        })
    }
})


module.exports = router;
