<?php
// Define the target directory for stories
$targetDir = "/uploads";

// Ensure the story uploads directory exists
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true); // Create the story uploads directory if it doesn't exist
}

$targetFile = $targetDir . basename($_FILES["storyToUpload"]["name"]);
$uploadOk = 1; // Flag for success

// Check file size (optional)
if ($_FILES["storyToUpload"]["size"] > 5000000) { // 5MB limit
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

// Allow certain file formats
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your story was not uploaded.";
} else {
    // Try to upload file
    if (move_uploaded_file($_FILES["storyToUpload"]["tmp_name"], $targetFile)) {
        echo "The story " . htmlspecialchars(basename($_FILES["storyToUpload"]["name"])) . " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your story.";
    }
}
?>
