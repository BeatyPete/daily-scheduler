var tasks = [];

//get current time
var getTime = function() {
    var now = moment();
    displayDate(now);
    compareTime(now);
};

//current day display
var displayDate = function(currentTime) {
    var date = currentTime.format("dddd, MMMM Do")
    $("#currentDay").html(date)
};

//determine color of timeblocks
var compareTime = function(currentTime) {
    var timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    for(var i = 0; i < timeSlots.length; i++) {
        var time = moment().hour(timeSlots[i]).minutes(0);
        var slotEl = "#" + timeSlots[i];
        if (currentTime.isBefore(time)) {
            $(slotEl).addClass("future")
        }
        else if (currentTime.isSame(time, "hour")) {
            $(slotEl).addClass("present")
        }
        else if (currentTime.isAfter(time,)) {
            $(slotEl).addClass("past")
        }
    };
}

getTime();