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
$comment = htmlspecialchars($data['comment']);

$stmt = $pdo->prepare("INSERT INTO comments (project_id, comment_text) VALUES (:projectId, :comment)");
$stmt->execute([':projectId' => $projectId, ':comment' => $comment]);

// Get the updated comment count
$stmt = $pdo->prepare("SELECT COUNT(*) FROM comments WHERE project_id = :projectId");
$stmt->execute([':projectId' => $projectId]);
$commentsCount = $stmt->fetchColumn();

echo json_encode(['success' => true, 'comments' => $commentsCount]);
?>
