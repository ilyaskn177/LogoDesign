// Toggle between login and signup forms
function toggleForms() {
    document.getElementById("loginForm").classList.toggle("active");
    document.getElementById("signupForm").classList.toggle("active");
}

// Function to handle login
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorDiv = document.getElementById("loginError");

    errorDiv.textContent = "";

    if (!email || !password) {
        errorDiv.textContent = "Please fill out both fields.";
    } else {
        alert("Login successful!"); // Replace this with actual login logic
    }
}

// Function to handle signup
function signup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorDiv = document.getElementById("signupError");

    errorDiv.textContent = "";

    if (!name || !email || !password || !confirmPassword) {
        errorDiv.textContent = "Please fill out all fields.";
    } else if (password !== confirmPassword) {
        errorDiv.textContent = "Passwords do not match.";
    } else {
        alert("Signup successful!"); // Replace this with actual signup logic
    }
}
