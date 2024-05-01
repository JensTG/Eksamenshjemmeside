<?php
require "./include.php";

// Establish variables:
$conn = establish();
$username = $_GET['username'];

// Get available threads:
$sql = 'SELECT messages.threadId, threads.name, COUNT(messages.messageId) FROM messages INNER JOIN threads ON messages.threadId=threads.threadId WHERE messages.threadId IN (SELECT members.threadId FROM members WHERE username="PUBLIC" OR username="'.$username.'") GROUP BY threadId ORDER BY COUNT(messageId) DESC;';

$result = $conn->query($sql);

if (!$result->data_seek(0)) {
    $conn->close();
    return;
}
while ($chat = $result->fetch_assoc()) {
    echo $chat['name'].'COLUMN'.$chat['threadId'].'ROW';
}