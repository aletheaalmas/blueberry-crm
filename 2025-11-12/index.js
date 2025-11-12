/* fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => console.log(data)); */

const getExampleProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);

  {
    return data;
  }
};

function saveToStorage(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

getExampleProducts().then(saveToStorage);

/* fetch('https://fakestoreapi.com/users')
  .then(response => response.json())
  .then(data => console.log(data)); */

const getExampleUsers = async () => {
  const response = await fetch("https://fakestoreapi.com/users");
  const dataUsers = await response.json();
  console.log(dataUsers);
  return dataUsers;
};

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

const fetchAndSave = async () => {
  const users = await getExampleUsers();
  saveUsers(users);
};

fetchAndSave();
