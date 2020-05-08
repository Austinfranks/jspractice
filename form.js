const name = document.getElementById("name");
const password = document.getElementById("password");
const form = document.getElementById("form");

const errorElement = document.getElementById("error");

form.addEventListener("submit", (e) => {
  let messages = [];

  // IF USER LEAVES INPUTS BLANK
  if (name.value === "" || name.value == null) {
    messages.push("Name is required");
  }

  if (password.value.length <= 5) {
    messages.push("Password must be longer than 5 characters");
  }

  if (messages.length > 0) {
    //PREVENTS PAGE FROM SUBMITTING
    e.preventDefault();
    errorElement.innerText = messages.join(",");
  }
});
