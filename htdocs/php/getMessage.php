<?php
require "./include.php";
$conn = establish();

// Get message details from getMessage() via GET
$chatId = $_GET['chatId'];
$nMsg = $_GET['nMsg'];

// Get thread table:
$sql = 'SELECT time, senderId, content FROM messages WHERE threadId='.$chatId;
$result = $conn->query($sql);
if ($result->data_seek($nMsg)) {
    $msg = $result->fetch_assoc();
    $sql = 'SELECT DISTINCT name FROM users WHERE userId='.$msg['senderId'];
    $user = $conn->query($sql);
    $user->data_seek(0);
    $username = $user->fetch_assoc();
    echo '<div class="message"><div title="'.$msg['time'].'" class="timestamp">'.substr($msg['time'], 11, 8).'</div><div title="'.$username['name'].'" class="sender">'.substr($username['name'], 0, 8).':</div><div class="content">'.$msg['content'].'</div></div>';
} else echo 'error';

$conn->close();