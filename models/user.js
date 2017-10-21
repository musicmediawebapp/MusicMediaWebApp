/* This maps to the "user" table in our database */
// Code to Database will always be separate values (like Gender, FirstName, etc) as variables
// Database to Code will always be converted to our middle-tier User model (aka this class)
module.exports = class User {
    constructor(dbUser) {
        this.id = dbUser.ID;
        this.googleID = dbUser.GoogleID;
        this.gender = dbUser.Gender;
        this.firstName = dbUser.FirstName;
        this.lastName   = dbUser.LastName;
        this.email = dbUser.Email; // We arbitrarily retrieve the first email. Upon set up, user can change this.
                                            // It's only when we OAuth a new user that we set this.
    }
}