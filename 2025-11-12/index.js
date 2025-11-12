const checkEventButtonElement = document.getElementById("check-event");

checkEventButtonElement.addEventListener("click", function (event) {
  console.log(this.innerText);
  console.log({ event });
});
