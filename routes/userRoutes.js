var dbService = require('../database/dbService');

module.exports = app => {
    app.post('/api/user', (req, res) => {
        dbService.replaceUserOnDuplicate(req.body, function(insertedId) {
            // TODO_MINH: Stuff the ID and other fields into the req.body to check against the insertedId
            res.sendStatus(200);            
        });
    });
}