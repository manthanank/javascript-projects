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
  