//Element selector to auto-select name field on page load.
document.getElementById("name").focus();

//Variables to reference job role and to hide the text input for "Other" job role by default. 
const jobRole =  document.getElementById("title");
const otherJob = document.getElementById("other-job-role").style.display = "none";

//Toggle for between showing text input for "Other"
// https://www.w3schools.com/ used for "block" reference 
jobRole.addEventListener("change", (e) => {
    if(e.target.value === "other") {
        document.getElementById("other-job-role").style.display = "block";
    } else {
        document.getElementById("other-job-role").style.display = "none";
    };
});

