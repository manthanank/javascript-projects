const api = '26213e3c835aecd490b3f93827d0ad55';

const input = document.querySelector('#query');
const weatherCard = document.querySelector('#weather-card');
const searchBtn = document.querySelector('.search-btn');

// Function to show weather card with animation
function showWeatherCard() {
  weatherCard.classList.add('show');
}

// Function to update current time
function updateCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const timeElement = document.querySelector('.current-time');
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

// Function to get weather data
function getWeatherData(query) {
  if (!query.trim()) {
    alert('Please enter a location');
    return;
  }

  // Add loading state
  searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  searchBtn.disabled = true;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${api}&units=metric`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Location not found');
      }
      return res.json();
    })
    .then((data) => {
      const temp = Math.round(data.main.temp);
      const feelsLike = Math.round(data.main.feels_like);
      const humidity = data.main.humidity;
      const place = data.name;
      const country = data.sys.country;
      const { icon, main, description } = data.weather[0];
      const { speed } = data.wind;
      const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A';
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      // Update UI elements
      document.querySelector('.temp').textContent = `${temp}°C`;
      document.querySelector('.name').textContent = `${place}, ${country}`;
      document.querySelector('.wind').textContent = `${speed} m/s`;
      document.querySelector('.feels-like').textContent = `${feelsLike}°C`;
      document.querySelector('.humidity').textContent = `${humidity}%`;
      document.querySelector('.visibility').textContent = `${visibility} km`;
      document.querySelector('.icon').src = iconUrl;
      document.querySelector('.main').textContent = main;
      document.querySelector('.description').textContent = description;

      // Update current time
      updateCurrentTime();

      // Show weather card with animation
      showWeatherCard();
    })
    .catch((error) => {
      alert('Location not found. Please try again with a different location.');
      console.error('Error:', error);
    })
    .finally(() => {
      // Reset button state
      searchBtn.innerHTML = '<i class="fas fa-search"></i>';
      searchBtn.disabled = false;
    });
}

// Event listener for search button
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const query = input.value;
  getWeatherData(query);
  input.value = '';
});

// Event listener for Enter key
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const query = input.value;
    getWeatherData(query);
    input.value = '';
  }
});

// Load default weather for a popular city on page load
window.addEventListener('load', () => {
  getWeatherData('New York');
});
