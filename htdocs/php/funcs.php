<?php
function establish() {
    $servername = "localhost";
    $username = "JensTG";
    $password = "28Jens11";
    $database = "kf";

    // Establish connection:
    $conn = new mysqli($servername, $username, $password, $database);

    // Check:
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

function saySomething() {
    echo "Something else!";
}
?>