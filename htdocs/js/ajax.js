function directToLogOn() {
    if(!localStorage.getItem("username")) {
        window.location.replace("/logind.html");
    }
}
async function logOn() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var response = await checkPassword(username, password);
    switch(response) {
        case "username":
            document.getElementById("error").innerText = "Bruger findes ikke!";
            break;
        case "password":
            document.getElementById("error").innerText = "Forkert kode!";
            break;
        case "correct":
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            window.location.replace("/index.html");
            break;
        default:
            document.getElementById("error").innerText = response;
            break;
    }
}
function getMessage(nMsg) {
    var chatId = localStorage.getItem("chatId");
    if(!chatId) // Get out if no chatId is set (user got here in a weird way)
        window.location.replace("/index.html");

    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText != "error") {
                document.getElementById("chat").innerHTML += xmlhttp.responseText;
                getMessage(nMsg + 1);
            } else {
                setTimeout(function () {getMessage(nMsg)}, 1000);
            }
        }
    }
    xmlhttp.open("GET", "/php/getMessage.php?chatId=" + chatId + "&nMsg=" + nMsg);
    xmlhttp.send();
}
async function checkChatPermission(send) {
    // Get needed stuff
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var chatId = localStorage.getItem("chatId");

    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = async function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText != "error" && await checkPassword() != "error") {
                if(send)
                    sendMessage();
                else
                    getMessage(0);
            } else {
                window.location.replace('/index.html')
            }
        }
    }
    xmlhttp.open("GET", "/php/checkPermission.php?chatId=" + chatId + "&username=" + username + "&password=" + password, false);
    xmlhttp.send();
}
function sendMessage() {
    var username = localStorage.getItem("username");
    var chatId = localStorage.getItem("chatId");
    var msg = document.getElementById("textbox").value;

    if(msg == "") return; // Don't let users spam empty messages
    
    document.getElementById("textbox").value = "";
    document.getElementById("textbox").focus();

    var xmlhttp = new XMLHttpRequest;
    xmlhttp.open("POST", "/php/sendMessage.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username + "&chatId=" + chatId + "&msg=" + msg);
}
async function checkPassword(username = localStorage.getItem("username"), password = localStorage.getItem("password"), callback) {
    var passwordPromise = new Promise(function(resolve) {
        var xmlhttp = new XMLHttpRequest;
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                resolve(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET", "/php/checkUser.php?username=" + username + "&password=" + password);
        xmlhttp.send();
    });
    return await passwordPromise;
}