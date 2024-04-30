<?php
require "./include.php";

// Set up variables:
$username = $_GET['username'];
$password = $_GET['password'];

$conn = establish();

// Get user table:
$sql = 'SELECT * FROM users WHERE name="'.$username.'"';
$result = $conn->query($sql);
if ($result->data_seek(0)) {
    echo "username";
    $conn->close();
    return; // Return if name is picked
}

// Insert new user:
$sql = 'INSERT INTO users (name, password) VALUES ("'.$username.'", "'.$password.'")';
if ($conn->query($sql) == true) {
    echo "correct";
}
$conn->close();