var tasks = ["", "", "", "", "", "", "", "", ""];

//get current time
var getTime = function() {
    var now = moment();
    displayDate(now);
    compareTime(now);
    setTimeout(getTime, 900000);
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
};

//click to edit task slot
$(".task-slot").on("click", "p", function() {
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .addClass("task input")
        .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

//finish editing
$(".saveBtn").on("click", function() {
    var taskEl = $(this).siblings(".task-slot").children();
    var containerEl = $(this).siblings(".task-slot")
    if (taskEl.hasClass("input")) {
        var text = $(taskEl)
            .val()
            .trim();
        var taskP = $("<p>")
            .addClass("task")
            .text(text);
        $(taskEl).replaceWith(taskP);
        saveTasks(text, containerEl);
    }
    else {
        return;
    }
});

var saveTasks = function(taskText, timeSlot) {
    var id = timeSlot.attr("id");
    var arrayLocale = id - 9;
    tasks[arrayLocale] = taskText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = ["", "", "", "", "", "", "", "", ""]
    }
    else {
        for (var i = 0; i < tasks.length; i++) {
            var id = i + 9;
            var containerEl = $("#" + id);
            var text = tasks[i];
            $(containerEl).children().text(text);
        };
    }
};

getTime();
loadTasks();
