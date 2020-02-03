
// Firebase database information and key
var firebaseConfig = {
    apiKey: "AIzaSyBUMj1AoCMc6yzU-AMldR-l9bR-CVzG4Ec",
    authDomain: "train-scheduler-d53e6.firebaseapp.com",
    databaseURL: "https://train-scheduler-d53e6.firebaseio.com",
    projectId: "train-scheduler-d53e6",
    storageBucket: "train-scheduler-d53e6.appspot.com",
    messagingSenderId: "653860517966",
    appId: "1:653860517966:web:41f5dbadee7b77103eab1f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.database();

//   On-click event for button to add new train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFreq
    };
  
    // Uploads employee data to the database
    db.ref().push(newTrain);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
})

db.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;

    var trainStartdeUnixer = moment.unix(trainStart).format("MM/DD/YYYY");


    var trainStartConverted = moment(trainStartdeUnixer, "HH:mm").subtract(1, "years");
    // var currentTime = moment();

    var diffTime = moment().diff(moment(trainStartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);
    
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        // $("<td>").text(convertTrainStart),
        $("<td>").text(trainFreq),
        // $("<td>").text(trainArrival),
        // $("<td>").text(trainNext)
      );
    
      // Append the new row to the table
      $("#train-table > tbody").append(newRow);

});