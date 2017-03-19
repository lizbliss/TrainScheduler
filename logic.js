var config = {
    apiKey: "AIzaSyB70Io1kxQlLdCn_qfsJ230sVBK-Z1Xx4c",
    authDomain: "trainschedule-3453c.firebaseapp.com",
    databaseURL: "https://trainschedule-3453c.firebaseio.com",
    storageBucket: "trainschedule-3453c.appspot.com",
    messagingSenderId: "109699411385"
};
firebase.initializeApp(config);

var train = "";
var destination = "";
var time = 0;
var frequency = "";

$("#addTrain").on("click", function() {
    train = $("#trainInput").val().trim();
    destination = $("#destinationInput").val().trim();
    time = $("#timeInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    firebase.database().ref().push({
        train: train,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    })
})

firebase.database().ref().on("child_added", function(snapshot) {
    $(".well").append(snapshot.val().train);
    $(".well").append(snapshot.val().destination);
    $(".well").append(snapshot.val().time);
    $(".well").append(snapshot.val().frequency);
    $(".well").append("<hr>");
})

firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    $("#trainDisplay").html(snapshot.val().train);
    $("#destinationDisplay").html(snapshot.val().destination);
    $("#timeDisplay").html(snapshot.val().time);
    $("#frequencyDisplay").html(snapshot.val().frequency);

})
