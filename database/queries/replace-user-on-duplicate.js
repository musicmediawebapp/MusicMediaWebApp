module.exports =

`
INSERT INTO user (ID, GoogleID, Gender, FirstName, LastName, Email, IsProfileSetUp, Location, PhoneNumber)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE GoogleID=?, Gender=?, FirstName=?, LastName=?, Email=?, IsProfileSetUp=?, Location=?, PhoneNumber=?;
`