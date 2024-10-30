// main.js

// Function to open the project file chooser
function openProjectFileChooser() {
    document.getElementById('projectFile').click();
}

// Function to show the project upload dialog
function showProjectUploadDialog() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('project-dailog').style.display = 'block';
}

// Function to close the project upload dialog
function closeProjectUploadDialog() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('project-dailog').style.display = 'none';
}

// Function to upload the project
function uploadproject() {
    const projectText = document.getElementById('projectText').value;
    const projectFile = document.getElementById('projectFile').files[0];

    if (projectText && projectFile) {
        const formData = new FormData();
        formData.append('projectText', projectText);
        formData.append('projectFile', projectFile);

        // Send the data to the server (placeholder URL)
        fetch('http://localhost/LogoDesign/php/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Upload successful:', data);
            closeProjectUploadDialog();
            // Optionally refresh the project list or do something else
        })
        .catch(error => {
            console.error('Error during upload:', error);
        });
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to open the story file chooser
function openFileChooser() {
    document.getElementById('storyFile').click();
}

// Function to show the story upload dialog
function showDialogBox() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('story-dialog').style.display = 'block';
}

// Function to close the story upload dialog
function closeDialogBox() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('story-dialog').style.display = 'none';
}

// Function to upload the story
function uploadStory() {
    const storyText = document.getElementById('storyText').value;
    const storyFile = document.getElementById('storyFile').files[0];

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
}

// Character count functionality for project text
document.getElementById('projectText').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('projectCharCount').innerText = `${charCount} / 50 characters`;
});

// Character count functionality for story text
document.getElementById('storyText').addEventListener('input', function() {
    const charCount = this.value.length;
    document.getElementById('charCount').innerText = `${charCount} / 50 characters`;
});
