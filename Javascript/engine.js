function scrollToSection(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: 'smooth' });
}

function changeServiceValue(val) {
  document.getElementById("services").value = val;
}

function preventEnterSubmit(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}

function showSuccessMessage() {
  var successMessage = document.getElementById("successMessage");
  successMessage.classList.add("show");

  // Automatically hide the success message after 5 seconds
  setTimeout(function() {
    successMessage.classList.remove("show");
  }, 5000);
}
