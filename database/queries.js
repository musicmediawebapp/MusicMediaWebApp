var mysql = require('mysql');
var keys = require('../config/keys');

var connection;
module.exports = {
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
    },

    insertUser: function() {
        this.tryConnect().getConnection(function(err, con) {
            var sql = "INSERT INTO customers (name, address) VALUES ('Tam asf', 'Booty 45')";
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });
        });
    },

    getUser: function(callback) {
        this.tryConnect().getConnection(function(err, con) {
            var sql = "SELECT * FROM customers";
            con.query(sql, function (err, result) {
              if (err) throw err;
              return callback(result);
            });
        });
    }
}