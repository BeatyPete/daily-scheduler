//get current time
var getTime = function() {
    var now = moment();
    displayDate(now);
};

//current day display
var displayDate = function(currentTime) {
    var date = currentTime.format("dddd, MMMM Do")
    $("#currentDay").html(date)
    console.log(date);
};

getTime();