//Variable to auto-select name field on page load.
const username = document.getElementById("name");
username.focus();

//Variables to reference job role and to hide the text input for "Other" job role by default.
let jobRole = document.getElementById("title");
let otherJob = (document.getElementById("other-job-role").style.display =
  "none");

//Toggle for between showing text input for "Other".
// https://www.w3schools.com/ used for "block" reference.
jobRole.addEventListener("change", e => {
  if (e.target.value === "other") {
    document.getElementById("other-job-role").style.display = "block";
  } else {
    document.getElementById("other-job-role").style.display = "none";
  }
});

// Variables for selecting the "Design" & "Color" elements.
// Color element is disabled by default on page load.
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");
shirtColor.disabled = true;
const shirtTheme = shirtColor.children;

/*
    Event listener that will enable the "Color:" field if "Design" selected from the dropdown 
    menu while hiding those that do not fall under that theme.
*/
shirtDesign.addEventListener("change", e => {
  document.getElementById("color").disabled = false;
  for (let i = 0; i < shirtTheme.length; i++) {
    if (e.target.value === shirtTheme[i].getAttribute("data-theme")) {
      shirtTheme[i].hidden = false;
      shirtTheme[i].setAttribute("selected", true);
    } else {
      shirtTheme[i].hidden = true;
      shirtTheme[i].removeAttribute("selected");
    }
  }
});

/*  
    Created variables that select the <fieldset> and <p> elements, 
    Created variable for starting a total cost amount to 0.
    Created variable that will hold the array of checkbox.
*/
const registerForActivity = document.getElementById("activities");
const totalCost = document.getElementById("activities-cost");
let addedCost = 0;
const allEvents = document.querySelectorAll("#activities-box input");

/*Event listner for change on registerForActivity..
    1.  Checks if target is selected and adds the target cost 
        to the totalCost, else if not checked removes the cost from totalCost.
    2.  For loop that will compare date/time for the selected target with array list and disables
        the selected array position if values are true.
    3.  If activities are not selected but share the same date/time, removes disabled activity status.
*/
registerForActivity.addEventListener("change", e => {
  let eventCost = parseInt(e.target.getAttribute("data-cost"));
  if (e.target.checked) {
    addedCost += eventCost;
  } else {
    addedCost -= eventCost;
  }

  for (let i = 0; i < allEvents.length; i++) {
    if (
      e.target.getAttribute("data-day-and-time") ===
        allEvents[i].getAttribute("data-day-and-time") &&
      e.target.checked === true
    ) {
      allEvents[i].disabled = true;
      e.target.disabled = false;
    } else if (
      e.target.getAttribute("data-day-and-time") ===
        allEvents[i].getAttribute("data-day-and-time") &&
      e.target.checked === false
    ) {
      allEvents[i].disabled = false;
    }
  }
  totalCost.innerHTML = `Total: ${addedCost}`;
});

/*
    Create variables that select Paypal,Bitcoin, Credit Card and User payment type
    elements. By default, Bitcoin and Paypal's info are hidden and credit card option
    is selected on page load.
*/
const bitCoin = document.getElementById("bitcoin");
const creditCard = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
const userPayment = document.getElementById("payment");

userPayment.children[1].setAttribute("selected", true);
bitCoin.style.display = "none";
payPal.style.display = "none";

/*  
    Event listener will look for change in userPayment and display correct 
    payment method if event target equal to selected option.
*/
userPayment.addEventListener("change", e => {
  if (e.target.value === "bitcoin") {
    document.getElementById("bitcoin").style.display = "block";
    creditCard.style.display = "none";
    payPal.style.display = "none";
  } else if (e.target.value === "paypal") {
    document.getElementById("paypal").style.display = "block";
    creditCard.style.display = "none";
    bitCoin.style.display = "none";
  } else {
    document.getElementById("credit-card").style.display = "block";
    bitCoin.style.display = "none";
    payPal.style.display = "none";
  }
});

/* 
    Create variables to select items below..
    Name, Email, Register for Activities, Card #, Zip, CVV and form element 
    Note: Name and Register for Activities variables already created.
*/
const email = document.getElementById("email");
const card = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const form = document.querySelector("form");

const nameSubmit = username.value;
const emailSubmit = email.value;
const cardSubmit = card.value;
const zipSubmit = zip.value;
const cvvSubmit = cvv.value;

/*
1. Name Input
2. Event Listener to listen for a submit event.
3. Validator to return true or false
4. Console log true or false value
5. 
*/
const nameValidator = () => {
  let nameInput = nameSubmit;
  let validName = /^[a-z ,.'-]+$/i.test(nameInput);
  return validName;
};

form.addEventListener("submit", e => {
  if (nameValidator() === false) {
    invalidated(nameSubmit);
    e.preventDefault();
  } else {
    validated(nameSubmit);
    e.preventDefault();
  }
});

const validated = element => {
  console.log("Correct");

  // element.parentElement.className.add(".valid");
  // element.parentElement.className.remove(".not-valid");
  // element.lastElementChild.style.display = "none";
};

const invalidated = element => {
  console.log("Incorrect");
  // element.parentElement.className.add(".not-valid");
  // element.parentElement.className.remove(".valid");
  // element.lastElementChild.style.display = "block";
};
// const emailField = () => {
//   let emailSubmit = email.value;
// let validEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(
//   emailSubmit
// );
// if (validEmail) {
//   validated(emailField);
//   e.preventDefault();
// }
// };
// const registerField = () => {
//   if (addedCost > 0) {
//     //console.log(registerField());
//     validated(registerForActivity);
//   }
// };
// const cardField = () => {
//   let cardSubmit = card.value;
//   let validCard = /^[0-9]{8}$/.test(cardSubmit);
//   if (validCard) {
//     validated(cardField);
//     e.preventDefault();
//   }
// };
// const zipField = () => {
//   let zipSubmit = email.value;
//   let validZip = /^[0-9]{5}$/.test(zipSubmit);
//   if (validZip) {
//     validated(zipField);
//     e.preventDefault();
//   }
// };
// const cvvField = () => {
//   let zipSubmit = email.value;
//   let validZip = /^[0-9]{3}$/.test(zipSubmit);
//   if (validZip) {
//     validated(cvvField);
//     e.preventDefault();
//   }
// };
// // Functions to distinguish whether the element is validated/invalid
