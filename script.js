let input = document.querySelector(".input-field");
const errorMsg = document.querySelector(".add-link");
const action = document.querySelector(".action-button");
const result = document.querySelector(".results");

action.addEventListener(
  "click",
  function () {
    checkInput();
  },
  false
);

function checkInput() {
  let inputValue = document.getElementById("url-input").value;
  
  if (inputValue === "") {
    input.style.border = "2px solid red";
    errorMsg.style.display = "Block";
  } else {
    action.textContent = "Shortening";
    fetch("https://api.shrtco.de/v2/shorten?url=" + inputValue)
      .then((response) => response.json())
      .then((data) => {
        handleInput(inputValue, data);
        action.textContent = "Shorten it!";
      })
      .catch(function (err) {
        console.log(err);
        action.textContent = "Shorten it!";
      });
  }
}
// pass the data gotten from the api and the url inputted
function handleInput(oldLink, data) {

  let container = document.createElement("div");
  let container1 = document.createElement("div");
  let container2 = document.createElement("div");

  container.className = "container";
  container1.className = "container-1";
  container2.className = "container-2";

  let long = document.createElement("span");
  let short = document.createElement("span");
  let btn = document.createElement("button");

  btn.className = "copy-btn";
  long.innerText = oldLink;

  container1.appendChild(long);
  container.appendChild(container1);
  short.innerText = data.result.short_link;
  container2.appendChild(short);

  btn.innerText = "Copy";

  container2.appendChild(btn);
  container.appendChild(container2);
  result.appendChild(container);

  container.style.display = "flex";

  btn.addEventListener('click', function() {

    navigator.clipboard.writeText(short.textContent);
    btn.innerText = "Copied!"
    btn.style.backgroundColor = "hsl(257, 27%, 26%)";

  });
}

