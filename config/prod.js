module.exports = {
    mongoURI: process.env.MONGO_URI,

    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

    cookieKey: process.env.COOKIE_KEY,

    mySQLHost: process.env.CLEARDB_HOST, // ClearDB hosts our SQL server
    mySQLUser: process.env.CLEARDB_USER,
    mySQLPassword: process.env.CLEARDB_PASSWORD,
    mySQLDatabaseName: process.env.CLEARDB_DATABASE_NAME
};