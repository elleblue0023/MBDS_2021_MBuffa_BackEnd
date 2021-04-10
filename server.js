let express = require('express');
let app = express();
let mongoose = require('mongoose');
let http = require('http');
let dbConfig = require('./config/database');
let jwt = require('./middlewares/verifyToken');

let port = process.env.PORT || 3001;
let cors = require('cors');

/* Routes import */
let professorRoutes = require('./routes/professor');
let courseRoutes = require('./routes/course');
let promotionRoutes = require('./routes/promotion');
let assignmentRoutes = require('./routes/assignment');
let studentRoutes = require('./routes/student');
let professorPublicationRoutes = require('./routes/professor-publication');
let utilsRoutes = require('./routes/utils');



mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connected to database');
},
  error => {
    console.log('Could not connect to databse : ' + error);
  }
)


// Pour les formulaires
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Pour autoriser les connexions cross-domain (CORS)



// les routes
const prefix = '/api/';

app.use(cors());
/**--------------------------------------------
 *               COURSE & PROMOTION API
 *---------------------------------------------**/
app.route(prefix + 'courses')
.get(courseRoutes.getAll);

app.route(prefix + 'promotions')
  .get(promotionRoutes.getAll);
  
app.route(prefix + 'courses/:id')
  .get(courseRoutes.getById)
  .delete(courseRoutes.delete);
  
app.route(prefix + 'courses')
  .post(courseRoutes.create)
  .put(courseRoutes.update);

app.route(prefix + 'promotions/:id')
  .get(promotionRoutes.getById)
  .delete(promotionRoutes.delete);
  
app.route(prefix + 'promotions')
  .post(promotionRoutes.create)
  .put(promotionRoutes.update);
/**--------------------------------------------
 *               PROFESSORS API
 *---------------------------------------------**/

app.route(prefix + 'professors')
  .post(professorRoutes.create)

app.route(prefix + 'students')
  .post(studentRoutes.create);


app.route(prefix + 'professor/login')
  .post(professorRoutes.login);

app.route(prefix + 'students/login')
  .post(studentRoutes.login);
  
app.use(jwt.verify); // Function to verify token
/**========================================================================
 *                          NEED TOKEN TO ACCESS 
 *========================================================================**/
app.route(prefix + 'professors')
  .put(professorRoutes.update);

app.route(prefix + 'professors')
  .get(professorRoutes.getAll);

app.route(prefix + 'professor/:id')
  .get(professorRoutes.getById);

app.route(prefix + 'professor/logout/:id')
  .get(professorRoutes.logout);



/**--------------------------------------------
 *               PROFESSORS API
 *---------------------------------------------**/
app.route(prefix + 'professor/publications')
  .post(professorPublicationRoutes.create)
  .get(professorPublicationRoutes.getAll)
  .put(professorPublicationRoutes.update);

app.route(prefix + 'professor/current-publication/:id')
  .get(professorPublicationRoutes.getById);

app.route(prefix + 'professor/publications/professors')
  .get(professorPublicationRoutes.findByProfessorId);

app.route(prefix + 'professor')
  .get(professorRoutes.currentProfessor);

app.route(prefix + 'professor/publications/assignment/:promotion')
  .get(professorPublicationRoutes.findByPromotion);

/**--------------------------------------------
 *               ASSIGNMENTS API
 *---------------------------------------------**/
app.route(prefix + 'assignments')
  .get(assignmentRoutes.getAll);

app.route(prefix + 'assignments/:id')
  .get(assignmentRoutes.getById)
  .delete(assignmentRoutes.delete);
  
app.route(prefix + 'assignments')
  .post(assignmentRoutes.create)
  .put(assignmentRoutes.update);

app.route(prefix + 'assignments/student')
  .get(assignmentRoutes.findByStudentId);


/**--------------------------------------------
 *               STUDENTS API
 *---------------------------------------------**/
app.route(prefix + 'students')
  .put(studentRoutes.update);

app.route(prefix + 'students/:id')
  .get(studentRoutes.getById);
  
app.route(prefix + 'students')
  .get(studentRoutes.getAll);

app.route(prefix + 'students/logout/:id')
  .get(studentRoutes.logout);

app.route(prefix + 'student')
  .get(studentRoutes.currentStudent);





const server = http.createServer(app);
server.listen(port, function () {
  console.log("=====================================================")
  console.log("   Server is running on port 3001 : " + dbConfig.db);
  console.log("=====================================================");
})
module.exports = app;