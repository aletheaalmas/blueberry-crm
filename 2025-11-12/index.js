const buttonSayHelloElement = document.getElementById("say-hello");

function handleSayHello() {
  alert("Hello");
}

buttonSayHelloElement.addEventListener("click", handleSayHello);
