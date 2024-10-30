<?php
// Allow CORS from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection parameters
$host = 'localhost'; 
$dbname = 'logodesign_db'; 
$username = 'root'; 
$password = ''; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // Exit on preflight request
}

// Get the input data
$data = json_decode(file_get_contents("php://input"), true);
$projectId = $data['projectId'];

// Update the likes count in the database
$stmt = $pdo->prepare("UPDATE projects SET likes = likes + 1 WHERE id = :projectId");
$stmt->execute([':projectId' => $projectId]);

// Fetch the updated likes count
$stmt = $pdo->prepare("SELECT likes FROM projects WHERE id = :projectId");
$stmt->execute([':projectId' => $projectId]);
$likes = $stmt->fetchColumn();

// Return the updated likes count as JSON
echo json_encode(['success' => true, 'likes' => $likes]);
?>
