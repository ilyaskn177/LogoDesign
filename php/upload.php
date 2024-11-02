<?php
// Set the target directory
$targetDir = "images/";
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true); // Create the directory if it doesn't exist
}

// Get the file information
$targetFile = $targetDir . basename($_FILES["projectFile"]["name"]);
$uploadOk = 1;
$fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// Check if file is a valid image type
if (in_array($fileType, ["jpg", "jpeg", "png", "gif"])) {
    if (move_uploaded_file($_FILES["projectFile"]["tmp_name"], $targetFile)) {
        echo "The file ". htmlspecialchars(basename($_FILES["projectFile"]["name"])) . " has been uploaded.";
        // You can store additional information like $projectText here if needed
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
} else {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
}
?>
