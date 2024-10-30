<?php
// CORS headers
header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allowed methods
header("Access-Control-Allow-Headers: Content-Type"); // Allowed headers

// Database configuration
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

// Upload directory
$uploadFileDir = '../uploads/';

if (!is_dir($uploadFileDir)) {
    mkdir($uploadFileDir, 0777, true);
}

// Initialize response
$response = [
    'success' => false,
    'message' => '',
];

// Check if the request is a POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['projectFile']) && $_FILES['projectFile']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['projectFile']['tmp_name'];
        $fileName = $_FILES['projectFile']['name'];
        $fileSize = $_FILES['projectFile']['size'];
        $fileType = $_FILES['projectFile']['type'];

        // Allowed file types
        $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/zip'];
        if (in_array($fileType, $allowedTypes)) {
            // Sanitize and create a unique filename
            $fileName = uniqid() . '_' . preg_replace('/[^A-Za-z0-9_\-\.]/', '_', $fileName);
            $dest_path = $uploadFileDir . $fileName;

            // Move file and check for errors
            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $projectDescription = !empty($_POST['projectText']) ? htmlspecialchars(strip_tags(trim($_POST['projectText']))) : 'No description provided.';
                $fileNameInput = !empty($_POST['fileNameInput']) ? htmlspecialchars(strip_tags(trim($_POST['fileNameInput']))) : 'Untitled Project';

                // Insert project data into the database
                $stmt = $pdo->prepare("INSERT INTO projects (artist, description, image, name) VALUES (:artist, :description, :image, :name)");
                $stmt->execute([
                    ':artist' => $fileNameInput,
                    ':description' => $projectDescription,
                    ':image' => $dest_path,
                    ':name' => $fileNameInput
                ]);

                // Respond with success
                $response['success'] = true;
                $response['message'] = 'File successfully uploaded and project details saved.';
            } else {
                $response['message'] = 'There was an error moving the uploaded file.';
            }
        } else {
            $response['message'] = 'Invalid file type. Allowed types: JPEG, PNG, PDF, ZIP.';
        }
    } else {
        // Handle specific upload errors
        switch ($_FILES['projectFile']['error']) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $response['message'] = 'File is too large.';
                break;
            default:
                $response['message'] = 'Unknown upload error.';
                break;
        }
    }
} else {
    $response['message'] = 'Invalid request method. Please use POST.';
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
