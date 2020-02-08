// --- Immediately invoked function for email.js ---
(function(){emailjs.init("user_wwo3XzSnMgSAR5hgP5jJv");})();

// --- Sends e-mail to my e-mail adress
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    emailjs.send("gmail", "contact", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
        .then(
            function success() {
                notification();
                setTimeout(refresh, 2500);
            },
            function failure() {
                failToSend();
            }
        );
    return false;
});

// --- Changes text in button to notify user that e-mail was sent successfuly (200) ---
function notification() {
    $("#submit").text("E-mail submitted! Closing...");
    $("#submit").removeClass("btn-danger");
    $("#submit").addClass("btn-success");
    setTimeout(function () { $("#contactModal").modal("toggle"); }, 2000);
}

// --- Refreshes form ONLY ---
function refresh() {
    $("#submit").text("Submit");
    $("#submit").removeClass("btn-success");
    $("#submit").addClass("btn-danger");
    document.getElementById("contactForm").reset();
}

// --- E-mail failed to sent (404) ---
function failToSend(){
    $("#submit").text("Failed to submit. Refresh page");
     $("#submit").removeClass("btn-warning");
    $("#submit").addClass("btn-secondary");
}