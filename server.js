// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Initialize Firebase
var firebase = require('firebase');
//var app = firebase.initializeApp({ ... });
var config = {
  apiKey: "AIzaSyBSHPT5Ec9qPtb0bpk4H6tu82r3Cv0h_lc",
  authDomain: "teste-80f90.firebaseapp.com",
  databaseURL: "https://teste-80f90.firebaseio.com",
  projectId: "teste-80f90",
  storageBucket: "teste-80f90.appspot.com",
  messagingSenderId: "520015397491"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();
var tableref = database.ref('survey');
var tablerefpres = database.ref('president');
var president = [];
var answers = [];

// Iterate through the president db
tablerefpres.on("child_added", function (childSnapshot) {
  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  // full list of items to the president
  president.push(childSnapshot.val());
  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

tableref.on("child_added", function (childSnapshot) {
  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  // full list of items to the president
  answers.push(childSnapshot.val());
  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// Sets up the Express App
// =============================================================
var app = express();
//var PORT = 3000;
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "rest.html"));
});
app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});
app.get("/president", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});
app.get("/newpresident", function (req, res) {
  res.sendFile(path.join(__dirname, "newpresident.html"));
});

app.get("/login", function (req, res) {

  signInWithGoogle();
});

app.get("/api/president", function (req, res) {
  return res.json(president);
});
app.get("/api/answer", function (req, res) {
  return res.json(answers);
});
function convertStringToInt(surveyResults) {
  for (var i = 0; i < surveyResults.length; i++) {
    surveyResults[i] = parseInt(surveyResults[i]);
  }
}
app.post("/api/answer", function (req, res) {
  //return res.json(answers);
  var surveyResults = req.body;

  surveyResults.name = surveyResults.name.replace(/\s+/g, "");

  surveyResults.photo = surveyResults.photo.replace(/\s+/g, "");

  // function converts strings to integers
  convertStringToInt(surveyResults.scores);

  // variables matched president data
  var newUserScores = surveyResults.scores;
  var matchName = '';
  var matchImage = '';
  // Starter number 
  var totalDifference = 10000;

  // Iterate through the president array
  for (var i = 0; i < president.length; i++) {
    // Initialize difference b/t scores for a particular president
    var diff = 0;
    // Iterate through each survey score of a president
    for (var j = 0; j < president[i].scores.length; j++) {
      // Difference = absolute value of potential president scores minus scores inputted by new user
      diff += Math.abs(president[i].scores[j] - newUserScores[j]);
    }
    // If this difference is less than the global score difference...
    if (diff < totalDifference) {
      // This is the new president...
      totalDifference = diff;
      // Set name and photo to the president property values
      matchName = president[i].name;
      matchImage = president[i].photo;
    }
  }

  // Respond with json of name and photo of the matched president
  res.json({
    status: 'OK',
    matchName: matchName,
    matchImage: matchImage
  });
});

// Displays all tables
app.post("/api/clearpresident", function (req, res) {
  console.log("clearPresident");
  president = [];
  var president2 = [{
    "name": "Jair Bolsonaro",
    "photo": 'https://complemento.veja.abril.com.br/brasil/teste-candidatos-presidente/img/JairBolsonaro-200x100.jpg',
    "votes": 1321,
    "scores": [
      1,
      3,
      1,
      1,
      3,
      5,
      5,
      5,
      5,
      4
    ]
  },
  {
    "name": "Henrique Meirelles",
    "photo": 'https://complemento.veja.abril.com.br/brasil/teste-candidatos-presidente/img/HenriqueMeirelles-200x100.jpg',
    "votes": 100,
    "scores": [
      4,
      3,
      2,
      2,
      4,
      1,
      2,
      2,
      3,
      3
    ]
  },
  {
    "name": "Geraldo Alckmin",
    "photo": 'https://complemento.veja.abril.com.br/brasil/teste-candidatos-presidente/img/GeraldoAlckmin-200x100.jpg',
    "votes": 101,
    "scores": [
      3,
      4,
      3,
      3,
      4,
      3,
      3,
      1,
      2,
      3
    ]
  },
  {
    "name": "João Amoedo",
    "photo": 'https://complemento.veja.abril.com.br/brasil/teste-candidatos-presidente/img/JoaoAmoedo-200x100.jpg',
    "votes": 102,
    "scores": [
      4,
      5,
      1,
      1,
      3,
      5,
      4,
      3,
      4,
      5
    ]
  },
  {
    "name": "Alvaro Dias",
    "photo": 'https://complemento.veja.abril.com.br/brasil/teste-candidatos-presidente/img/AlvaroDias-200x100.jpg',
    "votes": 103,
    "scores": [
      1,
      1,
      2,
      2,
      3,
      5,
      3,
      1,
      2,
      3
    ]
  },
  {
    "name": "Boulos",
    "photo": 'https://complemento.veja.abril.com.br/brasil/teste-candidatos-presidente/img/GuilhermeBoulos-200x100.jpg',
    "votes": 2,
    "scores": [
      5,
      1,
      5,
      5,
      5,
      1,
      1,
      1,
      1,
      1
    ]
  }];
  // Iterate through the president array
  tablerefpres.remove();
  for (var i = 0; i < president2.length; i++) {
    tablerefpres.push(president2[i]);
  }
});

// Displays all tables
app.post("/api/clearanswer", function (req, res) {
  console.log("clearAnswer");
  answers = [];
  var answers2 =
    [
      {
        "name": "Luiz Adriano",
        "photo": 'https://media.licdn.com/dms/image/C5603AQHrcdWepr4ICQ/profile-displayphoto-shrink_200_200/0?e=1539820800&v=beta&t=vcZQEYjQkluXioXBX13BcBt5HJF0xlWi3pfXxYXO8Lg',
        "votes": 100000,
        "scores": [
          1,
          3,
          1,
          1,
          3,
          5,
          5,
          5,
          5,
          4
        ]
      }
    ];
  // Iterate through the answer array
  tableref.remove();
  for (var i = 0; i < answers2.length; i++) {
    tableref.push(answers2[i]);
  }
});
// Create New pres 
app.post("/api/president", function (req, res) {
  var newpresident = req.body;
  console.log(newpresident);
  //president.push(newpresident);
  tablerefpres.push(newpresident);
  // We then display the JSON to the users
  res.json(newpresident);
});

app.post("/api/survey", function (req, res) {
  var newanswer = req.body;
  console.log(newanswer);
  //answers.push(newanswer);
  tableref.push(newanswer);
  // We then display the JSON to the users
  res.json(newanswer);
});
/* try to discover how to log session
function signInWithGoogle() {
  console.log("attempting to sign in with Google");
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

  firebase.auth().signInWithPopup(provider).catch(function(error) {
      console.log("Google Login error: ", error);
  });
}
*/
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App president listening on PORT " + PORT);
});
