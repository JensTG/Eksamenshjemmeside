<?php
require "./include.php";

// Establish variables:
$conn = establish();
$username = $_GET['username'];

// Get available threads:
$sql = 'SELECT 
threads.threadId, threads.name, COUNT(messages.messageId)
FROM
threads
    LEFT JOIN
messages ON threads.threadId = messages.threadId
WHERE
threads.threadId IN (SELECT 
        members.threadId
    FROM
        members
    WHERE
        members.username = "PUBLIC"
            OR members.username = "'.$username.'")
GROUP BY threads.threadId
ORDER BY COUNT(messages.messageId) DESC';

$result = $conn->query($sql);

if (!$result->data_seek(0)) {
    $conn->close();
    return;
}
while ($chat = $result->fetch_assoc()) {
    echo $chat['name'].'COLUMN'.$chat['threadId'].'ROW';
}