class DragDropInterface {
  constructor() {
    this.draggedElement = null;
    this.itemCounter = 6; // Start from 6 since we have 5 initial items
    this.moveCount = 0;
    this.deleteCount = 0;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateStats();
  }

  bindEvents() {
    // Bind drag events for existing items
    this.bindDragEvents();

    // Bind drop events for drop areas
    this.bindDropEvents();

    // Bind control button events
    document.getElementById('reset-btn').addEventListener('click', () => this.resetItems());
    document.getElementById('add-item-btn').addEventListener('click', () => this.addNewItem());
  }

  bindDragEvents() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      item.addEventListener('dragstart', (e) => this.handleDragStart(e));
      item.addEventListener('dragend', (e) => this.handleDragEnd(e));
    });
  }

  bindDropEvents() {
    const dropAreas = document.querySelectorAll('.drop-area');
    dropAreas.forEach(area => {
      area.addEventListener('dragover', (e) => this.handleDragOver(e));
      area.addEventListener('dragenter', (e) => this.handleDragEnter(e));
      area.addEventListener('dragleave', (e) => this.handleDragLeave(e));
      area.addEventListener('drop', (e) => this.handleDrop(e));
    });
  }

  handleDragStart(e) {
    this.draggedElement = e.target;
    e.target.classList.add('dragging');

    // Store the data for the dragged element
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
  }

  handleDragEnd(e) {
    e.target.classList.remove('dragging');
    this.draggedElement = null;
  }

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  handleDragEnter(e) {
    e.preventDefault();
    const dropArea = e.currentTarget;
    dropArea.classList.add('drag-over');
  }

  handleDragLeave(e) {
    const dropArea = e.currentTarget;
    if (!dropArea.contains(e.relatedTarget)) {
      dropArea.classList.remove('drag-over');
    }
  }

  handleDrop(e) {
    e.preventDefault();
    const dropArea = e.currentTarget;
    const dropZone = dropArea.closest('.drop-zone');

    if (dropArea && this.draggedElement) {
      dropArea.classList.remove('drag-over');

      // Check if dropping in trash
      if (dropZone && dropZone.dataset.zone === 'trash') {
        this.deleteItem(this.draggedElement);
      } else {
        this.moveItem(this.draggedElement, dropArea);
      }
    }
  }

  moveItem(item, dropArea) {
    // Clone the item to avoid moving the original
    const clonedItem = item.cloneNode(true);

    // Add success animation
    clonedItem.classList.add('drop-success');

    // Remove the original item from its current location
    const originalParent = item.parentElement;
    item.remove();

    // Add the cloned item to the new location
    dropArea.appendChild(clonedItem);

    // Update placeholder visibility
    this.updatePlaceholderVisibility(originalParent);
    this.updatePlaceholderVisibility(dropArea);

    // Rebind events to the new item
    this.bindDragEventsToItem(clonedItem);

    // Update move count
    this.moveCount++;
    this.updateStats();

    // Remove animation class after animation completes
    setTimeout(() => {
      clonedItem.classList.remove('drop-success');
    }, 300);
  }

  deleteItem(item) {
    const parentContainer = item.parentElement;
    item.classList.add('removing');

    setTimeout(() => {
      item.remove();
      this.deleteCount++;
      this.updateStats();
      this.updatePlaceholderVisibility(parentContainer);
    }, 300);
  }

  bindDragEventsToItem(item) {
    item.addEventListener('dragstart', (e) => this.handleDragStart(e));
    item.addEventListener('dragend', (e) => this.handleDragEnd(e));
  }

  resetItems() {
    // Clear all drop areas except source area
    const dropAreas = document.querySelectorAll('.drop-zone .drop-area');
    dropAreas.forEach(area => {
      const items = area.querySelectorAll('.item');
      items.forEach(item => {
        item.classList.add('removing');
        setTimeout(() => {
          item.remove();
        }, 300);
      });
    });

    // Reset the source area to original items
    setTimeout(() => {
      this.restoreOriginalItems();
      this.moveCount = 0;
      this.deleteCount = 0;
      this.updateStats();

      // Update placeholder visibility for all drop areas
      document.querySelectorAll('.drop-area').forEach(area => {
        this.updatePlaceholderVisibility(area);
      });
    }, 400);
  }

  restoreOriginalItems() {
    const sourceArea = document.querySelector('.source-area');

    // Clear current items
    const currentItems = sourceArea.querySelectorAll('.item');
    currentItems.forEach(item => item.remove());

    // Create original items
    const originalItems = [
      { id: 1, icon: '📝', text: 'Task Item' },
      { id: 2, icon: '📅', text: 'Calendar Event' },
      { id: 3, icon: '📧', text: 'Email' },
      { id: 4, icon: '📊', text: 'Report' },
      { id: 5, icon: '🏷️', text: 'Label' }
    ];

    originalItems.forEach(itemData => {
      const item = this.createItem(itemData.id, itemData.icon, itemData.text);
      sourceArea.appendChild(item);
    });

    // Reset item counter
    this.itemCounter = 6;
  }

  addNewItem() {
    const icons = ['🎯', '💡', '⚡', '🎨', '🔧', '📱', '💼', '🎵', '🏆', '🌟'];
    const texts = [
      'New Task', 'Idea', 'Quick Action', 'Design Work',
      'Bug Fix', 'Mobile Update', 'Meeting', 'Audio File',
      'Achievement', 'Important Note'
    ];

    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomText = texts[Math.floor(Math.random() * texts.length)];

    const sourceArea = document.querySelector('.source-area');
    const newItem = this.createItem(this.itemCounter, randomIcon, randomText);

    sourceArea.appendChild(newItem);
    this.itemCounter++;

    // Add creation animation
    newItem.style.transform = 'scale(0)';
    newItem.style.opacity = '0';

    setTimeout(() => {
      newItem.style.transition = 'all 0.3s ease';
      newItem.style.transform = 'scale(1)';
      newItem.style.opacity = '1';
    }, 100);

    setTimeout(() => {
      newItem.style.transition = '';
    }, 400);
  }

  createItem(id, icon, text) {
    const item = document.createElement('div');
    item.className = 'item';
    item.draggable = true;
    item.dataset.id = id;

    item.innerHTML = `
      <span class="icon">${icon}</span>
      <span>${text}</span>
    `;

    this.bindDragEventsToItem(item);
    return item;
  }

  updateStats() {
    document.getElementById('move-count').textContent = this.moveCount;
    document.getElementById('delete-count').textContent = this.deleteCount;
  }

  updatePlaceholderVisibility(container) {
    if (container && container.classList.contains('drop-area')) {
      const placeholder = container.querySelector('.placeholder');
      const items = container.querySelectorAll('.item');

      if (placeholder) {
        placeholder.style.display = items.length > 0 ? 'none' : 'block';
      }
    }
  }
}

