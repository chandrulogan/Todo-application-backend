const mongoose = require('mongoose')
const colors = require('colors')

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        // console.log(`Mongo database is connected :${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit
    }
}

module.exports = connectDatabase