const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '331e1fff196b5f00f4fca010fbf44653';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src='https://github.com/ThijsFloryn/Weather-App/blob/main/images/clear.png?raw=true';
                    break;

                case 'Rain':
                    image.src='https://github.com/ThijsFloryn/Weather-App/blob/main/images/rain.png?raw=true';
                    break;

                case 'Snow':
                    image.src='https://github.com/ThijsFloryn/Weather-App/blob/main/images/snow.png?raw=true';
                    break;

                case 'Clouds':
                    image.src= 'https://github.com/ThijsFloryn/Weather-App/blob/main/images/cloud.png?raw=trueoud.png';
                    break;

                case 'Haze':
                    image.src='https://github.com/ThijsFloryn/Weather-App/blob/main/images/mist.png?raw=true';
                    break;

                default:
                    image.src= '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});