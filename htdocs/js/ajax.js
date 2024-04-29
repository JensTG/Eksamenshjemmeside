function getUser() {
    var username = localStorage.getItem("username");
    if(!username) {
        window.location.replace("/logind.html");
    }
}
function logOn() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.responseText;
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
            }
        }
    }
    xmlhttp.open("GET", "/php/checkUser.php?username=" + username + "&password=" + password);
    xmlhttp.send();
}
function getMessage(nMsg) {
    var chatId = localStorage.getItem("chatId");
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText) {
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
function checkPermission() {

}