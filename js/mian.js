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
        showError("Please choose a file and write something.");
        return;
    }

    // Here you can process the file and text as needed
    console.log("Uploading story:", storyText);
    // Optionally display or process the uploaded story
}

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

function submitComment(event, element) {
    event.stopPropagation();
    if (event.key === 'Enter' || event.type === 'click') {
        const commentBox = element.closest('.comment-box');
        const commentInput = commentBox.querySelector('input');
        const commentText = commentInput.value.trim();
        
        if (commentText) {
            alert(`Comment submitted: ${commentText}`);
            commentInput.value = '';
            commentBox.style.display = 'none';
        }
    }
}

const imageUpload = document.getElementById('uploadIcon');
const imageInput = document.getElementById('imageInput');
const toastAlert = document.getElementById('toastAlert');
const errorAlert = document.getElementById("errorAlert");
const closeBtn = document.querySelector('.close-btn');
const previewImage = document.getElementById('previewImage');
const dialogOverlay = document.getElementById('dialogOverlay');
const dialogCloseBtn = document.getElementById('dialogCloseBtn');
const fileNameInput = document.getElementById('fileNameInput');
const uploadBtn = document.getElementById('uploadBtn');

// Open File Dialog when Select Image Button is clicked
imageUpload.addEventListener('click', () => {
    imageInput.click();
});

dialogCloseBtn.addEventListener('click', closeDialog);
cancelBtn.addEventListener('click', closeDialog);

imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result; 
        };

        reader.readAsDataURL(file);

        fileNameInput.value = file.name;  // Set default file name in the input
        dialogOverlay.classList.add('show');
    }
});

// Close Dialog Box
function closeDialog() {
    dialogOverlay.classList.remove('show');
    imageInput.value = '';  // Reset file input
    previewImage.src = '';  // Clear image preview
    fileNameInput.value = '';  // Clear file name input
}

// Mock Upload Function
uploadBtn.addEventListener('click', () => {
    const description = document.getElementById('imageDescription').value.trim();
    const fileName = fileNameInput.value.trim();
    
    if (!fileName) {
        showError('Please enter a file name!');
        return;
    }
    
    if (!description) {
        showError('Please enter a description!');
        return;
    }

    showToast(`Image "${fileName}" uploaded with description: ${description}`);
    closeDialog();
});

function showToast(message) {
    toastAlert.textContent = message;
    toastAlert.classList.add('show');

    setTimeout(() => {
        toastAlert.classList.remove('show');
    }, 3000);
}

function showError(message) {
    errorAlert.textContent = message;
    errorAlert.classList.add('show');

    setTimeout(() => {
        errorAlert.classList.remove('show');
    }, 3000);
}

const description = document.getElementById('description');
const charCount = document.getElementById('charCount');

description.addEventListener('input', function() {
    const currentLength = description.value.length;
    const maxLength = description.getAttribute('maxlength');
    charCount.textContent = `${currentLength}/${maxLength} characters`;
});

function updateCharCount() {
    const textarea = document.getElementById("description");
    const charCountDisplay = document.getElementById("charCount");
    const currentLength = textarea.value.length;
    const maxLength = textarea.getAttribute("maxlength");

    charCountDisplay.textContent = maxLength 
        ? `${currentLength} / ${maxLength} characters` 
        : `${currentLength} / 0 characters`;

    charCountDisplay.style.color = currentLength >= maxLength ? 'red' : 'black';
}

document.addEventListener("DOMContentLoaded", function () {
    const projectTextarea = document.getElementById("description");

    projectTextarea.addEventListener("input", function() {
        updateCharCount("description", "charCount");
    });
    updateCharCount("description", "charCount");
});

// Search functionality
document.getElementById('searchButton').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchInput').value.trim();
    if (searchQuery) {
        alert(`Searching for "${searchQuery}"...`);
        // Implement your search logic here
    } else {
        alert('Please enter a search query.');
    }
});

const hamburgerMenu = document.getElementById('hamburgerMenu');
const mobileNav = document.getElementById('mobileNav');

// Toggle the mobile nav drawer when hamburger menu is clicked
hamburgerMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburgerMenu.classList.toggle('active');
});

// Close the nav when a link is clicked (optional)
const mobileNavLinks = mobileNav.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
    });
});


