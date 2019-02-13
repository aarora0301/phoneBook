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
payload: email, password. This API will register new user and return authToken<br/>
2.http://localhost:8282/api/users/login : for user login.
This will authenticate existing user and return authToken.<br/>
3.http://localhost:8282/api/contactslist:
POST creates a new contact list with some name you give in the payload and if any initial contacts are
given and also with type- public or private<br/>
GET returns all the public contact lists<br/>
?includePrivate=true
GET returns all the private contact lists that the auth token has permissions for<br/>
Standard Payload for POST
{ name, createdBy, createdAt, type }<br/>
4.http://localhost:8282/api/contactslist/id:
GET specific contact list by id <br/>
5.http://localhost:8282/api/contacts.list/<id>/contacts<br/>
GET all the contacts under this contact list<br/>
POST add a contact to this list<br/>

Fields:
name mandatory
numbers array, at least one needs to be there
mails array, optional
company optional
tags optional

Standard Payload
{ name, numbers: [], emails: [], company, tags: [] }<br/>

6.http://localhost:8282/api/contacts.list/<id>/members:<br/>
GET list of members who can access this list<br/>
POST add a member to this list<br/>
Standard Result<br/>
[ { id, name, addedBy, addedOn }, { id, name, addedBy, addedOn } ]<br/>
7.http://localhost:8282/api/contacts.list/<id>/permissions : TO DO<br/>
ONLY USER TYPE ADMIN CAN MAKE THESE CALLS<br/>
GET permissions on this contacts list<br/>
POST update permissions for this contacts list<br/>

Standard Payload<br/>
{ member1Id: { canEdit: true, canAdd: false, canDelete: false, canShare: true } }<br/>

Similar data gets returned on GET call<br/>

##Project Structure:

