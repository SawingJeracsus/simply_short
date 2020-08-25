const express = require('express')
const config = require('config')
const mongoose = require('mongoose')


const PORT = config.get('port') || 5000     

const app = express()
console.log('server starting...')
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/links.routes'))
app.use('/t', require('./routes/to.redirect.routes'))


const start = async () => {
    try {
        await mongoose.connect(
            config.get('mongoUri'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
    app.listen(PORT, () => console.log(`App has runing at ${PORT} port!`))

    } catch (e) {
        console.error('Server error', e.message);
        process.exit(1)
    }
}

start()