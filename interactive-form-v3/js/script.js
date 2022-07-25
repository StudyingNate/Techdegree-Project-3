//Variable to auto-select name field on page load.
const nameField = document.getElementById("name").focus();


//Variables to reference job role and to hide the text input for "Other" job role by default. 
let jobRole =  document.getElementById("title");
let otherJob = document.getElementById("other-job-role").style.display = "none";

//Toggle for between showing text input for "Other".
// https://www.w3schools.com/ used for "block" reference. 
jobRole.addEventListener("change", (e) => {
    if(e.target.value === "other") {
        document.getElementById("other-job-role").style.display = "block";
    } else {
        document.getElementById("other-job-role").style.display = "none";
    }
});

// Variables for selecting the "Design" & "Color" elements.
// Color element is disabled by default on page load.
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color")
    shirtColor.disabled = true;
const shirtTheme = shirtColor.children;

/*
    Event listener that will enable the "Color:" field if "Design" selected from the dropdown 
    menu while hiding those that do not fall under that theme.
*/
shirtDesign.addEventListener("change", (e) => {
     document.getElementById("color").disabled = false;
     for (let i = 0; i < shirtTheme.length; i++) {
         if (e.target.value === shirtTheme[i].getAttribute("data-theme")){
            shirtTheme[i].hidden = false;
            shirtTheme[i].setAttribute("selected", true);
         } else {
            shirtTheme[i].hidden = true;
            shirtTheme[i].removeAttribute("selected");
         }
     }
});


/*  
    Create variables that select the <fieldset> and <p> elements, 
    Create variable for starting a total cost amount to 0.
    Create variable that will hold the array of checkbox.
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
    3.  If activities are not selected but share the same date/time, removes any activity disabled.
*/
registerForActivity.addEventListener("change", (e) => {
    let eventCost = parseInt(e.target.getAttribute("data-cost"));
    if (e.target.checked) {
        addedCost += eventCost;
    }
    else {
        addedCost -= eventCost;    
    }

    for(let i = 0; i < allEvents.length; i++) {
        if  (e.target.getAttribute("data-day-and-time") === allEvents[i].getAttribute("data-day-and-time") 
        && e.target.checked === true) {
        allEvents[i].disabled = true;
        e.target.disabled = false;
        } 
        else if (e.target.getAttribute("data-day-and-time") === allEvents[i].getAttribute("data-day-and-time") 
        && e.target.checked === false) {
        allEvents[i].disabled = false;
        }
    }
    totalCost.innerHTML = `Total: ${addedCost}`;
});


