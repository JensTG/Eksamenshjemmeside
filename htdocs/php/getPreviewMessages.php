<?php
require "./include.php";
$conn = establish();

// Get message details from getMessage() via GET
$chatId = $_GET['chatId'];

// Get thread table:
$sql = 'SELECT senderId, content FROM messages WHERE threadId='.$chatId.' ORDER BY messageId ASC';
$result = $conn->query($sql);
for ($i = 0; $i < 3 && $result->data_seek($i); $i++) {
    $msg = $result->fetch_assoc();
    $sql = 'SELECT DISTINCT name FROM users WHERE userId='.$msg['senderId'];
    $user = $conn->query($sql);
    $user->data_seek(0);
    $username = $user->fetch_assoc();
    echo '<div class="previewMessage"><div title="'.$username['name'].'" class="sender">'.substr($username['name'], 0, 4).':</div><div class="content">'.substr($msg['content'], 0, 20).'</div></div>';
}

$conn->close();