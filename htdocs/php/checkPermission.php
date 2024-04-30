<?php
require "./include.php";
$conn = establish();

// Get account details from logOn() via GET
$username = $_GET['username'];
$password = $_GET['password'];
$chatId = $_GET['chatId'];

$sql = 'SELECT username FROM members WHERE threadId='.$chatId;
$result = $conn->query($sql);
if ($result->data_seek(0)) { // Check if account exists
    while($user = $result->fetch_assoc()) {
        if($user['username'] == $username) { // Check if user is member
            echo "correct";
            $conn->close();
            return;
        }
    }
} else {
    echo "error"; // No members/thread
}
echo "error"; // Not a member

$conn->close();