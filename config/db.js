const mongoose = require('mongoose')
module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI)
        if (response) console.log('Connect mongo database success')
    } catch (error) {
        console.log(error.message)
    }
}
