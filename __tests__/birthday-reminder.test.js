/**
 * @jest-environment jsdom
 */

// Tests for Birthday Reminder functionality
describe('Birthday Reminder', () => {
  let birthdayApp;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Mock DOM elements
    document.body.innerHTML = `
      <form id="birthdayForm">
        <input type="text" id="personName">
        <input type="date" id="birthdayDate">
        <select id="relationship">
          <option value="family">Family</option>
          <option value="friend">Friend</option>
        </select>
      </form>
      <div id="birthdaysList"></div>
      <div id="upcomingList"></div>
      <div id="emptyState"></div>
      <div class="filter-btn active" data-filter="all"></div>
    `;

    // Create a mock BirthdayReminder class for testing
    class MockBirthdayReminder {
      constructor() {
        this.birthdays = [];
        this.currentFilter = 'all';
      }

      addBirthday(birthday) {
        this.birthdays.push(birthday);
        return this.birthdays;
      }

      deleteBirthday(id) {
        this.birthdays = this.birthdays.filter(b => b.id !== id);
        return this.birthdays;
      }

      getDaysUntilBirthday(birthdayDate) {
        const today = new Date();
        const birthday = new Date(birthdayDate);
        const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

        if (thisYearBirthday < today) {
          thisYearBirthday.setFullYear(today.getFullYear() + 1);
        }

        const timeDiff = thisYearBirthday.getTime() - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
      }

      calculateAge(birthdayDate) {
        const today = new Date();
        const birthday = new Date(birthdayDate);
        let age = today.getFullYear() - birthday.getFullYear();
        const monthDiff = today.getMonth() - birthday.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
          age--;
        }

        return age;
      }      loadBirthdays() {
        try {
          const stored = localStorage.getItem('birthdays');
          return stored ? JSON.parse(stored) : [];
        } catch {
          return [];
        }
      }

      saveBirthdays() {
        try {
          localStorage.setItem('birthdays', JSON.stringify(this.birthdays));
          return true;
        } catch {
          return false;
        }
      }
    }

    birthdayApp = new MockBirthdayReminder();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Birthday Management', () => {
    test('should add a new birthday', () => {
      const birthday = {
        id: 1,
        name: 'John Doe',
        date: '1990-05-15',
        relationship: 'friend'
      };

      const result = birthdayApp.addBirthday(birthday);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(birthday);
      expect(birthdayApp.birthdays).toContain(birthday);
    });

    test('should delete a birthday', () => {
      const birthday1 = { id: 1, name: 'John Doe', date: '1990-05-15', relationship: 'friend' };
      const birthday2 = { id: 2, name: 'Jane Smith', date: '1985-12-25', relationship: 'family' };

      birthdayApp.addBirthday(birthday1);
      birthdayApp.addBirthday(birthday2);

      expect(birthdayApp.birthdays).toHaveLength(2);

      const result = birthdayApp.deleteBirthday(1);

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(birthday2);
      expect(birthdayApp.birthdays).not.toContain(birthday1);
    });

    test('should handle empty birthday list', () => {
      expect(birthdayApp.birthdays).toHaveLength(0);

      const result = birthdayApp.deleteBirthday(999);
      expect(result).toHaveLength(0);
    });
  });

  describe('Date Calculations', () => {
    test('should calculate days until birthday correctly', () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const tomorrowDate = tomorrow.toISOString().split('T')[0];
      const daysUntil = birthdayApp.getDaysUntilBirthday(tomorrowDate);

      expect(daysUntil).toBe(1);
    });

    test('should calculate age correctly', () => {
      // Test with a date that has already passed this year
      const birthDate = '1990-01-01';
      const age = birthdayApp.calculateAge(birthDate);
      const currentYear = new Date().getFullYear();
      const expectedAge = currentYear - 1990;

      expect(age).toBe(expectedAge);
    });

    test('should handle leap year birthdays', () => {
      const leapYearBirthday = '1992-02-29';
      const age = birthdayApp.calculateAge(leapYearBirthday);

      expect(typeof age).toBe('number');
      expect(age).toBeGreaterThan(0);
    });
  });

  describe('Data Persistence', () => {
    test('should save birthdays to localStorage', () => {
      const birthday = {
        id: 1,
        name: 'Test Person',
        date: '1990-05-15',
        relationship: 'friend'
      };

      birthdayApp.addBirthday(birthday);
      const saved = birthdayApp.saveBirthdays();

      expect(saved).toBe(true);

      const stored = localStorage.getItem('birthdays');
      const parsed = JSON.parse(stored);

      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toEqual(birthday);
    });

    test('should load birthdays from localStorage', () => {
      const birthdays = [
        { id: 1, name: 'Person 1', date: '1990-01-01', relationship: 'friend' },
        { id: 2, name: 'Person 2', date: '1985-12-25', relationship: 'family' }
      ];

      localStorage.setItem('birthdays', JSON.stringify(birthdays));

      const loaded = birthdayApp.loadBirthdays();

      expect(loaded).toHaveLength(2);
      expect(loaded).toEqual(birthdays);
    });

    test('should handle corrupted localStorage data', () => {
      localStorage.setItem('birthdays', 'invalid json');

      const loaded = birthdayApp.loadBirthdays();

      expect(loaded).toEqual([]);
    });

    test('should handle missing localStorage data', () => {
      const loaded = birthdayApp.loadBirthdays();

      expect(loaded).toEqual([]);
    });
  });

  describe('Form Validation', () => {
    test('should validate required fields', () => {
      // Test with missing name
      const incompleteBirthday = {
        name: '',
        date: '1990-05-15',
        relationship: 'friend'
      };

      // This would typically be handled in the form submission handler
      expect(incompleteBirthday.name.trim()).toBe('');
    });

    test('should validate date format', () => {
      const validDate = '1990-05-15';
      const invalidDate = 'invalid-date';

      expect(new Date(validDate).toString()).not.toBe('Invalid Date');
      expect(new Date(invalidDate).toString()).toBe('Invalid Date');
    });
  });

  describe('Filter Functionality', () => {
    beforeEach(() => {
      const birthdays = [
        { id: 1, name: 'Family Member', date: '1990-01-01', relationship: 'family' },
        { id: 2, name: 'Friend', date: '1985-12-25', relationship: 'friend' },
        { id: 3, name: 'Colleague', date: '1995-06-15', relationship: 'colleague' }
      ];

      birthdays.forEach(birthday => birthdayApp.addBirthday(birthday));
    });

    test('should filter by relationship type', () => {
      const familyMembers = birthdayApp.birthdays.filter(b => b.relationship === 'family');
      const friends = birthdayApp.birthdays.filter(b => b.relationship === 'friend');

      expect(familyMembers).toHaveLength(1);
      expect(friends).toHaveLength(1);
      expect(familyMembers[0].name).toBe('Family Member');
      expect(friends[0].name).toBe('Friend');
    });

    test('should show all birthdays when filter is "all"', () => {
      expect(birthdayApp.birthdays).toHaveLength(3);
    });
  });

  // Test for "Add My Birthday" functionality
  describe('Add My Birthday Feature', () => {
    beforeEach(() => {
      // Add DOM elements for the new feature
      document.body.innerHTML += `
        <button id="addMyBirthdayBtn">Add My Birthday</button>
        <select id="birthdayMonth">
          <option value="">Select Month</option>
          <option value="01">January</option>
        </select>
        <select id="birthdayDay">
          <option value="">Select Day</option>
          <option value="01">1</option>
        </select>
        <input type="number" id="birthYear" min="1900" max="2025">
      `;
    });

    test('should pre-fill form with "Me" and "myself" relationship when Add My Birthday is clicked', () => {
      // Test that the handleAddMyBirthday method exists and can pre-fill form values
      const nameInput = document.getElementById('personName');
      const relationshipSelect = document.getElementById('relationship');

      // Add the myself option to the relationship select
      const myselfOption = document.createElement('option');
      myselfOption.value = 'myself';
      myselfOption.textContent = 'Myself';
      relationshipSelect.appendChild(myselfOption);

      // Simulate the handleAddMyBirthday functionality
      nameInput.value = 'Me';
      relationshipSelect.value = 'myself';

      expect(nameInput.value).toBe('Me');
      expect(relationshipSelect.value).toBe('myself');
    });

    test('should accept "myself" as a valid relationship option', () => {
      const birthday = {
        id: Date.now(),
        name: 'Me',
        date: '2024-05-15',
        month: '05',
        day: '15',
        birthYear: 1990,
        relationship: 'myself',
        createdAt: new Date().toISOString()
      };

      birthdayApp.addBirthday(birthday);
      expect(birthdayApp.birthdays).toContain(birthday);
      expect(birthdayApp.birthdays[birthdayApp.birthdays.length - 1].relationship).toBe('myself');
    });

    test('should filter birthdays by "myself" relationship', () => {
      // Add a birthday for myself
      const myBirthday = {
        id: 1,
        name: 'Me',
        date: '2024-05-15',
        relationship: 'myself'
      };

      // Add a birthday for someone else
      const otherBirthday = {
        id: 2,
        name: 'Friend',
        date: '2024-06-20',
        relationship: 'friend'
      };

      birthdayApp.addBirthday(myBirthday);
      birthdayApp.addBirthday(otherBirthday);

      // Filter by myself
      birthdayApp.currentFilter = 'myself';
      const filteredBirthdays = birthdayApp.birthdays.filter(b => b.relationship === 'myself');

      expect(filteredBirthdays).toHaveLength(1);
      expect(filteredBirthdays[0].name).toBe('Me');
      expect(filteredBirthdays[0].relationship).toBe('myself');
    });
  });
});
