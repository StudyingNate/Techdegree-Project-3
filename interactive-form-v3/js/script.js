//Element selector to auto-select name field on page load.
document.getElementById("name").focus();

//Variables to reference job role and to hide the text input for "Other" job role by default. 
const jobRole =  document.getElementById("title");
const otherJob = document.getElementById("other-job-role").style.display = "none";

//Toggle for between showing text input for "Other".
// https://www.w3schools.com/ used for "block" reference. 
jobRole.addEventListener("change", (e) => {
    if(e.target.value === "other") {
        document.getElementById("other-job-role").style.display = "block";
    } else {
        document.getElementById("other-job-role").style.display = "none";
    };
});

// Variables for selecting the "Design" & "Color" elements.
// Color element is disabled by default on page load.
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color")
    document.getElementById("color").disabled = true;
const shirtTheme = shirtColor.children;
//console.log(shirtTheme);

/*Event listener that will enable the "Color:" field if "Design" selected from the dropdown menu 
while hiding those that do not fall under that theme.*/
shirtDesign.addEventListener("change", (e) => {
     document.getElementById("color").disabled = false;
     for (let i = 0; i < shirtTheme.length; i++) {
         if (e.target.value === shirtTheme[i].getAttribute("data-theme")){
            shirtTheme[i].hidden = false;
            shirtTheme[i].setAttribute("selected", true);
         } else {
            shirtTheme[i].hidden = true;
            shirtTheme[i].removeAttribute("selected");
         };
        
     };
});
