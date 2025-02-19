const allowedOrigins = require('./allowedOrigins')

const corsOptions = {

    origin: (origin, callback) => {
        // like postman
        if (allowedOrigins.indexOf(origin) !== -1 ) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 




// BEFORE
// const allowedOrigins = require('./allowedOrigins')

// const corsOptions = {

//     origin: (origin, callback) => {
//         // like postman
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200
// }

// module.exports = corsOptions 