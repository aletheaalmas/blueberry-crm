const items = [1, 2, null];

const filteredItems = items.filter((item) => {
  if (item === null) {
    return false;
  }

  if (item > 0) {
    return true;
  }
});

console.log(filteredItems);
