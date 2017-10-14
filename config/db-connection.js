var mysql = require('mysql');
var keys = require('./keys');

module.exports = {

    handleDisconnect: function() {
        // Recreate the connection since the old one cannot be reused
        var connection = mysql.createConnection({
            host: keys.mySQLHost,
            user: keys.mySQLUser,
            password: keys.mySQLPassword,
            database: keys.mySQLDatabaseName
        });
    
        // The server is either starting or restarting
        connection.connect(function(err) {
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

        // When we successfully connect to the database server, return it so other files can write queries
        return connection;
    }
}


