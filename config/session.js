const session = require('express-session');
const { MongoStore } = require('connect-mongo');

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        ttl: 24 * 60 * 60 // 24 hours logout requirement
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        httpOnly: true, // Security: Prevents XSS cookie theft
        secure: false,  // Set to true only if using HTTPS
        sameSite: 'lax'
    }
});

module.exports = sessionConfig;