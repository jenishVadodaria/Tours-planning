const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')
const Tour = require('../../models/tourModel')

dotenv.config({ path: `./.env` })
const DB =
    process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Data successfully loaded');
        process.exit()

    } catch (error) {
        console.log(error);
    }
}

const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data successfully deleted');
        process.exit()
    } catch (error) {
        console.log(error);
    }
}


// process.argv : 

// To run this process, write 'node dev-data/data/import-dev-data.js --delete' in command line without quotes.
// console after executing this piece of program will look like,
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'D:\\Programs\\Node - Natours\\dev-data\\data\\import-dev-data.js',
//     '--delete'
// ]
if (process.argv[2] === "--delete") {
    deleteData()
}


// and to import all data, write node dev-data/data/import-dev-data.js --import
// console after executing this piece of program will look like,
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'D:\\Programs\\Node - Natours\\dev-data\\data\\import-dev-data.js',
//     '--import'
// ]
else if (process.argv[2] === "--import") {
    importData()
}

console.log(process.argv)
