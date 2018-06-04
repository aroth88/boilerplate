const {db} = require('./db');
if (process.env.NODE_ENV === 'development') {
    require('./localSecrets'); // this will mutate the process.env object with your secrets.
}
const app = require('./server');



const port = process.env.PORT || 8080; // this can be very useful if you deploy to Heroku!

db.sync()
.then(() => {
    console.log('db has been synced')
    app.listen(port, function () {
        console.log("Knock, knock");
        console.log("Who's there?");
        console.log(`Your server, listening on port ${port}`);
    });
})