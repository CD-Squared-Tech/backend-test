"use strict";
/*
import {
  annoyingSpinner,
  stopSpinner,
} from './modules/spinner/annoyingSpinner.js';

annoyingSpinner(5000);
document.getElementById('stopButton').addEventListener('click', stopSpinner);
document.querySelector('#startSpinner').addEventListener('click', () => {
  stopSpinner();
  annoyingSpinner();
});
*/

const learnBtn = document.getElementById("cdBtn");
const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("learnMore");

// LearnMore button opens a modal dialog
// learnBtn.addEventListener("click", () => {
//   dialog.showModal();
// });

// Cancel button closes the dialog box
// cancelButton.addEventListener("click", () => {
//   dialog.close("");
// });

let contentWrapper = document.querySelector(".content")
let contentWrapperPostion = contentWrapper.scrollTop;
const mainContentWrapper = document.querySelector(".mainContentWrapper")
const sidebarWrapper = document.querySelector(".sidebarWrapper")
const logo = document.querySelector(".horizontal-logo")
const socials = document.querySelector(".socials-list")
const viewportWidth = window.innerWidth;

// console.log(viewportWidth)

if(viewportWidth <= 768) {
  contentWrapper.addEventListener("scroll", (event) => {
    let contentContainerScroll = contentWrapper.scrollTop;
    if(contentContainerScroll > contentWrapperPostion) {
      // console.log("hello")
      logo.classList.add("small-horizontal-logo");
      socials.classList.add("socials-list-hidden")
      sidebarWrapper.classList.add("shortSidebarWrapper")
      mainContentWrapper.classList.add("shortMainContentWrapper")
    } else {
      logo.classList.remove("small-horizontal-logo");
      socials.classList.remove("socials-list-hidden")
      sidebarWrapper.classList.remove("shortSidebarWrapper")
      mainContentWrapper.classList.remove("shortMainContentWrapper")
    }
  })
}

// Contact form script
const form = document.getElementById('contact-form'); // Get the form element
const successMessageDiv = document.getElementById('success-message'); // Get the success message div element

form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  const formData = new FormData(form); // Collect form data
  fetch('http://localhost:8000/api/contact/', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
        if (response.ok) {
          // Handle success
          console.log('Data sent successfully');
          // Reset form
          form.reset();
          // Display the success message
          successMessageDiv.innerHTML = 'Form submitted successfully!';
        } else {
          // Handle error
          console.error('Data submission failed');
          // Clear the success message in case of an error
          successMessageDiv.innerHTML = '';
        }
    })
    .catch(error => {
      console.error('Network error:', error);
      // Clear the success message in case of an error
      successMessageDiv.textContent = '';
    });
});

