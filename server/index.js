var express = require('express');
/* We are using a single instance of Express to handle incoming requests */
var app = express();

/* Dummy router example */
app.get('/api/test', (req, res) => {
    res.send({ test: 'test' });
});

/* Instruct Express to listen to this port */
app.listen(process.env.PORT || 5000);