function openFileChooser() {
    document.getElementById("storyFile").click();
}

function showDialogBox() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("story-dialog").style.display = "block";
}

function closeDialogBox() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("story-dialog").style.display = "none";
}

function uploadStory() {
    // Get the file and text
    const fileInput = document.getElementById("storyFile");
    const storyText = document.getElementById("storyText").value;

    if (!fileInput.files.length || !storyText) {
        alert("Please choose a file and write something.");
        return;
    }

    // Show upload form
    document.getElementById("story-upload-form").style.display = "block";

    // Submit the form
    document.getElementById("story-upload-form").submit();

    console.log("Uploading project:", projectText);
}

function openProjectFileChooser() {
    document.getElementById("projectFile").click();
}

function showProjectUploadDialog() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("project-dailog").style.display = "block";
}

function closeProjectUploadDialog() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("project-dailog").style.display = "none";
}

function uploadproject() {
    const fileInput = document.getElementById("projectFile");
    const projectText = document.getElementById("projectText").value;

    if (!fileInput.files.length || !projectText) {
        alert("Please choose a file and write something.");
        return;
    }

    // Show upload form
    document.getElementById("project-upload-form").style.display = "block";

    // Submit the form to upload_project.php
    document.getElementById("project-upload-form").submit();
}


// Function to update character count
function updateCharCount(textareaId, charCountId) {
    const textarea = document.getElementById(textareaId);
    const charCountDisplay = document.getElementById(charCountId);
    const currentLength = textarea.value.length;
    const maxLength = textarea.getAttribute("maxlength");

    // Ensure maxLength is a valid number
    if (maxLength) {
        charCountDisplay.textContent = `${currentLength} / ${maxLength} characters`;

        // Change color based on character limit status
        charCountDisplay.style.color = currentLength >= maxLength ? 'red' : 'black';
    } else {
        charCountDisplay.textContent = `${currentLength} / 0 characters`; // Default case
    }
}

// Event listeners for character count update
document.addEventListener("DOMContentLoaded", function () {
    const storyTextarea = document.getElementById("storyText");
    const projectTextarea = document.getElementById("projectText");

    // Update character count for both textareas
    storyTextarea.addEventListener("input", function() {
        updateCharCount("storyText", "charCount");
        updateCharCount("projectText", "projectCharCount");
    });

    projectTextarea.addEventListener("input", function() {
        updateCharCount("projectText", "projectCharCount");
        updateCharCount("storyText", "charCount");
    });

    // Initialize character count display on page load
    updateCharCount("storyText", "charCount");
    updateCharCount("projectText", "projectCharCount");
});

// Toggle Like
function toggleLike(event, element) {
    event.stopPropagation(); // Prevent link navigation
    if (element.classList.contains('liked')) {
        element.classList.remove('liked');
        let likes = parseInt(element.innerText.split(' ')[0].replace('K', '')) - 1;
        element.innerText = likes + ' Likes';
    } else {
        element.classList.add('liked');
        let likes = parseInt(element.innerText.split(' ')[0].replace('K', '')) + 1;
        element.innerText = likes + ' Likes';
    }
}

// Show/Hide Comment Box
function toggleCommentBox(event, element) {
    event.stopPropagation(); // Prevent link navigation
    const commentBox = element.closest('.details').querySelector('.comment-box');
    commentBox.style.display = commentBox.style.display === 'block' ? 'none' : 'block';
}

// Submit Comment and Close Comment Box
function submitComment(event, element) {
    event.stopPropagation(); // Prevent link navigation
    if (event.key === 'Enter' || event.type === 'click') {
        const commentBox = element.closest('.comment-box');
        const commentInput = commentBox.querySelector('input');
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            alert(`Comment submitted: ${commentText}`);
            commentInput.value = ''; // Clear the input after submitting
            commentBox.style.display = 'none'; // Close the comment box
        }
    }
}
