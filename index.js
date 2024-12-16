var input = document.getElementById("toWrite");
var addBtn = document.getElementById("addButton");
var taskList = document.getElementById("taskList");
input.focus();

var taskStorage = [];
function changeStatus(currentTask) {
    taskStorage = taskStorage.map(function (item) {
        if (item.id === currentTask.id) {
            item.isDone = !item.isDone;
        }
        return item;
    });
    printTask();
}

function printTask() {
    taskList.innerHTML = "";
    taskStorage.forEach(function (currentTask, index) {
        var taskItem = document.createElement("LI")
        var info = document.createElement("DIV")
        info.classList.add("info")
        var shape = document.createElement("DIV")
        var text = document.createElement("P")
        text.innerHTML = currentTask.text
        var closeBtn = document.createElement("BUTTON")
        closeBtn.classList.add("closeBtn")
        var closeIcon = document.createElement("I")
        closeIcon.classList.add("fg-x-close")
        taskItem.appendChild(info)
        taskItem.appendChild(closeBtn)
        info.appendChild(shape)
        info.appendChild(text)
        closeBtn.appendChild(closeIcon)
        taskList.appendChild(taskItem)
        taskList.classList.add("taskList");

        if (currentTask.isDone === true) {
            info.classList.add("done")
        }
        info.addEventListener("click", function () {
            changeStatus(currentTask);
        });

        closeBtn.addEventListener("click", function () {
            taskStorage.splice(index, 1);
            printTask();
        });
    });
};

function appendTask() {
    var taskValue = input.value.trim()
    if (taskValue.length === 0) {
        alert("Oops! Don’t forget to add a task first!");
        input.value = ""
        return;
    }
    if (taskValue.length < 3) {
        alert("A bit too short! Try a task with at least 3 characters.");
        input.value = "";
        return;
    }

    var data = {
        id: new Date().getTime(),
        text: taskValue,
        isDone: false,
    };

    taskStorage.push(data);
    printTask();
    input.value = "";
};

addBtn.addEventListener("click", appendTask);

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        appendTask();
    }
})