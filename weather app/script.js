const api = "26213e3c835aecd490b3f93827d0ad55";

const input = document.querySelector("#query");

document.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    const query = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${api}&units=metric`;
    fetch(url)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            const temp = data.main.temp;
            const place = data.name;
            const { icon, main, description } = data.weather[0];
            const { speed } = data.wind;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            document.querySelector(".temp").textContent = `${temp}°C`;
            document.querySelector(".name").textContent = `${place}`;
            document.querySelector(".wind").textContent = `${speed}`;
            document.querySelector(".icon").src = iconUrl;
            document.querySelector(".main").textContent = `${main}`;
            document.querySelector(".description").textContent = `${description}`;
            document.querySelector("img").style.visibility = 'visible';
        })
        .catch((err) => alert("Enter valid address!"));

    input.value = "";
});
