const form = document.querySelector("form");
form.addEventListener("submit", function($event) {
  const files = document.querySelector('#images').files;
  const checkboxes = document.querySelectorAll(".confirm-deletion");
  const total = files.length + checkboxes.length - [...checkboxes].filter(checkbox => checkbox.checked).length;
  if (total > 4) {
    $event.preventDefault()
    alert("A post can only contains up to 4 images.");
  }
});