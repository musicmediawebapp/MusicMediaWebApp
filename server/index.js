var express = require('express');
/* We are using a single instance of Express to handle incoming requests */
var app = express();

/* Dummy router example */
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

/* Instruct Express to listen to this port */
app.listen(5000);