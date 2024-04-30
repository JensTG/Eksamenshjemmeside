<?php
require "./include.php";

// Establish variables:
$conn = establish();
$username = $_GET['username'];

// Get available threads:
$sql = 'SELECT * FROM threads WHERE threadId IN (SELECT DISTINCT threadId FROM members WHERE username="PUBLIC" OR username="'.$username.'")';
$result = $conn->query($sql);

if ($result->data_seek(0)) {
    $conn->close();
    return;
}
while ($chat = $result->fetch_assoc()) {
    echo $chat['name'].'ROW'.$chat['threadId'].'COLUMN';
}