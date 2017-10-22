var dbService = require('../database/dbService');

module.exports = app => {
    app.post('/api/user', (req, res) => {
        console.log(req.body);

        res.sendStatus(200);
    });
}