/* This maps to the "user" table in our database */
module.exports = class User {
    constructor(dbUser) {
        this.googleID = dbUser.id;
        this.gender = dbUser.gender;
        this.firstName = dbUser.name.givenName;
        this.lastName   = dbUser.name.familyName;
        this.email = dbUser.emails[0].value; // We arbitrarily retrieve the first email. Upon set up, user can change this.
                                            // It's only when we OAuth a new user that we set this.
    }
}