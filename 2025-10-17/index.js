let dataNumbers = [1, 2, 3];

function addNewNumber(numbers, newNumber) {
  const updatedNumbers = [...numbers, newNumber];

  dataNumbers = updatedNumbers;
}

addNewNumber(dataNumbers, 4); // [1,2,3,4]
// addNewNumber(dataNumbers, 5); // [1,2,3,4,5]
// addNewNumber(dataNumbers, 6); // [1,2,3,4,5,6]

console.log(dataNumbers);
