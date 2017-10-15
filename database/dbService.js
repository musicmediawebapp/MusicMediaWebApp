var mysql = require('mysql');
var keys = require('../config/keys');
var queries = require('./queries');

var connection;
module.exports = {
    /* Inserts a given user model given by Google OAuth */
    insertUser: function(user) {
        this.tryConnect().getConnection(function(err, con) {
            var sql = `INSERT INTO user (GoogleID, Gender, FirstName, LastName, Email) 
                       VALUES (?, ?, ?, ?, ?)`;
            con.query(sql, [user.id, user.gender, user.name.givenName, user.name.familyName, user.emails[0].value], function (err, result) {
                con.release();
                if (err) throw err;
            });
        });
    },

    /* Retrieves a User model by GoogleID */
    getUserByGoogleID: function(googleID, callback) {
        this.tryConnect().getConnection(function(err, con) {
            var sql = queries.getUserByGoogleID;
            con.query(sql, googleID, function (err, result) {
                con.release();
                if (err) throw err;
                // Call the callback function in the caller of this method so we can do something with this "result"
                return callback(result);
            });
        });
    },

    /* Retrieves a User model by ID */
    getUserByID: function(ID, callback) {
        this.tryConnect().getConnection(function(err, con) {
            var sql = `SELECT * 
                       FROM user 
                       WHERE ID = ?`;
            con.query(sql, ID, function (err, result) {
                con.release();
                if (err) throw err;
                // Call the callback function in the caller of this method so we can do something with this "result"
                return callback(result);
            });
        });
    },

    tryConnect: function() {
        // Singleton: if connection is already established, return it
        if (connection) {
            console.log("Getting connection...already made");
            return connection;
        }

        // Otherwise, recreate the connection since the old one cannot be reused (due to either errors or upon initial app start-up)
        connection = mysql.createPool({
            connectionLimit: 100,
            host: keys.mySQLHost,
            user: keys.mySQLUser,
            password: keys.mySQLPassword,
            database: keys.mySQLDatabaseName
        });

        // Attempt to re-connect. If not, log errors and recall this method
        connection.getConnection(function(err) {
            if (err) {
                console.log('Error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            }                                     // to avoid a hot loop, and to allow our node script to
        });                                     // process asynchronous requests in the meantime.
    
        // If there is an error connecting to the MySQL server,
        // it's probably because of a connection idle timeout (wait_timeout)
        connection.on('error', function(err) {
            console.log('Database error:', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log("Reconnecting");
                handleDisconnect();
            } else {     
                throw err;
            }
        });

        console.log("NEW CONNECTION");
        return connection;
    }
}