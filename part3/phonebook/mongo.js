const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

// a.when your password has ': / ? # [ ] @', you should encode
// otherwise Mongo will alert 'UnhandledPromiseRejectionWarning: MongoAPIError: URI must include hostname, domain name, and tld'

// b.instead of example or courses, you should let your password in without '<>'
// otherwise Mongo will alert 'UnhandledPromiseRejectionWarning: MongoServerError: bad auth : Authentication failed.'
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://tanxin:${password}@cluster0.b1vid.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({name: String, number: String})

const Phone = mongoose.model('phone', phoneSchema)

if (process.argv.length === 3) {
    console.log('phonebook:')
    Phone.find({}).then(result => {
        result.forEach(phone => {
            console.log(`${phone.name} ${phone.number}`);
        })
        mongoose.connection.close()
    })
}

// create new phone
if (process.argv.length > 3){
    const phone = new Phone({name, number})

    phone.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
