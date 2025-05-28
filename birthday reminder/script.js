// Birthday Reminder Application
class BirthdayReminder {
  constructor() {
    this.birthdays = this.loadBirthdays();
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.renderBirthdays();
    this.renderUpcomingBirthdays();
    this.updateEmptyState();
  }

  setupEventListeners() {
    // Form submission
    const form = document.getElementById('birthdayForm');
    form.addEventListener('submit', (e) => this.handleFormSubmit(e));

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.handleFilterChange(e));
    });

    // Month change event to populate days
    const monthSelect = document.getElementById('birthdayMonth');
    monthSelect.addEventListener('change', () => this.populateDays());

    // Populate days on page load
    this.populateDays();
  }

  populateDays() {
    const monthSelect = document.getElementById('birthdayMonth');
    const daySelect = document.getElementById('birthdayDay');
    const selectedMonth = monthSelect.value;

    // Clear existing options except the first one
    daySelect.innerHTML = '<option value="">Select Day</option>';

    if (!selectedMonth) return;

    const daysInMonth = new Date(2024, parseInt(selectedMonth), 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const option = document.createElement('option');
      option.value = day.toString().padStart(2, '0');
      option.textContent = day;
      daySelect.appendChild(option);
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('personName').value.trim();
    const month = document.getElementById('birthdayMonth').value;
    const day = document.getElementById('birthdayDay').value;
    const year = document.getElementById('birthYear').value;
    const relationship = document.getElementById('relationship').value;

    if (!name || !month || !day) {
      this.showMessage('Please fill in all required fields.', 'error');
      return;
    }

    // Check if birthday already exists for this person
    const existingBirthday = this.birthdays.find(b =>
      b.name.toLowerCase() === name.toLowerCase()
    );

    if (existingBirthday) {
      this.showMessage('Birthday for this person already exists!', 'error');
      return;
    }

    // Create date string (use current year if no birth year provided)
    const birthdayYear = year || new Date().getFullYear();
    const dateString = `${birthdayYear}-${month}-${day}`;

    const birthday = {
      id: Date.now(),
      name: name,
      date: dateString,
      month: month,
      day: day,
      birthYear: year || null, // Store actual birth year or null
      relationship: relationship,
      createdAt: new Date().toISOString()
    };

    this.addBirthday(birthday);
    e.target.reset();
    this.populateDays(); // Reset day options
    this.showMessage(`Birthday added for ${name}!`, 'success');
  }

  handleFilterChange(e) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    this.currentFilter = e.target.dataset.filter;
    this.renderBirthdays();
  }

  addBirthday(birthday) {
    this.birthdays.push(birthday);
    this.saveBirthdays();
    this.renderBirthdays();
    this.renderUpcomingBirthdays();
    this.updateEmptyState();
  }

  deleteBirthday(id) {
    const birthday = this.birthdays.find(b => b.id === id);
    if (birthday && confirm(`Are you sure you want to delete ${birthday.name}'s birthday?`)) {
      this.birthdays = this.birthdays.filter(b => b.id !== id);
      this.saveBirthdays();
      this.renderBirthdays();
      this.renderUpcomingBirthdays();
      this.updateEmptyState();
      this.showMessage('Birthday deleted successfully!', 'success');
    }
  }

  renderBirthdays() {
    const container = document.getElementById('birthdaysList');
    let filteredBirthdays = this.birthdays;

    if (this.currentFilter !== 'all') {
      filteredBirthdays = this.birthdays.filter(b => b.relationship === this.currentFilter);
    }

    // Sort by upcoming birthday
    filteredBirthdays.sort((a, b) => {
      const aNext = this.getNextBirthdayDate(a.date);
      const bNext = this.getNextBirthdayDate(b.date);
      return aNext - bNext;
    });

    container.innerHTML = filteredBirthdays.map(birthday => this.createBirthdayCard(birthday)).join('');
  }

  renderUpcomingBirthdays() {
    const container = document.getElementById('upcomingList');
    const upcoming = this.getUpcomingBirthdays();

    if (upcoming.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-check"></i>
          <p>No upcoming birthdays in the next 30 days!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = upcoming.map(birthday => {
      const card = this.createBirthdayCard(birthday);
      return card.replace('birthday-card', 'birthday-card upcoming');
    }).join('');
  }

  createBirthdayCard(birthday) {
    const daysUntil = this.getDaysUntilBirthday(birthday.date);
    const isToday = daysUntil === 0;
    const formattedDate = this.formatDate(birthday.date);

    let countdownText = '';
    let ageText = '';

    // Handle age calculation and display
    if (birthday.birthYear) {
      const currentAge = this.calculateAge(birthday.date);
      const nextAge = currentAge + 1;
      ageText = `Current age: ${currentAge}`;

      if (isToday) {
        countdownText = `🎉 Today! Happy ${nextAge}th Birthday!`;
      } else if (daysUntil === 1) {
        countdownText = `Tomorrow! Turning ${nextAge}`;
      } else if (daysUntil <= 7) {
        countdownText = `${daysUntil} days to go! Turning ${nextAge}`;
      } else {
        countdownText = `${daysUntil} days to go! Turning ${nextAge}`;
      }
    } else {
      // No birth year provided - just show countdown without age
      if (isToday) {
        countdownText = `🎉 Today is ${birthday.name}'s Birthday!`;
      } else if (daysUntil === 1) {
        countdownText = `Tomorrow is ${birthday.name}'s Birthday!`;
      } else if (daysUntil <= 7) {
        countdownText = `${daysUntil} days until ${birthday.name}'s Birthday!`;
      } else {
        countdownText = `${daysUntil} days until ${birthday.name}'s Birthday!`;
      }
      ageText = 'Age not specified';
    }

    const cardClass = isToday ? 'birthday-card today' : 'birthday-card';
    const myselfClass = birthday.relationship === 'myself' ? ' myself' : '';
    const relationshipClass = birthday.relationship === 'myself' ? 'card-relationship myself' : 'card-relationship';

    return `
      <div class="${cardClass}${myselfClass}" data-id="${birthday.id}">
        <div class="card-header">
          <div>
            <div class="card-name">${birthday.name}</div>
            <span class="${relationshipClass}">${birthday.relationship}</span>
          </div>
          <div class="card-actions">
            <button class="btn-delete" onclick="birthdayApp.deleteBirthday(${birthday.id})" title="Delete birthday">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="card-date">
          <i class="fas fa-calendar"></i>
          ${formattedDate}
        </div>
        ${birthday.birthYear ? `<div class="card-age"><i class="fas fa-user"></i> ${ageText}</div>` : ''}
        <div class="card-countdown ${isToday ? 'today' : daysUntil <= 7 ? 'upcoming' : ''}">
          ${countdownText}
        </div>
      </div>
    `;
  }

  getUpcomingBirthdays(days = 30) {
    return this.birthdays
      .filter(birthday => {
        const daysUntil = this.getDaysUntilBirthday(birthday.date);
        return daysUntil <= days;
      })
      .sort((a, b) => {
        return this.getDaysUntilBirthday(a.date) - this.getDaysUntilBirthday(b.date);
      });
  }

  getDaysUntilBirthday(birthdayDate) {
    const today = new Date();
    const birthday = new Date(birthdayDate);

    // Set the birthday to this year
    const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    // If the birthday has passed this year, calculate for next year
    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDiff = thisYearBirthday.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getNextBirthdayDate(birthdayDate) {
    const today = new Date();
    const birthday = new Date(birthdayDate);
    const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    if (thisYearBirthday < today) {
      thisYearBirthday.setFullYear(today.getFullYear() + 1);
    }

    return thisYearBirthday;
  }

  calculateAge(birthdayDate) {
    const today = new Date();
    const birthday = new Date(birthdayDate);

    // Only calculate age if we have a real birth year (not current year placeholder)
    const birthYear = birthday.getFullYear();
    const currentYear = today.getFullYear();

    // If the birth year is current year or close to it, assume no birth year was provided
    if (currentYear - birthYear < 5) {
      return null; // Age calculation not meaningful
    }

    let age = currentYear - birthYear;
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }

    return age;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  updateEmptyState() {
    const emptyState = document.getElementById('emptyState');
    const birthdaysList = document.getElementById('birthdaysList');

    if (this.birthdays.length === 0) {
      emptyState.style.display = 'block';
      birthdaysList.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      birthdaysList.style.display = 'grid';
    }
  }

  showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;

    // Add error message styles if needed
    if (type === 'error') {
      messageDiv.style.background = '#ff6b6b';
    }

    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);

    // Remove message after 3 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  loadBirthdays() {
    try {
      const stored = localStorage.getItem('birthdays');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading birthdays:', error);
      return [];
    }
  }

  saveBirthdays() {
    try {
      localStorage.setItem('birthdays', JSON.stringify(this.birthdays));
    } catch (error) {
      console.error('Error saving birthdays:', error);
      this.showMessage('Error saving data. Please try again.', 'error');
    }
  }

  // Export birthdays as JSON
  exportBirthdays() {
    const dataStr = JSON.stringify(this.birthdays, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'birthdays.json';
    link.click();

    URL.revokeObjectURL(url);
    this.showMessage('Birthdays exported successfully!', 'success');
  }

  // Import birthdays from JSON file
  importBirthdays(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedBirthdays = JSON.parse(e.target.result);

        if (Array.isArray(importedBirthdays)) {
          // Merge with existing birthdays, avoiding duplicates
          const existingNames = this.birthdays.map(b => b.name.toLowerCase());
          const newBirthdays = importedBirthdays.filter(b =>
            !existingNames.includes(b.name.toLowerCase())
          );

          this.birthdays = [...this.birthdays, ...newBirthdays];
          this.saveBirthdays();
          this.renderBirthdays();
          this.renderUpcomingBirthdays();
          this.updateEmptyState();

          this.showMessage(`Imported ${newBirthdays.length} new birthdays!`, 'success');        } else {
          throw new Error('Invalid file format');
        }
      } catch {
        this.showMessage('Error importing file. Please check the format.', 'error');
      }
    };
    reader.readAsText(file);
  }
}

// Initialize the application
let birthdayApp;

document.addEventListener('DOMContentLoaded', () => {
  birthdayApp = new BirthdayReminder();

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N to focus on name input
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      document.getElementById('personName').focus();
    }
  });  // Add some sample data for demo (only if no data exists)
  if (birthdayApp.birthdays.length === 0) {
    // Sample data is available for testing if needed:
    // const today = new Date();
    // const sampleBirthdays = [
    //   {
    //     id: 1,
    //     name: 'John Doe',
    //     date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString().split('T')[0],
    //     relationship: 'friend',
    //     createdAt: new Date().toISOString()
    //   },
    //   {
    //     id: 2,
    //     name: 'Jane Smith',
    //     date: new Date(1990, 5, 15).toISOString().split('T')[0],
    //     relationship: 'family',
    //     createdAt: new Date().toISOString()
    //   }
    // ];
    // birthdayApp.birthdays = sampleBirthdays;
    // birthdayApp.saveBirthdays();
    // birthdayApp.renderBirthdays();
    // birthdayApp.renderUpcomingBirthdays();
  }
});
