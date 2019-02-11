const express = require('express');
const auth = require('@api/common').auth;
const v = require('@api/contactsList/validation');
const {validationResult } = require('express-validator/check');
const controller = require('./controller');
const contactsController=require('@api/contactsList/contacts/index').controller;
const contactsValidator=require('@api/contactsList/contacts/validation')
const membersController=require('@api/contactsList/members/index').controller;

const router = express.Router({ mergeParams: true });

function post(req, res) {
  const errors = validationResult(req).formatWith(v.errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  return controller.save(req)
    .then(result => res.json({ message: 'list saved successfully', id: result.id }))
    .catch(err => res.json({ message: 'not able to save list' }));
}

function get(req, res) {
  const id = req.query.id; // need to implement better approach
  if (id) {
    return controller.getById(id)
      .then(result => res.json({ contactsList: result }))
      .catch(err => res.json({ message: `not such contacts list exist with id ${id}` }));
  }
  const params = req.query.includePrivate;
  if (params === 'true') {
    return controller.getByType('private')
      .then(result => res.json({ contactsList: result }))
      .catch(err => res.json({ message: 'not able to get list' }));
  }

  return controller.getByType('public')
    .then(result => res.json({ contactsList: result }))
    .catch(err => res.json({ message: 'not able to get list' }));
}

function postContact(req,res){
  const errors = validationResult(req).formatWith(v.errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
let request=req.body;
request.contactListId=req.params.id;
return contactsController.save(request)
.then(result => res.json({ message: 'contact saved successfully', id: result.id  }))
.catch(err => res.json({ message: 'not able to save contact' }));
}

function getContact(req,res){
  try{
  const errors = validationResult(req).formatWith(contactsValidator.errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  return contactsController.getByListId(req.params.id)
    .then(result => res.json({ contact: result }))
    .catch(err => res.json({ message: 'not able to get contacts' }));
}catch(err){
 return res.json({ err});
}
}

function postMember(req,res){
  let request=req.body;
  let contactListId=req.params.id;
  console.log(request);
  request.forEach(element => {
    element.contactListId=contactListId;
    membersController.save(element);
  });
  return res.json({message: "saved members successfully"});
}

function getMember(req,res){
  try{
    // const errors = validationResult(req).formatWith(contactsValidator.errorFormatter);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json(errors.array());
    // }
    console.log(req.params.id);
    return membersController.getByListId(req.params.id)
      .then(result => res.json({ member: result }))
      .catch(err => res.json({ message: 'not able to get members' }));
  }catch(err){
   return res.json({ err});
  }
}
router.post('/', auth.required, v.requestValidator, post);
router.get('/', auth.required,get);
router.post('/:id/contacts',auth.required,contactsValidator.requestValidator,postContact);
router.get('/:id/contacts',auth.required,contactsValidator.getrequestValidator,getContact);
router.get('/:id/members', auth.required,getMember);
router.post('/:id/members',auth.required,postMember);
module.exports = router;
