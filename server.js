let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let http = require('http');
let dbConfig = require('./config/database');
let port = process.env.PORT || 3001;

/* Routes import */
let professorRoutes = require('./routes/professor');
let courseRoutes = require('./routes/course');
let promotionRoutes = require('./routes/promotion');
let assignmentRoutes = require('./routes/assignment');
let studentRoutes = require('./routes/student');


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
const prefix = '/api/';

/*app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);


app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);  */



//Partie Professeur
app.route(prefix + 'professors')
  .post(professorRoutes.create)
  .put(professorRoutes.update);

app.route(prefix + 'professor/:id')
  .get(professorRoutes.getById);
  
app.route(prefix + 'professor/login')
  .post(professorRoutes.login);


app.route(prefix + 'professors')
  .get(professorRoutes.getAll);

app.route(prefix + 'professor/logout/:id')
  .get(professorRoutes.logout);


//Partie Cours
app.route(prefix + 'courses')
  .get(courseRoutes.getAll);

app.route(prefix + 'courses/:id')
  .get(courseRoutes.getById)
  .delete(courseRoutes.delete);
  
app.route(prefix + 'courses')
  .post(courseRoutes.create)
  .put(courseRoutes.update);


//Partie Promotion
app.route(prefix + 'promotions')
  .get(promotionRoutes.getAll);

app.route(prefix + 'promotions/:id')
  .get(promotionRoutes.getById)
  .delete(promotionRoutes.delete);
  
app.route(prefix + 'promotions')
  .post(promotionRoutes.create)
  .put(promotionRoutes.update);


//Partie Assignment
app.route(prefix + 'assignments')
  .get(assignmentRoutes.getAll);

app.route(prefix + 'assignments/:id')
  .get(assignmentRoutes.getById)
  .delete(assignmentRoutes.delete);
  
app.route(prefix + 'assignments')
  .post(assignmentRoutes.create)
  .put(assignmentRoutes.update);


//Partie Student
app.route(prefix + 'students')
  .post(studentRoutes.create)
  .put(studentRoutes.update);

app.route(prefix + 'students/:id')
  .get(studentRoutes.getById);
  
app.route(prefix + 'students/login')
  .post(studentRoutes.login);


app.route(prefix + 'students')
  .get(studentRoutes.getAll);

app.route(prefix + 'students/logout/:id')
  .get(studentRoutes.logout);


const server = http.createServer(app);
server.listen(port,function () { 
    console.log("===================================")
    console.log("   Server is running on port 3001");
    console.log("===================================");
})
module.exports = app;