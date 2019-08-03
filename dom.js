window.addEventListener('load', () => {
    const temperatureDescription = document.querySelector(".temperature-description")
    const temperatureDegree = document.querySelector(".temperature-degree")
    const locationTimezone = document.querySelector(".location-timezone")
    const degreeSection = document.querySelector(".degree-section")
    const degreeSpan = document.querySelector(".degree-section span")


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const weather = `${proxy}https://api.darksky.net/forecast/4664bb7d3da4062df217a4b305846247/${latitude},${longitude}`
            fetch(weather).then(response => {
                return response.json();
            }).then(data => {
                const {temperature, summary, icon} = data.currently
                const celcius = ((temperature - 32) * 5 / 9).toFixed(2)
                // SET DOM Elements from the API
                temperatureDegree.textContent = celcius
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //SET ICONS
                setIcons(icon, document.querySelector('.icon'))

                //Change to Farenheit and Vice Versa
                degreeSection.addEventListener('click', ()=> {
                    if (degreeSpan.textContent === 'C') {
                        degreeSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature
                    } else {
                        degreeSpan.textContent = 'C';
                        temperatureDegree.textcontent = celcius
                    }
                })
            });
        })
    } else {
        document.querySelector(".noGeo").textContent = "Please enable location service to get weather information"
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"})
        const currentIcon = icon.replace(/-/g, '_').toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
})