// map.js
const map = L.map('map').setView([30.3753, 69.3451], 5); // Pakistan default center

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

async function showLocation(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(address)
        .openPopup();

      map.setView([lat, lon], 14);
    } else {
      console.error("Address not found:", address);
    }
  } catch (err) {
    console.error("Error fetching geocode:", err);
  }
}

// run for this listing
if (typeof listingLocation !== "undefined") {
  showLocation(listingLocation);
}
