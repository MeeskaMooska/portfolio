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
  setTimeout(function () {
    successMessage.classList.remove("show");
  }, 5000);
}

let sidebarOpen = false
const sidebar = document.getElementById("sidebar")
const sidebarMenuButton = document.getElementById("sidebar-menu-button")

function handleSidebarMenuButtonClick() {
  if (sidebarOpen) {
    sidebar.style.right = '-20%'
    sidebarMenuButton.style.left = '-60px'
    sidebarMenuButton.style.top = '50%'
    sidebarMenuButton.classList.remove('sidebar-menu-button-open')
    sidebarMenuButton.classList.add('sidebar-menu-button-closed')
  } else {
    sidebar.style.right = '0%'
    sidebarMenuButton.style.left = '20px'
    sidebarMenuButton.style.top = '20px'

    sidebarMenuButton.classList.remove('sidebar-menu-button-closed')
    sidebarMenuButton.classList.add('sidebar-menu-button-open')
  }
  sidebarOpen = !sidebarOpen;
}
