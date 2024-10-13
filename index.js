document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const termsAccepted = document.getElementById("terms").checked;

    // Validate age
    if (!isAgeValid(dob)) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    // Save user data to localStorage
    const user = { name, email, password, dob, termsAccepted };
    saveUserData(user);

    // Display the updated user list
    displayUsers();
});

function isAgeValid(dob) {
    const minAge = 18;
    const maxAge = 55;
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= minAge && age - 1 <= maxAge;
    }
    return age >= minAge && age <= maxAge;
}

function saveUserData(user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function displayUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userTableBody = document.getElementById("userTable").getElementsByTagName("tbody")[0];

    // Clear existing table data
    userTableBody.innerHTML = "";

    // Add rows to the table
    users.forEach(user => {
        const row = userTableBody.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;
        row.insertCell(2).textContent = user.password;
        row.insertCell(3).textContent = user.dob;
        row.insertCell(4).textContent = user.termsAccepted;
    });
}

// Display users on page load
window.onload = displayUsers;
