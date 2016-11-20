var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALT_INDEX = 10,
    UserSchema = new mongoose.Schema({
      username : {
        type: String,
        unique: true
      },
      email : {
        type: String,
        unique: true
      },
      name: String,
      password: String,
      created: {
        type: Number,
        default: () => Date.now()
      }
});

UserSchema.pre('save', (next) => {
  var user = this; // new User(req.body);

  // user.email = user.email.toLowerCase();

  // only hash the password if modified or a new user
  if ( !user.isModified('password') ) {
    return next();
  }

  // generate a salt value to encrypt our password
  bcrypt.genSalt(SALT_INDEX, (saltErr, salt) => {
    if ( saltErr ) {
      console.error(saltErr);
      return next(saltErr);
    }
    console.info('SALT GENERATED', salt);

    //hashing the password
    bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
      if( hashErr ) {
        console.error(hashErr);
        return next(hashErr);
      }
      //override plain text password with the hashed one
      user.password = hashedPassword;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
