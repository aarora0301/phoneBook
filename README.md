# Project Title

PhoneBook Management system

## Technologies used

Backend Frameworks: NodeJS, ExpressJS
Database used: Mongo
ORM: Mongoose
Validation Framework: express-validator
Session Management:express-session
Authentication Framework: PassportJS(Local Strategy)
Token Management: express-jwt/jsonwebtoken

### API Developed:
1.http://localhost:8282/api/users/register : for registering new user
payload: email, password. This API will register new user and return authToken
2.http://localhost:8282/api/users/login : for user login.
This will authenticate existing user and return authToken.
3.http://localhost:8282/api/contactslist:
POST creates a new contact list with some name you give in the payload and if any initial contacts are given and also with type- public or private
GET returns all the public contact lists
?includePrivate=true
GET returns all the private contact lists that the auth token has permissions for
Standard Payload for POST
{ name, createdBy, createdAt, type }
4.http://localhost:8282/api/contactslist/id:
GET specific contact list by id
5.http://localhost:8282/api/contacts.list/<id>/contacts
GET all the contacts under this contact list
POST add a contact to this list

Fields:
name mandatory
numbers array, at least one needs to be there
mails array, optional
company optional
tags optional

Standard Payload
{ name, numbers: [], emails: [], company, tags: [] }

6.http://localhost:8282/api/contacts.list/<id>/members:
GET list of members who can access this list
POST add a member to this list
Standard Result
[ { id, name, addedBy, addedOn }, { id, name, addedBy, addedOn } ]
7.http://localhost:8282/api/contacts.list/<id>/permissions : TO DO
ONLY USER TYPE ADMIN CAN MAKE THESE CALLS
GET permissions on this contacts list
POST update permissions for this contacts list

Standard Payload
{ member1Id: { canEdit: true, canAdd: false, canDelete: false, canShare: true } }

Similar data gets returned on GET call

##Project Structure:

