var mysql = require('mysql');
var keys = require('../config/keys');
var queries = require('./queries');

var connection;
module.exports = {
    /* Inserts a given user model given by Google OAuth */
    insertUser: function(user, callback) {
        this.tryConnect().getConnection(function(err, con) {
            var sql = queries.insertUser;
            con.query(sql, [user.id, user.gender, user.name.givenName, user.name.familyName, user.emails[0].value], function (err, result) {
                if (err) throw err;
                con.release();                
                callback(result.insertId);
            });
        });
    },

    /* Retrieves a User model by GoogleID */
    getUserByGoogleID: function(googleID, callback) {
        this.tryConnect().getConnection(function(err, con) {
            var sql = queries.getUserByGoogleID;
            con.query(sql, googleID, function (err, result) {
                if (err) throw err;
                con.release();                
                // Call the callback function in the caller of this method so we can do something with this "result"
                return callback(result); // [] if not found
            });
        });
    },

    /* Retrieves a User model by ID */
    getUserByID: function(ID, callback) {
        this.tryConnect().getConnection(function(err, con) {
            var sql = queries.getUserByID;
            con.query(sql, ID, function (err, result) {
                if (err) throw err;
                con.release();
                // Call the callback function in the caller of this method so we can do something with this "result"
                return callback(result); // [] if not found
            });
        });
    },

    tryConnect: function() {
        if (connection) { return connection; }

        // Otherwise, recreate the connection since the old one cannot be reused (due to either errors or upon initial app start-up)
        connection = mysql.createPool({
            connectionLimit: 100,
            host: keys.mySQLHost,
            user: keys.mySQLUser,
            password: keys.mySQLPassword,
            database: keys.mySQLDatabaseName
        });

        //Attempt to re-connect. If not, log errors and recall this method
        connection.getConnection(function(err) {
            if (err) {
                console.log('Error when connecting to db:', err);
                setTimeout(tryConnect, 2000); // We introduce a delay before attempting to reconnect,
            }                                     // to avoid a hot loop, and to allow our node script to
        });                                     // process asynchronous requests in the meantime.
    
        // If there is an error connecting to the MySQL server,
        // it's probably because of a connection idle timeout (wait_timeout)
        connection.on('error', function(err) {
            console.log('Database error:', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log("Reconnecting");
                tryConnect();
            } else {     
                throw err;
            }
        });

        console.log("New connection");
        return connection;
    }
}