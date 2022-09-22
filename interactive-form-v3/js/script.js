//////////////////////////////////////////////////////////////
//3. The "Name" field:
//////////////////////////////////////////////////////////////

//Variable to auto-select name field on page load.
let username = document.getElementById("name");
username.focus();


//////////////////////////////////////////////////////////////
//4. "Job Role" section:
//////////////////////////////////////////////////////////////

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


//////////////////////////////////////////////////////////////
//5. "T-Shirt Info" section:
//////////////////////////////////////////////////////////////

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


//////////////////////////////////////////////////////////////
//6. "Register for Activities" section:
//////////////////////////////////////////////////////////////

/*  
    Created variables that select the <fieldset> and <p> elements, 
    Created variable for starting a total cost amount to 0.
    Created variable that will hold the array of checkbox.
*/
const registerForActivity = document.getElementById("activities-box");
const totalCost = document.getElementById("activities-cost");
let addedCost = 0;
const allEvents = document.querySelectorAll("input[type=checkbox]");

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
  totalCost.innerHTML = `Total: $${addedCost}`;
});


//////////////////////////////////////////////////////////////
//7. "Payment Info" section:
//////////////////////////////////////////////////////////////

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


//////////////////////////////////////////////////////////////
//8. Form Validation:
//////////////////////////////////////////////////////////////

/* 
    Create variables to select items below..
    Name, Email, Register for Activities, Card #, Zip, CVV and form element 
    Note: Name and Register for Activities variables already created.
    Regex Test Validators
    Submit Eventlistener
    Helper validators that will change the CSS dispayed on the page.
*/
const email = document.getElementById("email");
const card = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const form = document.querySelector("form");

// REGEX Check Validators
const nameValidator = () => {
  let nameInput = username.value;
  let validName = /^[a-zA-Z ]{2,30}$/.test(nameInput);

  if (isNaN(nameInput)) {
    return validName;
  } else if (!isNaN(nameInput) && nameInput !== "") {
    document.getElementById("name-hint").textContent =
      "Numeric values are invalid";
  } else if (nameInput === "" || null || undefined) {
    document.getElementById("name-hint").textContent =
      "Name field cannot be blank";
  }
};

const emailValidator = () => {
  let emailSubmit = email.value;
  let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    emailSubmit
  );
  return validEmail;
};

const registerValidator = () => {
  if (addedCost > 0) {
    return true;
  } else {
    return false;
  }
};

const cardValidator = () => {
  let cardSubmit = card.value;
  let validCard = /^[0-9]{13,16}$/.test(cardSubmit);
  return validCard;
};

const zipValidator = () => {
  let zipSubmit = zip.value;
  let validZip = /^[0-9]{5}$/.test(zipSubmit);
  return validZip;
};

const cvvValidator = () => {
  let cvvSubmit = cvv.value;
  let validCvv = /^[0-9]{3}$/.test(cvvSubmit);
  return validCvv;
};

//Event Listeners on "Submit"
form.addEventListener("submit", (e) => {

  //Name
  if (!nameValidator()) {
    invalidated(username);
    e.preventDefault();
  } else {
    validated(username);
  }

  //Email
  if (!emailValidator()) {
    invalidated(email);
    e.preventDefault();

  } else {
    validated(email);
  }

  //Activities
  if (!registerValidator()) {
    invalidated(registerForActivity);
    e.preventDefault();
  } else {
    validated(registerForActivity);
  }

  //Payment Method
  if (userPayment.value === "credit-card") {
    if (!cardValidator()) {
      invalidated(card);
      e.preventDefault();
    } else {
      validated(card);
    }

    if (!zipValidator()) {
      invalidated(zip);
      e.preventDefault();
    } else {
      validated(zip);
    }

    if (!cvvValidator()) {
      invalidated(cvv);
      e.preventDefault();
    } else {
      validated(cvv);
    }
  }
});

// Helper functions to distinguish whether the element(the validators) are to be validated/invalid.
const invalidated = (element) => {
  element.parentNode.classList.add("not-valid");
  element.parentNode.classList.remove("valid");
  element.parentNode.lastElementChild.style.display = "block";
};

const validated = (element) => {
  element.parentNode.classList.add("valid");
  element.parentNode.classList.remove("not-valid");
  element.parentNode.lastElementChild.style.display = "none";
};


//////////////////////////////////////////////////////////////
//9. Accessibility:
//////////////////////////////////////////////////////////////

//Checkbox "focus" and "blur" accessibility support.
for (let i = 0; i < allEvents.length; i++) {
  allEvents[i].addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });

  allEvents[i].addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
}

//Realtime verification process using keyup event listeners.
form.addEventListener("keyup", (e) => {
  let nameInput = username.value;
  let validName = /^[a-zA-Z ]{2,30}$/.test(nameInput);

  if (isNaN(e.target.value === nameInput)) {
    return validName;
  } else if (!isNaN(nameInput) && nameInput !== "") {
    document.getElementById("name-hint").textContent =
      "Numeric values are invalid";
  } else if (nameInput === "") {
    document.getElementById("name-hint").textContent =
      "Name field cannot be blank";
  }

  if (!nameValidator()) {
    invalidated(username);
  } else {
    validated(username);
  }
});
