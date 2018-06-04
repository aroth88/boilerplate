const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const dbInUse = 'boiler-tester';

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${dbInUse}`, {
    logging: false // unless you like the logs
    // ...and there are many other options you may want to play with
  });


  const Test = db.define('test', {
      test: Sequelize.STRING
  });

  const NewTest = db.define('test2', {
      test: Sequelize.STRING
  });

  const User = db.define('user', {
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    salt: {
        type: Sequelize.STRING
    },
    google_id: {
        type: Sequelize.STRING
    }
  }, {
      hooks: {
          beforeCreate: setSaltAndPassword,
          beforeUpdate: setSaltAndPassword
      }
  });

  User.prototype.correctPassword = function(enteredPassword) {
      return User.encryptPassword(enteredPassword, this.salt) === this.password;
  };

  User.prototype.sanitize = function() {
    return _.omit(this.toJSON(), ['password', 'salt']);
}

  User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

  User.encryptPassword = function(plainText, salt) {
    const hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
  }

  function setSaltAndPassword(user) {
    // we need to salt and hash again when the user enters their password for the first time
    // and do it again whenever they change it
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password, user.salt)
    }
  }
  
  
  module.exports = {
      db, User
  };