// Function to open the file chooser for stories
function openFileChooser() {
    document.getElementById("storyFile").click();
}

// Function to show the story dialog box
function showDialogBox() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("story-dialog").style.display = "block";
}

// Function to close the dialog box
function closeDialogBox() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("story-dialog").style.display = "none";
}

// Function to upload the story
function uploadStory() {
    const fileInput = document.getElementById("storyFile");
    const storyText = document.getElementById("storyText").value;

    if (!fileInput.files.length || !storyText) {
        alert("Please choose a file and write something.");
        return;
    }

    // Here you can process the file and text as needed
    console.log("Uploading story:", storyText);
    // Optionally display or process the uploaded story
}

// Function to open the file chooser for projects
function openProjectFileChooser() {
    document.getElementById("projectFile").click();
}

// Function to show the project upload dialog
function showProjectUploadDialog() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("project-dailog").style.display = "block";
}

// Function to close the project upload dialog
function closeProjectUploadDialog() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("project-dailog").style.display = "none";
}

function uploadProject() {
    const projectFileInput = document.getElementById('projectFile');
    const projectText = document.getElementById('projectText').value;

    if (projectFileInput.files.length === 0 || projectText.trim() === '') {
        alert("Please select a project file and write a description.");
        return;
    }

    const formData = new FormData();
    formData.append('projectFile', projectFileInput.files[0]);
    formData.append('projectText', projectText);

    fetch('php/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Project uploaded successfully!");
            // Optionally reset the form and close the dialog
            closeProjectUploadDialog();
            document.getElementById('project-upload-form').reset();
        } else {
            alert("Upload failed: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while uploading the project.");
    });
}

// Function to update character count
function updateCharCount(textareaId, charCountId) {
    const textarea = document.getElementById(textareaId);
    const charCountDisplay = document.getElementById(charCountId);
    const currentLength = textarea.value.length;
    const maxLength = textarea.getAttribute("maxlength");

    charCountDisplay.textContent = maxLength 
        ? `${currentLength} / ${maxLength} characters` 
        : `${currentLength} / 0 characters`; // Default case

    // Change color based on character limit status
    charCountDisplay.style.color = currentLength >= maxLength ? 'red' : 'black';
}

// Event listeners for character count update
document.addEventListener("DOMContentLoaded", function () {
    const storyTextarea = document.getElementById("storyText");
    const projectTextarea = document.getElementById("projectText");

    // Update character count for both textareas
    storyTextarea.addEventListener("input", function() {
        updateCharCount("storyText", "charCount");
    });

    projectTextarea.addEventListener("input", function() {
        updateCharCount("projectText", "projectCharCount");
    });

    // Initialize character count display on page load
    updateCharCount("storyText", "charCount");
    updateCharCount("projectText", "projectCharCount");
});

// Toggle Like
function toggleLike(event, element) {
    event.stopPropagation(); // Prevent link navigation
    const likesText = element.innerText.split(' ')[0];
    const likesCount = parseInt(likesText.replace('K', '')) || 0;
    const icon = element.querySelector('i'); // Select the like icon

    if (element.classList.contains('liked')) {
        element.classList.remove('liked');
        icon.classList.remove('fas'); // Remove filled heart
        icon.classList.add('far'); // Add outline heart
        element.innerHTML = `<i class="far fa-heart"></i> ${likesCount - 1}`;
    } else {
        element.classList.add('liked');
        icon.classList.remove('far'); // Remove outline heart
        icon.classList.add('fas'); // Add filled heart
        element.innerHTML = `<i class="fas fa-heart"></i> ${likesCount + 1}`;
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

let lastScrollTop = 0; // Variable to store the last scroll position
        const header = document.getElementById('header'); // Get the header element
        const stories = document.getElementById('stories'); // Get the stories section
        const projectTitle = document.getElementById("projects-title");

        document.querySelector('.slider-container').addEventListener('scroll', function() {
            let scrollTop = this.scrollTop; // Get the current scroll position

            // Check if scrolling down
            if (scrollTop > lastScrollTop) {
                // Slide header up
                header.style.transform = 'translateY(-100%)'; // Move header up
                stories.style.transform = 'translateY(-130%)'; // Show stories
                projectTitle.style.transform = 'translateY(-180%)';
            } else {
                // Slide header down
                header.style.transform = 'translateY(0)'; // Move header down
                stories.style.transform = 'translateY(0)'; // Hide stories when header is down
                projectTitle.style.transform = 'translateY(0%)';
            }

            lastScrollTop = scrollTop; // Update last scroll position
        });