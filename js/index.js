const body = document.body;
const footerElement = document.createElement("footer");
body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");

const copyright = document.createElement("p");
copyright.innerHTML = `\u00A9 ${thisYear} Sonia Samani`;
footer.appendChild(copyright); 

const skills = ["HTML", "CSS", "JavaScript", "Git", "GitHub", "Java", "SQL", "WordPress"];
const skillsSection = document.querySelector("#Skills"); 
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

