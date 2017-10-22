var dbService = require('../database/dbService');

module.exports = app => {
    app.post('/api/user', (req, res) => {

        dbService.replaceUserOnDuplicate(req.body, function returnResponse(insertedId) {
            if (insertedId === 0 || insertedId === req.body.id) {
                return res.sendStatus(200);                            
            }
            // TODO_MINH: Send an appropriate error to handle by the front-end
            return res.send({});
        });
    });
}