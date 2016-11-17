var User = require('../models/user'); // db.users

function create (req, res) {

    var newDoc = new User(req.body);

    newDoc.save((err, doc)=>{
        if(err){
            return res.send(err);
        }
        res.send(doc);
    });
}


function get (req, res) {
  // get one
  if(req.params.id){
    User.findOne({__id: req.params.id}, (err, user) =>{
      if(err) {
        return res.send(err);
      }
      res.send(user);
    });
  } else {
  //get many
  User.find({}, (err,users) => {
    res.send(users);
  });
}
}

module.exports = {
    create : create,
    get    : get
}
