function addItem() {
  const itemInput = document.getElementById('itemInput');
  const itemName = itemInput.value.trim();

  if (itemName !== '') {
    const groceryList = document.getElementById('groceryList');
    const listItem = document.createElement('li');
    listItem.textContent = itemName;

    const removeButton = document.createElement('button');
    removeButton.textContent = '❌';
    removeButton.onclick = function() {
      groceryList.removeChild(listItem);
    };

    listItem.appendChild(removeButton);
    groceryList.appendChild(listItem);
    itemInput.value = '';
  }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', addItem);

  // Also allow adding items by pressing Enter
  const itemInput = document.getElementById('itemInput');
  itemInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addItem();
    }
  });
});
