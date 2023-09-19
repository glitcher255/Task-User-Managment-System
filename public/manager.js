//ENTER BUTTON on ENTER KEY PRESS
for (let x = 0; x < document.getElementsByClassName("add-task-form-inputs").length; x++) {
    var input = document.getElementsByClassName("add-task-form-inputs")[x];
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault()
            document.getElementsByClassName("add-task-form-submit")[0].click()
        }
    })
}


//ADD TASK BUTTON
document.getElementsByClassName("add-task-btn")[0].addEventListener("click", function () {
    document.getElementsByClassName("add-task-form")[0].style.display = "flex"

    //de-populate fields
    document.getElementById("add-task-form-title").value = ""

    //focus input field
    document.getElementsByClassName("add-task-form-title")[0].focus()
})


//ENTER BUTTON CLICK
document.getElementsByClassName("add-task-form-submit")[0].addEventListener("click", function () {
    document.getElementsByClassName("add-task-form")[0].style.display = "none"
    let title = document.getElementsByClassName("add-task-form-title")[0].value
    let date = document.getElementsByClassName("add-task-form-date")[0].value
    add_task(title, date)  //calls add_task() function
})

//FUNCTION FROM ENTER BUTTON CLICK
function add_task(title, date) {
    let new_task = document.createElement("div")
    new_task.className = "task"

    let task_title = document.createElement("input")
    task_title.className = "task-title"

    let task_date = document.createElement("input")
    task_date.className = "task-date"

    let task_delete_btn = document.createElement("button")
    task_delete_btn.className = "task-delete-btn"
    task_delete_btn.innerHTML = "Delete"

    let task_container = document.getElementsByClassName("task-container")[0]
    task_container.appendChild(new_task)
    new_task.appendChild(task_title)
    new_task.appendChild(task_date)
    new_task.appendChild(task_delete_btn)

    //populate task with data
    task_title.value = title
    task_date.value = date
}


//COLORS TASKS ON HOVER
let all_inputs = document.querySelectorAll(".task-colorable")
all_inputs.forEach(element => {
    element.addEventListener("mouseover", function () {
        this.parentNode.children[0].style.backgroundColor = "cyan"
        this.parentNode.children[2].style.backgroundColor = "cyan"
    })
})
all_inputs.forEach(element => {
    element.addEventListener("mouseleave", function () {
        this.parentNode.children[0].style.backgroundColor = ""
        this.parentNode.children[2].style.backgroundColor = ""
    })
})


//DELETE BUTTON
let delete_buttons = document.getElementsByClassName("task-delete-btn")
for (let x = 0; x < delete_buttons.length; x++) {
    delete_buttons[x].addEventListener('click', function () {
        document.getElementsByClassName("delete_button_input")[x].value = x
    })
}


//LOG BUTTON
document.getElementsByClassName("log-btn")[0].addEventListener("click", function () {
    document.getElementsByClassName("log-textarea-cont")[0].style.display = "block"
    localStorage.close_open = "open"
})

//LOG CLOSE BUTTON
document.getElementsByClassName("log-textarea-close")[0].addEventListener("click", function () {
    document.getElementsByClassName("log-textarea-cont")[0].style.display = "none"
    localStorage.close_open = "closed"
})


//LOG CLEAR BUTTON
document.getElementsByClassName("log-textarea-clear")[0].addEventListener("click", function () {
    localStorage.removeItem("array_log_key")
    document.getElementsByClassName("log-textarea")[0].value = ""
})


//LOGGER USING LOCAL STORAGE
if (localStorage.array_log_key) {
    let array_log = localStorage.array_log_key.split(",")
    document.getElementsByClassName("log-textarea")[0].value = array_log.join('\n')
    array_log.push(document.getElementsByClassName("update-message-input")[0].value)
    array_log.toString()
    localStorage.array_log_key = array_log
}
else {
    let array_log = [document.getElementsByClassName("update-message-input")[0].value]
    array_log.toString()
    localStorage.array_log_key = array_log
}


//KEEP LOGGER WINDOW OPEN
if (localStorage.close_open === "open") {
    document.getElementsByClassName("log-textarea-cont")[0].style.display = "block"
    let element = document.getElementsByClassName("log-textarea")[0]
    element.scrollTop = element.scrollHeight
}


//SEARCH FUNCTION
document.getElementsByClassName("search-input")[0].addEventListener("keyup", function () {
    let search = this.value.toLowerCase()
    for (let x = 0; x < document.getElementsByClassName("task-title").length; x++) {
        if (document.getElementsByClassName("task-title")[x].value.toLowerCase().indexOf(search) > -1) {
            document.getElementsByClassName("task-title")[x].parentElement.parentElement.style.display = ""
        }
        else {
            document.getElementsByClassName("task-title")[x].parentElement.parentElement.style.display = "none"
        }
    }
})


//DATE SORT BUTTON
document.getElementsByClassName("date-sort-btn")[0].addEventListener("click", function () {
    let mybutton = document.getElementsByClassName("date-sort-btn")[0]
    let parent = document.getElementsByClassName("task-container")[0]
    for (var x = 1; x < parent.childNodes.length; x++) {
        parent.insertBefore(parent.childNodes[x], parent.firstChild);
    }
    if (mybutton.innerHTML === "Date Ascending") {
        mybutton.innerHTML = "Date Descending"
    }
    else {
        mybutton.innerHTML = "Date Ascending"
    }
})


//BACK UP USING LOCAL STORAGE
let backup = document.getElementsByClassName("task-container")[0].innerHTML
localStorage.backup_key = backup


//RESTORE BUTTON PRESS
document.getElementsByClassName("restore-btn")[0].addEventListener("click", function () {
    document.getElementsByClassName("task-container")[0].innerHTML = localStorage.backup_key
})