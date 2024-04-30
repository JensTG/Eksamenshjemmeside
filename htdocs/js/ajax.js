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
function newUser() {
    // Get values and compare:
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var repeatPassword = document.getElementById("repeatPassword").value;

    // Adgangskoderne skal matche:
    if (password != repeatPassword) {
        document.getElementById("error").innerText = "Adgangskoderne matcher ikke!";
        return;
    }
    // Brugernavnet må ikke være:
    if (username == "PUBLIC") {
        document.getElementById("error").innerText = "Ulovligt brugernavn!";
        return;
    }
    // Tjek at brugernavn/adgangskode ikke er for korte: 
    if (username.length < 2 || password.length < 2) {
        document.getElementById("error").innerText = "For kort!";
        return;
    }
    // Tjek at brugernavn/adgangskode ikke er for lange: 
    if (username.length > 40 || password.length > 40) {
        document.getElementById("error").innerText = "For langt!";
        return;
    }

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("repeatPassword").value = "";
    document.getElementById("error").innerText = "";
    
    // Opret ny bruger eller meld fejl:
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            switch (xmlhttp.responseText) {
                case "username":
                    document.getElementById("error").innerText = "Brugernavnet er optaget!";
                    return;
                case "correct":
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    window.location.replace("/index.html");
                    return;
            }
        }
    }
    xmlhttp.open("GET", "/php/newUser.php?username=" + username + "&password=" + password);
    xmlhttp.send();
}
async function checkPassword(username = localStorage.getItem("username"), password = localStorage.getItem("password")) {
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
async function checkChatPermission(send) {
    // Get needed stuff
    var username = localStorage.getItem("username");
    var password = localStorage.getItem("password");
    var chatId = localStorage.getItem("chatId");
    
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = async function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "correct" && await checkPassword() != "error") {
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
function getThreads() {

}