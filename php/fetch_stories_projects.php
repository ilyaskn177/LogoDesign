<?php

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With"); // Allow specific headers

$host = 'localhost';
$db = 'logodesign_db';
$user = 'root';
$pass = '';

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT `id`, `artist`, `description`, `image`, `created_at`, `likes`, `comments` FROM `projects` WHERE 1";
$result = $conn->query($sql);

// Check for query errors
if (!$result) {
    echo json_encode(['error' => $conn->error]);
    exit;
}

$projects = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $projects[] = $row;
    }
}

// Close the connection
$conn->close();

// Return the projects data as JSON
header('Content-Type: application/json');
echo json_encode(['projects' => $projects]);
?>
