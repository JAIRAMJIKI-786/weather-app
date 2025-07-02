const apiKey = "ec39ce6fb473438085435711250207";

async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML = "Please enter a location.";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error("Location not found");
    }

    const data = await response.json();
    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const city = data.location.name;
    const country = data.location.country;

    resultDiv.innerHTML = `
      <strong>${city}, ${country}</strong><br/>
      Temperature: <strong>${tempC}°C</strong><br/>
      Condition: ${condition}
    `;
  } catch (error) {
    resultDiv.innerHTML = "Error: " + error.message;
  }
}
