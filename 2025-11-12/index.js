function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---

const getExampleProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return products;
};

getExampleProducts().then((products) => {
  saveToStorage("products", products);
});

// ---

const getExampleUsers = async () => {
  const response = await fetch("https://fakestoreapi.com/users");
  const users = await response.json();

  return users;
};

const fetchAndSave = async () => {
  const users = await getExampleUsers();
  saveToStorage("users", users);
};

fetchAndSave();
