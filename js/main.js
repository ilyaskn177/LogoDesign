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

    if (storyText && storyFile) {
        const formData = new FormData();
        formData.append('storyText', storyText);
        formData.append('storyFile', storyFile);

        // Send the data to the server (placeholder URL)
        fetch('http://localhost/LogoDesign/php/upload_story.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Story upload successful:', data);
            closeDialogBox();
            // Optionally refresh the story list or do something else
        })
        .catch(error => {
            console.error('Error during story upload:', error);
        });
    } else {
        alert('Please fill in all fields.');
    }

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
    const fileNameInput = document.getElementById("fileNameInput").value;

    // Check if all fields are filled before uploading
    if (projectText && fileInput.files.length && fileNameInput) {
        const formData = new FormData();
        formData.append('fileNameInput', fileNameInput); // Add file name input to form data
        formData.append('projectText', projectText);
        formData.append('projectFile', fileInput.files[0]);

        // Send the data to the server (replace URL with actual upload endpoint)
        fetch('http://localhost/LogoDesign/php/upload_project.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Upload successful:', data);
            closeProjectUploadDialog();
            location.reload();
            // Optionally, refresh the project list or do something else
        })
        .catch(error => {
            console.error('Error during upload:', error);
        });
    } else {
        alert('Please fill in all fields.');
    }
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

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost/LogoDesign/php/fetch_stories_projects.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const projectSection = document.getElementById('projects-section');
            projectSection.innerHTML = ''; // Clear existing content

            // Debugging: Log data to verify structure
            console.log("Fetched data:", data);

            data.projects.forEach(project => {
                // Create the project item
                const projectItem = document.createElement('a');
                projectItem.href = `details.html?id=${project.id}`;
                projectItem.classList.add('grid-item');
            
                projectItem.innerHTML = `
                    <a href="details.html?id=${project.id}" class="image-link">
                        <img src="/LogoDesign/uploads/${project.image}" alt="Work by ${project.artist}">
                    </a>
                    <div class="details">
                        <p class="artist-name">${project.artist}</p>
                        <div class="actions">
                            <span class="likes" style="margin-right: 15px;" onclick="toggleLike(event, this, ${project.id})">
                                <i class="fas fa-thumbs-up"></i> ${project.likes}
                            </span>
                            <span class="comments" onclick="toggleCommentBox(event, ${project.id})">
                                <i class="fas fa-comments"></i> ${project.comments}
                            </span>
                        </div>
                        <div class="comment-box" id="commentsSection-${project.id}" style="display: none;">
                            <input type="text" id="commentInput-${project.id}" placeholder="Add a comment..." onkeypress="submitComment(event, ${project.id})">
                            <button onclick="submitComment(event, ${project.id})">Submit</button>
                        </div>
                    </div>
                `;
            
                projectSection.appendChild(projectItem);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});

// Function to handle liking a project
function toggleLike(event, element, projectId) {
    event.stopPropagation(); // Prevents the click from reaching the projectItem link
    event.preventDefault(); // Prevents the default action

    // Call your existing like project functionality
    likeProject(projectId);
}

// Function to toggle the comment box
function toggleCommentBox(event, projectId) {
    event.stopPropagation(); // Prevents the click from reaching the projectItem link
    event.preventDefault(); // Prevents the default action

    const commentSection = document.getElementById(`commentsSection-${projectId}`);
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
}

// Function to handle liking a project
function likeProject(projectId) {
    fetch(`http://localhost/LogoDesign/php/like_project.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: projectId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById(`likeCount-${projectId}`).innerText = `${data.likes} Likes`;
        }
    });
}

// Function to submit a comment
function submitComment(projectId) {
    const commentText = document.getElementById(`commentInput-${projectId}`).value;
    if (commentText.trim() === '') return;

    fetch(`http://localhost/LogoDesign/php/comment_project.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: projectId, comment: commentText })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update comment count
            document.getElementById(`commentCount-${projectId}`).innerText = `${data.comments} Comments`;
            
            // Append the new comment to the list
            const commentsList = document.getElementById(`commentsList-${projectId}`);
            const newComment = document.createElement('li');
            newComment.textContent = commentText;
            commentsList.appendChild(newComment);
            
            // Clear the comment input field
            document.getElementById(`commentInput-${projectId}`).value = '';
        }
    });
}
