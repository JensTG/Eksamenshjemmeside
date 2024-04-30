<?php
require "./include.php";
$conn = establish();

// Get account details from logOn() via GET
$username = $_GET['username'];
$password = $_GET['password'];

$sql = 'SELECT password FROM users WHERE name="'.$username.'"';
$result = $conn->query($sql);
if ($result->data_seek(0)) { // Check if account exists
    if($result->fetch_assoc()['password'] == $password) { // Check if password is correct
        echo "correct";
        $conn->close();
        return;
    } else {
        echo "password"; // Wrong password
        $conn->close();
        return;
    }
} else {
    echo "username"; // No such user
    $conn->close();
    return;
}