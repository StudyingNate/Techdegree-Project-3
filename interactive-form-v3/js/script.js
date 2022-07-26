//Variable to auto-select name field on page load.
let nameField = document.getElementById("name");
nameField.focus();

//Variables to reference job role and to hide the text input for "Other" job role by default.
let jobRole = document.getElementById("title");
let otherJob = (document.getElementById("other-job-role").style.display =
  "none");

//Toggle for between showing text input for "Other".
// https://www.w3schools.com/ used for "block" reference.
jobRole.addEventListener("change", (e) => {
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
shirtDesign.addEventListener("change", (e) => {
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
registerForActivity.addEventListener("change", (e) => {
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
userPayment.addEventListener("change", (e) => {
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
let emailField = document.getElementById("email");
let cardField = document.getElementById("cc-num");
let zipField = document.getElementById("zip");
let cvvField = document.getElementById("cvv");
const formField = document.querySelector("form");

formField.addEventListener("submit", (e) => {
    if (!nameValidated ||  !emailValidated || 
        !cardValidated || !zipValidated ||
        !cvvValidated) {
        e.preventDefault();
        }
         
});

const nameValidated = () => {
  let nameSubmit = nameField.value;
  validName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(nameSubmit);
  if (validName) {
    validate(nameSubmit);
  } else {
    invalid(nameSubmit);
  }
};

const emailValidated = () => {
  let emailSubmit = emailField.value;
  validEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailSubmit
    );
  if (validEmail) {
    validate(emailSubmit);
  } else {
    invalid(emailSubmit);
  }
  return nameValidated;
};

const cardValidated = () => {
  let cardSubmit = cardField.value;
  validCard = /^\d{13,16}$/.test(cardSubmit);
  if (validCard) {
    validate(cardSubmit);
  } else {
    invalid(cardSubmit);
  }
  return cardValidated;
};
const zipValidated = () => {
  let zipSubmit = zipField.value;
  validZip = /^[0-9]{5}$/.test(zipSubmit);
  if (validZip) {
    validate(zipSubmit);
  } else {
    invalid(zipSubmit);
  }
  return zipValidated;
};

const cvvValidated = () => {
  let cvvSubmit = cvvField.value;
  validCvv = /^[0-9]{3}$/.test(cvvSubmit);
  if (validCvv) {
    validate(cvvSubmit);
  } else {
    invalid(cvvSubmit);
  }
  return cvvValidated;
};
function validate(element) {
  element.parentElement.classList.add("valid");
  element.parentElement.classList.remove("not-valid");
  element.parentElement.lastElementChild.style.display = "none";
}

function invalid(element) {
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  element.parentElement.lastElementChild.style.display = "block";
}
