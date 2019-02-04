const express = require('express');
const statusCodes = require('http-status-codes');
const controller = require('./controller');
const auth = require('@api/common').auth;

// we might need to access all the routing params from parent as well,
// so the better practice is to have mergeParams: true
const router = express.Router({ mergeParams: true });

function post(req, res) {
  let user = controller.validateUserRequest(req, res);
  if (!user) {
    user = controller.save(req);
    user
      .then((user) => {
        res.json({ user: controller.sendAuthUser(user) });
      }).catch((err) => {
        res.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
      });
  }
}

function get(req,res){
    controller.validateUserRequest(req, res);
    user=controller.getUser(req,res);
    // user
    
    // .then(()=>{
    //   res.json({ user: controller.sendAuthUser(user) });
    // }).catch((err)=>{
    //   res.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
    // });
  
}
router.post('/', auth.optional, post);
router.post('/login', auth.optional,get);
module.exports = router;