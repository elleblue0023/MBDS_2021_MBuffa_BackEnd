let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const http = require('http');

const dbConfig = require('./config/database');
let port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
    useFindAndModify: false,
}).then(() => {
        console.log('Connected to database');
    },
    error => {
        console.log('Could not connect to databse : ' + error);
    }
)

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// les routes
const prefix = '/api';

/* app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);


app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);  */

// On démarre le serveur


const server = http.createServer(app);
server.listen(port,function () { 
    console.log("===================================")
    console.log("   Server is running on port 3001");
    console.log("===================================");
})
module.exports = app;