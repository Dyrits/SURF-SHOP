mapboxgl.accessToken = "pk.eyJ1IjoiZHlyaXRzIiwiYSI6ImNsZmZiMWw4bDNuZnkzc250NHgxMm9uc2sifQ.q9tvE4qr0wJeAyFNc-bRSg";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v11",
  center: data.coordinates,
  zoom: 4
});

const marker = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: data.coordinates
  },
  properties: {
    title: data.title,
    description: data.location
  }
};

const div = document.createElement("div");
div.className = "marker";
new mapboxgl.Marker(div).setLngLat(marker.geometry.coordinates).setPopup(
  new mapboxgl.Popup({offset: 25}).setHTML(`<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p>`)
).addTo(map);