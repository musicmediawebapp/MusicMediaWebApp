var dbService = require('../database/dbService');

module.exports = app => {
    app.post('/api/user', (req, res) => {
        // TODO_MINH: send error code if failed so front-end can handle it
        console.log(req.body);

        res.sendStatus(200);
    });
}