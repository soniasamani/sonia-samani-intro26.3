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

let messageForm = document.querySelector('[name = "leave_message"]')
messageForm.addEventListener( "submit", function(e){
   e.preventDefault();
   let name = e.target.usersName.value;
   let email = e.target.usersEmail.value;
   let message = e.target.usersMessage.value;
   
   console.log("Name:", name);
   console.log("Email:", email);
   console.log("Message:", message);
   let messageSection = document.querySelector("#messages");
   messageSection.style.display = "block";
   let messageList = messageSection.querySelector("ul");
   let newMessage = document.createElement("li");
   newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> 
   <span>${message}</span>`;
   let removeButton = document.createElement("button");
   removeButton.innerText = "remove";
   removeButton.setAttribute("type", "button");
   removeButton.addEventListener("click", function(e) {
    let entry = e.target.parentNode;
    entry.remove(); 
    if (messageList.children.length === 0) {
        messageSection.style.display = "none";
    }
  });
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
   e.target.reset();
});