// Global variable to store the interface instance
let dragDropInterface = null;

// Initialize the drag and drop interface when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  dragDropInterface = new DragDropInterface();
  window.dragDropInterface = dragDropInterface;
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
    case 'r':
      e.preventDefault();
      document.getElementById('reset-btn').click();
      break;
    case 'n':
      e.preventDefault();
      document.getElementById('add-item-btn').click();
      break;
    }
  }
});

// Add touch support for mobile devices
let touchItem = null;
let touchOffset = { x: 0, y: 0 };

document.addEventListener('touchstart', (e) => {
  const item = e.target.closest('.item');
  if (item) {
    touchItem = item;
    const touch = e.touches[0];
    const rect = item.getBoundingClientRect();
    touchOffset.x = touch.clientX - rect.left;
    touchOffset.y = touch.clientY - rect.top;

    item.style.position = 'fixed';
    item.style.zIndex = '1000';
    item.style.pointerEvents = 'none';
    item.classList.add('dragging');
  }
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  if (touchItem) {
    e.preventDefault();
    const touch = e.touches[0];
    touchItem.style.left = (touch.clientX - touchOffset.x) + 'px';
    touchItem.style.top = (touch.clientY - touchOffset.y) + 'px';

    // Highlight drop zones
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropArea = elementBelow?.closest('.drop-area');

    document.querySelectorAll('.drop-area').forEach(area => {
      area.classList.remove('drag-over');
    });

    if (dropArea) {
      dropArea.classList.add('drag-over');
    }
  }
}, { passive: false });

document.addEventListener('touchend', (e) => {
  if (touchItem) {
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropArea = elementBelow?.closest('.drop-area');
    const dropZone = elementBelow?.closest('.drop-zone');

    // Reset item styles
    touchItem.style.position = '';
    touchItem.style.zIndex = '';
    touchItem.style.left = '';
    touchItem.style.top = '';
    touchItem.style.pointerEvents = '';
    touchItem.classList.remove('dragging');

    // Remove drag-over class from all areas
    document.querySelectorAll('.drop-area').forEach(area => {
      area.classList.remove('drag-over');
    });

    // Handle the drop
    if (dropArea && dropZone && dragDropInterface) {
      if (dropZone.dataset.zone === 'trash') {
        dragDropInterface.deleteItem(touchItem);
      } else {
        dragDropInterface.moveItem(touchItem, dropArea);
      }
    }

    touchItem = null;
  }
});
