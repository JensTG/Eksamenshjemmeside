<?php 
require "./include.php";

$conn = establish();

// Get POST info:
$username = $_POST['username'];
$chatId = $_POST['chatId'];
$msg = $_POST['msg'];

// Prepare statement:
$sql = 'SELECT DISTINCT userId FROM users WHERE name="'.$username.'"';
$result = $conn->query($sql);
$userId = 0;
if ($result->data_seek(0)) {
    $userId = $result->fetch_assoc()['userId'];
}

// Insert into MySQL:
$sql = 'INSERT INTO messages (time, content, senderId, threadId) VALUES (NOW(), "'.$msg.'", '.$userId.', '.$chatId.')';
$result = $conn->query($sql);

$conn->close();