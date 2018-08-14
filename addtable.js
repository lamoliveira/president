function addtable(newtable) {
// Initialize Firebase
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
var tableref = database.ref('restaurant');
/*
var newtable =   {
    customerName: "Kevin Gonzalez",
    phoneNumber: "4074708223",
    customerEmail: "gkevin315@gmail.com",
    customerID: "gkevin315"
    };
*/

tableref.push(newtable);

}