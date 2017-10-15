module.exports = class User {
    constructor(dbUser) {
        this.ID = dbUser.ID; // Unique primary key from our database
        this.googleID = dbUser.googleID;
        this.gender = dbUser.gender;
        this.firstName = dbUser.firstName;
        this.lastName   = dbUser.lastName;
        this.email = dbUser.email;
        this.isProfileSetUp = dbUser.isProfileSetUp;
    }
}