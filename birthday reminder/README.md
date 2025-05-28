# Birthday Reminder

A beautiful and functional birthday reminder application that helps you keep track of all your loved ones' special days. Never forget another birthday with this intuitive and feature-rich tool!

## 🎂 Features

### Core Functionality

- **Add Birthdays**: Easy form to add new birthdays with name, date, and relationship
- **Optional Birth Year**: Choose to include birth year for age calculation or leave it blank
- **Upcoming Reminders**: See birthdays coming up in the next 30 days
- **Smart Age Calculation**: Automatically calculates current age and upcoming age (when birth year provided)
- **Flexible Date Entry**: Month/day dropdowns with automatic day population based on selected month
- **Countdown Timer**: Shows exact days until each birthday
- **Relationship Categories**: Organize contacts by family, friends, colleagues, or mark as yourself

### User Experience

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations
- **Filter System**: Filter birthdays by relationship type
- **Special Highlighting**: Today's birthdays get special styling and animations
- **Empty State**: Helpful messaging when no birthdays are added

### Data Management

- **Local Storage**: All data is saved locally in your browser
- **Persistent Data**: Your birthdays are remembered between sessions
- **Data Validation**: Form validation ensures data integrity
- **Error Handling**: Graceful handling of invalid data

## 🚀 Getting Started

1. Open `index.html` in your web browser
2. Click "Add New Birthday" to add your first birthday
3. Fill in the person's name, birthday date, and relationship
4. Click "Add Birthday" to save
5. View upcoming birthdays in the dedicated section
6. Use filters to organize your birthday list

## 💡 Usage Tips

### Adding Birthdays

- **Name**: Enter the full name of the person
- **Birth Month**: Select the month from the dropdown
- **Birth Day**: Select the day (automatically populated based on selected month)
- **Birth Year (Optional)**: Enter birth year for age calculation, or leave blank if you prefer not to show age
- **Relationship**: Choose from Myself, Family, Friend, Colleague, or Other

### Managing Birthdays

- **Delete**: Click the trash icon to remove a birthday
- **Filter**: Use the filter buttons to view specific categories (All, Myself, Family, Friends, Colleagues, Other)
- **Upcoming**: Check the "Upcoming Birthdays" section for reminders

### Special Features

- **Today's Birthdays**: Birthdays happening today are highlighted with special animations
- **Age Display**: See both current age and upcoming age
- **Countdown**: Exact day countdown to each birthday
- **Responsive**: Use on any device - phone, tablet, or computer

## 🎨 Design Features

### Visual Elements

- **Gradient Background**: Beautiful purple-blue gradient
- **Card Layout**: Clean card-based design for each birthday
- **Icons**: Font Awesome icons throughout the interface
- **Animations**: Smooth transitions and hover effects
- **Color Coding**: Different colors for various states (today, upcoming, normal)

### User Interface

- **Intuitive Forms**: Easy-to-use form controls
- **Clear Typography**: Readable fonts and proper sizing
- **Consistent Spacing**: Well-organized layout with proper spacing
- **Accessible**: High contrast and screen reader friendly

## 🔧 Technical Details

### Technologies Used

- **HTML5**: Semantic markup and modern form controls
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features for modern browser support
- **Local Storage API**: Client-side data persistence
- **Font Awesome**: Icon library for visual elements

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure

```tree
birthday reminder/
├── index.html          # Main HTML structure
├── style.css          # Styling and responsive design
├── script.js          # Application logic and functionality
└── README.md          # This documentation file
```

## 🎯 Key Functions

### Birthday Management

- `addBirthday()` - Add new birthday to the list
- `deleteBirthday()` - Remove birthday from the list
- `renderBirthdays()` - Display all birthdays with current filter

### Date Calculations

- `getDaysUntilBirthday()` - Calculate days until next birthday
- `calculateAge()` - Calculate current age from birth date
- `getNextBirthdayDate()` - Get the next occurrence of the birthday

### Data Persistence

- `saveBirthdays()` - Save birthdays to localStorage
- `loadBirthdays()` - Load birthdays from localStorage

### User Interface of Functions

- `createBirthdayCard()` - Generate HTML for birthday cards
- `handleFilterChange()` - Filter birthdays by relationship
- `showMessage()` - Display success/error messages

## 🎁 Future Enhancements

Potential features for future versions:

- Email/SMS notifications
- Export to calendar applications
- Birthday gift idea tracking
- Social media integration
- Birthday history and statistics
- Custom reminder intervals
- Photo attachments for contacts

## 🤝 Contributing

Feel free to contribute to this project by:

- Reporting bugs
- Suggesting new features
- Improving the design
- Adding new functionality
- Writing documentation

## 📄 License

This project is part of the JavaScript Projects Collection and is available under the MIT License.
