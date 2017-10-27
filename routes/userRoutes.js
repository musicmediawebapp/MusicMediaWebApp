var dbService = require('../database/dbService');

module.exports = app => {
    app.post('/api/user', (req, res) => {

        dbService.replaceUserOnDuplicate(req.body, function returnResponse(insertedId) {
            var user = req.body; // Syntactic sugar
            dbService.insertActivityLog(user.id, "User has finished the setup workflow");

            if (insertedId === 0 || insertedId === user.id) {
                return res.sendStatus(200);                            
            }
            return res.sendStatus(403);
        });
    });
}