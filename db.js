const Sequelize =require('sequelize');

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
  })
  
  
  module.exports = db;