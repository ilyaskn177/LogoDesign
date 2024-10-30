<?php
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

$data = json_decode(file_get_contents("php://input"), true);
$projectId = $data['projectId'];

$stmt = $pdo->prepare("UPDATE projects SET likes = likes + 1 WHERE id = :projectId");
$stmt->execute([':projectId' => $projectId]);

$stmt = $pdo->prepare("SELECT likes FROM projects WHERE id = :projectId");
$stmt->execute([':projectId' => $projectId]);
$likes = $stmt->fetchColumn();

echo json_encode(['success' => true, 'likes' => $likes]);
?>
