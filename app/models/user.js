var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  return jwt.sign({
    _id: this._id,
    username: escape(this.username),
    exp: parseInt((Date.now() + 2 * 60 * 60 * 1000)), //token lifetime = 2hr
    // exp: parseInt((Date.now() + 10*1000)),
  }, require('./../../configuration').secretTokkenWord);
};

userSchema.statics.getAll = function(cb) {
  this.model('User').find(cb);
};

mongoose.model('User', userSchema);