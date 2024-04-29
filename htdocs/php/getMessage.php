<?php
require "./include.php";
$conn = establish();

// Get message details from getMessage() via GET
$chatId = $_GET['chatId'];
$nMsg = $_GET['nMsg'];