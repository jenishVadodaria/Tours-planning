const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: `./config.env` })

const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

const DBConnect = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(DB)
        console.log(`DB connection succesfull`);
    }
    catch (err) {
        console.log(err);
    }
}
DBConnect()

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})