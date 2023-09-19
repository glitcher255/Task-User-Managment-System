const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))


let newRandom = 3
const users = [{
    userDate: "Mon Sep 18 2023 / 23:01:45 GMT+0200 (Eastern European Standard Time)",
    userTitle: 'person1',
    userUniqueId: 1
},
{
    userDate: "Mon Sep 18 2023 / 23:02:10 GMT+0200 (Eastern European Standard Time)",
    userTitle: 'my name',
    userUniqueId: 2
},
{
    userDate: "Mon Sep 18 2023 / 23:02:13 GMT+0200 (Eastern European Standard Time)",
    userTitle: 'testsubject',
    userUniqueId: 3
}
]


//INITIALIZATION
app.get("/", function (req, res) {
    res.render("home", {
        data: users,
        update_message: ""
    })
})


//NEW TASK RQEUEST
app.post("/", (req, res, next) => {
    const dateObj = new Date();
    const inputuserDate = `${dateObj.toDateString()}` + " / " + `${dateObj.toTimeString()}`
    const inputuserTitle = req.body.userTitle
    const inputuserUniqueId = newRandom += 1
    users.push({
        userDate: inputuserDate,
        userTitle: inputuserTitle,
        userUniqueId: inputuserUniqueId
    })
    try {
        res.render("home", {
            data: users,
            update_message: "System (" + time() + ") : " + "New task \"" + inputuserTitle + "\" added at: " + inputuserDate
        })
    } catch (error) {
        next(error)
    }
})


//DELETE REQUEST
app.post("/delete", (recieve, send, next) => {
    let deleted_obj
    var uniqueId = recieve.body.userUniqueId
    for (let x = 0; x < users.length; x++) {
        if (users[x].userUniqueId == uniqueId) {
            deleted_obj = users[x].userTitle
            users.splice(x, 1)
            break
        }
    }
    if (deleted_obj != undefined) {
        try {
            send.render("home", {
                data: users,
                update_message: "System (" + time() + ") : " + "Deleted \"" + deleted_obj + "\""
            })
        } catch (error) {
            next(error)
        }
    }
    else {
        throw new Error(`USER ERROR: Please do not refresh the page. (Delete attempt)`)
        next(error)
    }
})


//EDIT REQUEST
app.post("/edit", (recieve, send, next) => {
    var uniqueId = recieve.body.userUniqueId
    var new_title = recieve.body.task_title
    var old_title
    for (let x = 0; x < users.length; x++) {
        if (users[x].userUniqueId == uniqueId) {
            old_title = users[x].userTitle
            users[x].userTitle = new_title
            break
        }
    }
    try {
        send.render("home", {
            data: users,
            update_message: "System (" + time() + ") : " + "Changed \"" + old_title + "\" to \"" + new_title + "\""
        })
    } catch (error) {
        next(error)
    }
})


//ERROR HANDLER
const errorHandler = (error, recieve, send, next) => {
    send.render("home", {
        data: users,
        update_message: "System (" + time() + ") : " + error
    })
}
app.use(errorHandler)


//TIME HANDLER
function time() {
    const dateObj = new Date();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    return hours + ":" + minutes + ":" + seconds
}


//CREATE JSON FILE - UNUSED - use - save_local_json()
var dictusers = JSON.stringify(users)
var fs = require('fs');
const path = require('path');
const { nextTick } = require('process');
save_local_json()
function save_local_json() {
    const filePath = path.join(__dirname, '/saved_JSON/myFile.json');
    fs.writeFile(filePath, dictusers, (err) => {
        if (err) throw err;
        console.log('.JSON file created at /saved_JSON.');
    });
}


app.use(express.static('public'));
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));